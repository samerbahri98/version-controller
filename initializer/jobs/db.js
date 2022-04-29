const { client } = require("../config/db");
const fs = require("fs/promises");
const util = require("util");
const path = require("path");

const dbPromise = new Promise(async (resolve, reject) => {

	client.query("select * from user_data", (err, res) => {
		if (err) throw err;
		// console.log(res);
		// client.end();
	});
});

module.exports = { dbPromise };
