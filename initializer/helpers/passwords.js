const { client } = require("../config/db");

const passwordsPromise = new Promise((resolve, reject) => {
	client.query("SELECT password FROM user_data", (err, res) => {
		if (err) reject(err);
		console.log(res)
		resolve(res.rows.map((row) => row["password"]));
	});
});

module.exports = { passwordsPromise };
