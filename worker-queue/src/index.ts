import { actions } from "./actions";
import { redisClient, redisSubscriber } from "./middlewares/redis";

(async () => {
	console.log("RUNNING");

	redisSubscriber.on("TODO_NOTIFICATION", (channel, message) => {
		console.log(message);
		redisClient.llen("TODO", async (error, length) => {
			if (error) return;
			while (length > 0) await actions();
		});
	});

	redisSubscriber.subscribe("TODO_NOTIFICATION");


	
})();
