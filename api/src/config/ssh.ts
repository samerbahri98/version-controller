import { NodeSSH } from "node-ssh";
import * as fs from "fs";
import { generateKeyPair } from "crypto";
// import { parseKey, parsePrivateKey } from "sshpk";
import * as sshpk from "sshpk";
const { parseKey, parsePrivateKey } = sshpk;
import * as path from "path";

const privateKeyPath = path.join(__dirname, "id_rsa");

export const SshInit = (() => {
	return new Promise(async (resolve, reject) => {
		generateKeyPair(
			"rsa",
			{
				modulusLength: 4096,
				publicKeyEncoding: {
					type: "pkcs1",
					format: "pem",
				},
				privateKeyEncoding: {
					type: "pkcs8",
					format: "pem",
				},
			},
			async (err, publicKey, privateKey) => {
				if (err) reject(err);
				const sshAuthNode = new NodeSSH();
				await sshAuthNode
					.connect({
						host: "git",
						username: process.env.GIT_CONTAINER_USERNAME,
						password: process.env.GIT_CONTAINER_PASSWORD,
					})
					.then(async (value) => {
						// const parsedPublicKey = parseKey(publicKey, "pem").toString("ssh");
						const parsedPrivateKey = sshpk.parsePrivateKey(privateKey, "pem");
						const parsedPublicKey = parsedPrivateKey.toPublic().toString("ssh");
						// Add authorized_keys

						const commandSequence = [
							`echo '${parsedPublicKey}' >> /home/.ssh/authorized_keys`, // enable editing the sshd_config
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S chmod 777 /etc/ssh/sshd_config`, // enable editing the sshd_config
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | echo 'PasswordAuthentication no\nUsePam no\nPermitRootLogin no\nPermitRootLogin prohibit-password' >> /etc/ssh/sshd_config`, //disable password auth
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S chmod 644 /etc/ssh/sshd_config`, // disable editing the sshd_config
							`touch /var/git/.htpasswd && mkdir /var/git/.ssh && touch /var/git/.ssh/authorized_keys)`,
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S chgrp -R git /var/git/.ssh && chown -R git /var/git/.ssh`,
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S service apache2 restart`, //restart http
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S /etc/init.d/ssh reload`, //restart ssh
						];

						commandSequence.forEach(async (command, index) => {
							await sshAuthNode
								.execCommand(command)
								.then((result) => {
									console.log(result);
									if (index === commandSequence.length - 1)
										sshAuthNode.dispose();
								})
								.catch(reject);
						});

						sshAuthNode.dispose();

						await fs.writeFileSync(
							privateKeyPath,
							parsedPrivateKey
								.toBuffer("ssh", { filename: path.join("id_rsa") })
								.toString(),
							"utf-8"
						);
					})
					.catch((err?: Error) => {
						//already authenticated
						if (err?.message !== "All configured authentication methods failed")
							throw err;
						resolve(privateKey);
					});
			}
		);
	});
})();

export const sshCredentials = {
	host: "git",
	username: process.env.GIT_CONTAINER_USERNAME,
	privateKey: path.join(__dirname, "id_rsa"),
};

export const cli = "sudo /var/actions/run.sh";
