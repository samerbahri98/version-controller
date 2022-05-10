const { publicKeysPromise } = require("./publicKeys");
const { repoListPromise } = require("./repoList");
const { dockerCommand } = require("./dockerCommand");
const { usersListPromise } = require("./usersList");

module.exports = {
	publicKeysPromise,
	repoListPromise,
	dockerCommand,
	usersListPromise,
};
