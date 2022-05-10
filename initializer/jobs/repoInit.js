const { docker } = require("../config/docker");
const { repoListPromise, dockerCommand } = require("../helpers");
const { allUsersDirInitPromise } = require("./userDirInit");
const bareGitDirectory = "/var/git";
const cloneGitDirectory = "/var/git/.clones";
const gitContainer = docker.getContainer(process.env.GIT_SSH_SERVER);

const repoInitPromise = (repo) => {
	const cloneCmd = [
		"git",
		"clone",
		`${bareGitDirectory}/${repo}.git`,
		`${cloneGitDirectory}/${repo}/`,
	];
	const chgrpCmd = ["chgrp", "-R", "git", `${cloneGitDirectory}/${repo}/`];
	const chownCmd = ["chown", "-R", "git", `${cloneGitDirectory}/${repo}/`];
	const chmodCmd = ["chmod", "-R", "660", `${cloneGitDirectory}/${repo}/`];
	return dockerCommand({ Cmd: cloneCmd, gitContainer }).then(() =>
		Promise.all([
			dockerCommand({ Cmd: chgrpCmd, gitContainer }),
			dockerCommand({ Cmd: chownCmd, gitContainer }),
			dockerCommand({ Cmd: chmodCmd, gitContainer }),
		])
	);
};

const repoJob = (repo) =>
	new Promise(async (resolve, reject) =>
		repoInitPromise(repo).then(resolve).catch(reject)
	);

const emptyCloneFolder = () => {
	const rmdirCmd = ["rm", "-rf", cloneGitDirectory];
	const createDirCmd = ["mkdir", cloneGitDirectory];
	const chgrpCmd = ["chgrp", "-R", "git", cloneGitDirectory];
	const chownCmd = ["chown", "-R", "git", cloneGitDirectory];
	const chmodCmd = ["chmod", "-R", "660", cloneGitDirectory];
	return dockerCommand({ Cmd: rmdirCmd, gitContainer })
		.then(() => dockerCommand({ Cmd: createDirCmd, gitContainer }))
		.then(
			Promise.all([
				dockerCommand({ Cmd: chgrpCmd, gitContainer }),
				dockerCommand({ Cmd: chownCmd, gitContainer }),
				dockerCommand({ Cmd: chmodCmd, gitContainer }),
			])
		);
};

const allReposDirInitPromise = async () => {
	await emptyCloneFolder().then(() => allUsersDirInitPromise());

	const repos = await repoListPromise;

	const reposPromises = repos.map((repo) => repoJob(repo));
	return Promise.all(reposPromises);
};
module.exports = { allReposDirInitPromise };
