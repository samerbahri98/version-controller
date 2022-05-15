const {
	resetPromise,
	allReposDirInitPromise,
	allHtpasswordPromise,
	allPublicKeysInitPromise,
	restartPromise,
} = require("./jobs");

(async () => {
	console.log("--- start initialization job ---");
	console.log("--- reset ---");
	await resetPromise().then(async () => {
		console.log("--- clone repos ---");
		await allReposDirInitPromise().then(async () => {
			console.log("--- handle http login ---");
			await allHtpasswordPromise().then(async () => {
				console.log("--- handle ssh login ---");
				await allPublicKeysInitPromise().then(async () => {
					console.log("--- server restart ---");
					await restartPromise.then(() => {
						console.log("--- end initialization job ---");
						process.exit(0);
					});
				});
			});
		});
	}).catch(async err=>{
		console.log(err)
	});
})();
