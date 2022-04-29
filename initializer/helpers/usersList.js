const { client } = require("../config/db");

const usersListPromise = new Promise((resolve, reject) => {
	client.query("SELECT username FROM user_data", (err, res) => {
		if (err) reject(err);
		resolve(res.rows);
	});
});

module.exports = { usersListPromise };
