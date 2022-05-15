const dbPromise = require("./db");
const { allReposDirInitPromise } = require("./repoInit");
const { allHtpasswordPromise } = require("./htPasswordInit");
const { allPublicKeysInitPromise } = require("./publicKeysInit");
const sshPromise = require("./ssh");
const { resetPromise } = require("./reset");
const { restartPromise } = require("./restart");

module.exports = {
	resetPromise,
	allReposDirInitPromise,
	allHtpasswordPromise,
	allPublicKeysInitPromise,
	restartPromise,
};
