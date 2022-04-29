const { Client } = require("pg");

const dbCredentials = {
	host: process.env.PG_HOST,
	port: Number(process.env.PG_PORT),
	user: process.env.PG_USER,
	database: process.env.PG_DB,
	password: process.env.PG_PASSWORD,
};

const client = new Client(dbCredentials);
client
	.connect()
	.then(() => console.log("--- begin database initialization ---"))
	.catch((err) => {
		console.error("database connection error!!!", err.stack);
		process.exit(1);
	});
module.exports = { client };
