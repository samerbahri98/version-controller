import redis from "redis";

export const redisClient = redis.createClient(
	Number(process.env.REDIS_PORT),
	process.env.REDIS_URL
);
redisClient.on("error", (err) => {
	console.log("error", err);
});
redisClient.on("connect", (err) => {
	console.log("connect");
});
redisClient.on("ready", (err) => {
	console.log("ready");
});
