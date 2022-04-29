const { client } = require("../config/db");

const publicKeysPromise = new Promise((resolve, reject) => {
	client.query("SELECT public_key_hash from public_keys", (err, res) => {
		if (err) reject(err);
		resolve(res.rows.map((row) => row["public_key_hash"]));
	});
});

module.exports = { publicKeysPromise };
