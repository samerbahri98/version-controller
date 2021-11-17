import { cli, sshClient, sshNode } from "../config/ssh";
import { ISshParams } from "../interfaces/ISshParams";

export async function Ssh(sshParams: ISshParams) {
	const params: Array<string> = [];
	if (sshParams.argument) params.push("-a " + sshParams.argument);
	if (sshParams.command) params.push("-c " + sshParams.command);
	if (sshParams.username) params.push("-u " + sshParams.username);
	if (sshParams.password) params.push("-p " + sshParams.password);
	if (sshParams.repository) params.push("-r " + sshParams.repository);
	const command = `${cli} ${params.join(" ")}`;
	return await sshClient.then(() =>
		sshNode.execCommand(command).then((result) => console.log({ result }))
	);
}
