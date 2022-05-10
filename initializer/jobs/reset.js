const { docker } = require("../config/docker");
const { dockerCommand } = require("../helpers");
const bareGitDirectory = "/var/git";
const gitContainer = docker.getContainer(process.env.GIT_SSH_SERVER);

const targets = [".clones", ".ssh", ".htpasswd", ".hushlogin"].map(target=>`${bareGitDirectory}/${target}`);

const Cmd = ["rm", "-rd", ...targets];
const resetPromise = dockerCommand({ Cmd, gitContainer });

module.exports = { resetPromise };
