const dbPromise = require("./db");
const { allReposDirInitPromise } = require("./repoInit");
const { allHtpasswordPromise } = require("./htPasswordInit");
const { allPublicKeysInitPromise } = require("./publicKeysInit");
const sshPromise = require("./ssh");

const jobs = [
	// dbPromise,
	// sshPromise,
	allReposDirInitPromise(),
	allHtpasswordPromise(),
	allPublicKeysInitPromise(),
];

module.exports = { jobs };
