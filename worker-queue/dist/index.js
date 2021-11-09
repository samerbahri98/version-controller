"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("./actions");
const redis_1 = require("./middlewares/redis");
(async () => {
    console.log("RUNNING");
    redis_1.redisSubscriber.on("TODO_NOTIFICATION", (channel, message) => {
        console.log(message);
        redis_1.redisClient.llen("TODO", async (error, length) => {
            if (error)
                return;
            while (length > 0)
                await (0, actions_1.actions)();
        });
    });
    redis_1.redisSubscriber.subscribe("TODO_NOTIFICATION");
})();
