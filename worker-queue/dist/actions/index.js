"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const IQueueNode_1 = require("../interfaces/IQueueNode");
const redis_1 = require("../middlewares/redis");
const ssh_1 = require("../middlewares/ssh");
const QueueNode_1 = require("../services/QueueNode");
const actions = () => {
    return new Promise(async (resolve, reject) => {
        redis_1.redisClient.lrange("TODO", 0, 0, async (errorLRange, nodeKeyArray) => {
            if (errorLRange)
                reject(errorLRange);
            const nodeKey = nodeKeyArray[0];
            redis_1.redisClient.mget(nodeKey, async (errorMget, nodeJson) => {
                if (errorMget)
                    reject(errorMget);
                const node = new QueueNode_1.QueueNode();
                const nodeItem = JSON.parse(nodeJson[0]);
                node.set(nodeItem);
                await node.move(IQueueNode_1.status.TODO, IQueueNode_1.status.DOING);
                const parameters = [`-c ${node.action}`, `-a ${node.arguments}`];
                node.flags?.forEach((flag) => parameters.push(`${flag.name} ${flag.value}`));
                await (await ssh_1.ssh)
                    .exec(ssh_1.cli, parameters)
                    .then((result) => console.log("STDOUT: " + result));
                await node.move(IQueueNode_1.status.DOING, IQueueNode_1.status.DONE);
            });
        });
    });
};
exports.actions = actions;
