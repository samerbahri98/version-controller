const { docker } = require("../config/docker");
const {
	repoListPromise,
	dockerCommand,
} = require("../helpers");
const { allUsersDirInitPromise } = require("./userDirInit");
const bareGitDirectory = "/var/git";
const cloneGitDirectory = "/var/git/.clones";
const gitContainer = docker.getContainer("git-grpc-server");

const repoInitPromise = (repo) => {
	const Cmd = [
		"git",
		"clone",
		`${bareGitDirectory}/${repo}.git`,
		`${cloneGitDirectory}/${username}/`,
	];
	return dockerCommand({ Cmd, gitContainer });
};

const allReposDirInitPromise = async () => {
	await allUsersDirInitPromise();
	const repos = await repoListPromise;
	const reposPromises = repos.map((repo) => repoInitPromise(repo));
	return Promise.all(reposPromises)
};
module.exports = { repoInitPromise };
