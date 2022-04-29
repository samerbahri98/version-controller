const { client } = require("../config/db");

const repoListPromise = new Promise((resolve, reject) => {
	client.query("SELECT repository_name , username FROM repositories JOIN user_data ON repositories.created_by=user_data.user_id", (err, res) => {
		if (err) reject(err);
		resolve(res.rows.map((row) => `${row["username"]}/${row["repository_name"]}`));
	});
});

module.exports = { repoListPromise };
