const { docker } = require("../config/docker");
const { usersListPromise, dockerCommand } = require("../helpers");
const bareGitDirectory = "/var/git";
const cloneGitDirectory = "/var/git/.clones";
const gitContainer = docker.getContainer(process.env.GIT_SSH_SERVER);

const userDirInitPromise = (username) => {
	const mkdirCmd = ["mkdir", `${cloneGitDirectory}/${username}`];
	const chgrpCmd = ["chgrp", "-R", "git", `${cloneGitDirectory}/${username}/`];
	const chownCmd = ["chown", "-R", "git", `${cloneGitDirectory}/${username}/`];
	const chmodCmd = ["chmod", "-R", "660", `${cloneGitDirectory}/${username}/`];
	return dockerCommand({ Cmd:mkdirCmd, gitContainer }).then(()=>Promise.all([
		dockerCommand({ Cmd:chgrpCmd, gitContainer }),
		dockerCommand({ Cmd:chownCmd, gitContainer }),
		dockerCommand({ Cmd:chmodCmd, gitContainer }),
	]));
};

const allUsersDirInitPromise = async () => {
	const users = await usersListPromise;
	return await users.map((u) => userDirInitPromise(u["username"]));
};

module.exports = { allUsersDirInitPromise };
