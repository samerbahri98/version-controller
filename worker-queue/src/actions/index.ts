import { IQueueNode, status, flag } from "../interfaces/IQueueNode";
import { redisClient } from "../middlewares/redis";
import { cli, ssh } from "../middlewares/ssh";
import { QueueNode } from "../services/QueueNode";

export const actions: () => Promise<void> = () => {
	return new Promise(async (resolve, reject) => {
		redisClient.lrange("TODO", 0, 0, async (errorLRange, nodeKeyArray) => {
			if (errorLRange) reject(errorLRange);
			const nodeKey: string = nodeKeyArray[0];
			redisClient.mget(nodeKey, async (errorMget, nodeJson) => {
				if (errorMget) reject(errorMget);
				const node: QueueNode = new QueueNode();
				const nodeItem: IQueueNode = JSON.parse(nodeJson[0]);
				node.set(nodeItem);
				await node.move(status.TODO, status.DOING);
				const parameters = [`-c ${node.action}`, `-a ${node.arguments}`];
				node.flags?.forEach((flag) =>
					parameters.push(`${flag.name} ${flag.value}`)
				);
				await (await ssh)
					.exec(cli, parameters)
					.then((result) => console.log("STDOUT: " + result));
				await node.move(status.DOING, status.DONE);
			});
		});
	});
};
