const { docker } = require("../config/docker");
const gitContainer = docker.getContainer(process.env.GIT_SSH_SERVER);


const restartPromise = gitContainer.restart()

module.exports = { restartPromise };
