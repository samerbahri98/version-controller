const {reset,jobs,restart} = require("./jobs");

(async () => {
	console.log("--- start initialization job ---")
	await reset
	await Promise.all(jobs)
	await restart
	console.log("--- end initialization job ---")
	process.exit(0)
})();

