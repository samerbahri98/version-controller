const { docker } = require("../config/docker");
const {
    usersListPromise,
	dockerCommand,
} = require("../helpers");
const { resolve } = require("path");
const bareGitDirectory = "/var/git";
const cloneGitDirectory = "/var/git/.clones";
const gitContainer = docker.getContainer("git-grpc-server");

const userDirInitPromise = (username) => {
	const Cmd = ["mkdir", `${cloneGitDirectory}/${username}`];
	return dockerCommand({ Cmd, gitContainer });
};

const allUsersDirInitPromise = async()=> {
    const users = await usersListPromise
    const userDirPromises = users.map(u=>userDirInitPromise(u))
    return Promise.all(userDirPromises)
}

module.exports = {allUsersDirInitPromise}