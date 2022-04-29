const {jobs} = require("./jobs");

(async () => {
	await Promise.all(jobs);
})();
