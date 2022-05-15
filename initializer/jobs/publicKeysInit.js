const { docker } = require("../config/docker");
const { publicKeysPromise, dockerCommand } = require("../helpers");



const allPublicKeysInitPromise = async() =>{
	const bareGitDirectory = "/var/git";
	const sshDirectory = bareGitDirectory + "/.ssh";
	const authorizedKeysFile = sshDirectory + "/authorized_keys";
	const gitContainer = docker.getContainer(process.env.GIT_SSH_SERVER);
	
	const initAuthorizedKeysPromise = new Promise(async (resolve, reject) => {
		const createSshFolderCMD = ["mkdir", sshDirectory];
		const createAuthorizedKeysFile = ["touch", authorizedKeysFile];
		const createHushLoginFile = ["touch", `${bareGitDirectory}/.hushlogin`];
		const chgrpCmd = ["chgrp", "-R", "git", sshDirectory];
		const chownCmd = ["chown", "-R", "git", sshDirectory];
		const chmodCmd = ["chmod", "-R", "664", sshDirectory];
	
		resolve(
			await Promise.all([
				dockerCommand({ Cmd: createHushLoginFile, gitContainer }),
				dockerCommand({ Cmd: createSshFolderCMD, gitContainer }),
			]).then(()=>dockerCommand({ Cmd: createAuthorizedKeysFile, gitContainer }))
			.then(()=>Promise.all([
				dockerCommand({ Cmd:chgrpCmd, gitContainer }),
				dockerCommand({ Cmd:chownCmd, gitContainer }),
				dockerCommand({ Cmd:chmodCmd, gitContainer }),
			]))
		);
	});
	
	const createPublicKeysPromise = (publicKey) =>{
		const Cmd = ["echo", publicKey, ">>", authorizedKeysFile];
		return  dockerCommand({ Cmd, gitContainer })
	}

	const publicKeys = await publicKeysPromise;
	await initAuthorizedKeysPromise;
	return Promise.all(publicKeys.map((key) => createPublicKeysPromise(key)));
}

module.exports = { allPublicKeysInitPromise };
