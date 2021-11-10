import redis from "redis";

export const redisClient = redis
	.createClient(Number(process.env.REDIS_PORT), process.env.REDIS_URL)
	.on("error", (err) => {
		console.log("error", err);
	})
	.on("connect", (err) => {
		console.log("connect");
	})
	.on("ready", (err) => {
		console.log("ready");
	});
