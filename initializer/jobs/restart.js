const { docker } = require("../config/docker");
const { dockerCommand } = require("../helpers");
const gitContainer = docker.getContainer(process.env.GIT_SSH_SERVER);

