import { cli, sshCredentials } from "../config/ssh";
import { NodeSSH } from "node-ssh";

import { ISshParams } from "../interfaces/ISshParams";

export async function Ssh(sshParams: ISshParams) {
	return new Promise((resolve, reject) => {
		const params: Array<string> = [];
		if (sshParams.argument) params.push("-a " + sshParams.argument);
		if (sshParams.command) params.push("-c " + sshParams.command);
		if (sshParams.username) params.push("-u " + sshParams.username);
		if (sshParams.password) params.push("-p " + sshParams.password);
		if (sshParams.repository) params.push("-r " + sshParams.repository);
		const command = `${cli} ${params.join(" ")}`;
		const sshNode = new NodeSSH();

		const sshClient = sshNode.connect(sshCredentials);

		sshClient.then(() =>
			sshNode.execCommand(command).then(console.log).then(resolve).catch(reject)
		);
	});
}
