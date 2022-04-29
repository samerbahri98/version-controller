const { passwordsPromise, publicKeysPromise } = require("../helpers");

const sshCredentials = {
	host: process.env.GIT_CONTAINER_HOST,
	username: process.env.GIT_CONTAINER_USERNAME,
	// privateKey: path.join(__dirname, "id_rsa"),
};

const sshPromise = Promise.resolve(sshCredentials).then(console.log);

module.exports = { sshPromise };
