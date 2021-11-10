import { flag, IQueueNode, status } from "../interfaces/IQueueNode";
import { v4 } from "uuid";
import { redisClient } from "../config/redis";
import { resolve } from "path/posix";
import { type } from "os";

export class QueueNode implements IQueueNode {
	node_id: string;
	action?: string;
	flags?: Array<flag>;
	arguments?: string;
	status: status;

	constructor(
		_node_id?: string,
		_action?: string,
		_flags?: Array<flag>,
		_arguments?: string,
		_status?: status
	) {
		this.node_id = _node_id || v4();
		this.action = _action;
		this.flags = _flags;
		this.arguments = _arguments;
		this.status = _status || status.TODO;
	}

	cache: () => Promise<IQueueNode> = async () => {
		return new Promise((resolve, reject) => {
			redisClient.set(
				this.node_id,
				JSON.stringify(this.get()),
				(errCache, replyCache) => {
					if (errCache) reject(errCache);
					redisClient.expire(this.node_id, 3600, (errExpire, replyExpire) => {
						if (errExpire) reject(errExpire);
						resolve(this.get());
					});
				}
			);
		});
	};

	deploy: () => Promise<IQueueNode> = async () => {
		return new Promise(async (resolve, reject) => {
			await this.cache();
			const currentStatus: string = status[this.status];
			redisClient.rpush(currentStatus, this.node_id, (errPush, replyPush) => {
				if (errPush) reject(errPush);
				redisClient.publish(
					`${currentStatus}_NOTIFICATION`,
					this.node_id,
					(errorPublish, replyPublish) => {
						if (errorPublish) reject(errorPublish);
						resolve(this.get());
					}
				);
			});
		});
	};

	get: () => IQueueNode = () => ({
		node_id: this.node_id,
		action: this.action,
		flags: this.flags,
		arguments: this.arguments,
		status: this.status,
	});

	set: (node: IQueueNode) => QueueNode = (node: IQueueNode) => {
		this.node_id = node.node_id || v4();
		this.action = node.action;
		this.flags = node.flags;
		this.arguments = node.arguments;
		this.status = node.status || status.TODO;
		return this;
	};
}
