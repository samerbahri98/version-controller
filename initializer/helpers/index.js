const { passwordsPromise } = require("./passwords");
const { publicKeysPromise } = require("./publicKeys");
const { repoListPromise } = require("./repoList");
const { dockerCommand } = require("./dockerCommand");
const { usersListPromise } = require("./usersList");

module.exports = {
	passwordsPromise,
	publicKeysPromise,
	repoListPromise,
	dockerCommand,
	usersListPromise,
};
