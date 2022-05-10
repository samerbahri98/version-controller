const { docker } = require("../config/docker");
const { usersListPromise, dockerCommand } = require("../helpers");

const bareGitDirectory = "/var/git";
const gitContainer = docker.getContainer(process.env.GIT_SSH_SERVER);

const initialHtpasswdGitPromise = new Promise(async (resolve, reject) => {
	const createHtpasswdCmd = [
		"htpasswd",
		"-b",
		"-c",
		`${bareGitDirectory}/.htpasswd`,
		"git",
		"1234",
	];
	const chgrpCmd = ["chgrp", "-R", "git", `${bareGitDirectory}/.htpasswd`];
	const chownCmd = ["chown", "-R", "git", `${bareGitDirectory}/.htpasswd`];
	const chmodCmd = ["chmod", "-R", "664", `${bareGitDirectory}/.htpasswd`];
	resolve(
		await dockerCommand({ Cmd: createHtpasswdCmd, gitContainer }).then(() =>
			Promise.all([
				dockerCommand({ Cmd: chgrpCmd, gitContainer }),
				dockerCommand({ Cmd: chownCmd, gitContainer }),
				dockerCommand({ Cmd: chmodCmd, gitContainer }),
			])
		)
	);
});

const htpasswdUserPromise = (username, password) =>
	new Promise(async (resolve, reject) => {
		const Cmd = [
			"htpasswd",
			"-b",
			`${bareGitDirectory}/.htpasswd`,
			username,
			password,
		];
		resolve(await dockerCommand({ Cmd, gitContainer }));
	});

const allHtpasswordPromise = async () => {
	await initialHtpasswdGitPromise
	const users = await usersListPromise;
	return Promise.all(
		users.map((u) => htpasswdUserPromise(u["username"], u["password"]))
	);
};

module.exports = { allHtpasswordPromise };
