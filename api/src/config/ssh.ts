import { NodeSSH } from "node-ssh";
import * as fs from "fs";
import { generateKeyPair } from "crypto";
// import { parseKey, parsePrivateKey } from "sshpk";
import * as sshpk from "sshpk";
const { parseKey, parsePrivateKey } = sshpk;
import * as path from "path";
import { User } from "../entities/User";
import { PublicKey } from "../entities/PublicKey";

const privateKeyPath = path.join(__dirname, "id_rsa");

const getPasswords: () => Promise<string[]> = async () => {
	const users = await User.find({ select: ["username", "password"] });
	const hashes = users.map((user: User) => `${user.username}:${user.password}`);
	return hashes;
};

const getPublicKeys: () => Promise<string[]> = async () => {
	const keys = await PublicKey.find({ select: ["public_key_hash"] });
	return keys.map((key) => key.public_key_hash);
};

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
						const passwords = await getPasswords();
						const publicKeys = await getPublicKeys();
						const commandSequence = [
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S chmod 777 /etc/ssh/sshd_config`, // enable editing the sshd_config
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S echo 'PasswordAuthentication no\nUsePam no\nPermitRootLogin no\nPermitRootLogin prohibit-password' >> /etc/ssh/sshd_config`, //disable password auth
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S chmod 644 /etc/ssh/sshd_config`, // disable editing the sshd_config
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S htpasswd -b -c '/var/git/.htpasswd' 'git' '${process.env.GIT_CONTAINER_PASSWORD}'`,
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S chgrp -R 'git' '/var/git/.htpasswd'`,
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S chown -R 'git' '/var/git/.htpasswd'`,
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S chmod 777 -R '/var/git/.htpasswd'`,
							...passwords.map(
								(password) => `echo '${password}' >> /var/git/.htpasswd  `
							),
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S touch '/var/git/.hushlogin'`,
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S mkdir '/var/git/.ssh'`,
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S touch '/var/git/.ssh/authorized_keys'`,
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S chgrp -R 'git' '/var/git/.ssh'`,
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S chown -R 'git' '/var/git/.ssh'`,
							`echo '${parsedPublicKey}' >> /home/.ssh/authorized_keys`, // enable editing the sshd_config
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S /etc/init.d/apache2 restart`, //restart http

							...publicKeys.map(
								(key) => `echo '${key}' >> /var/git/.ssh/authorized_keys  `
							),
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S chmod 700 '/var/git/.ssh'`,
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S chmod 600 '/var/git/.ssh/authorized_keys'`,
							`echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S /etc/init.d/ssh reload`, //restart ssh
						];

						for (const command of commandSequence) {
							try {
								// console.log(command);
								const res = await sshAuthNode.execCommand(command);
								console.log({ command, res });
							} catch (err) {
								throw err;
							}
						}
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

export const cli = `echo '${process.env.GIT_CONTAINER_PASSWORD}' | sudo -S /var/actions/run.sh`;
