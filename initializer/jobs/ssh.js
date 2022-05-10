const { publicKeysPromise } = require("../helpers");

const sshCredentials = {
	host: process.env.GIT_CONTAINER_HOST,
	username: process.env.GIT_CONTAINER_USERNAME,
};

const sshPromise = Promise.resolve(sshCredentials)

module.exports = { sshPromise };
