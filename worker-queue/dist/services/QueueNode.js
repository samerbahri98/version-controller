"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueNode = void 0;
const IQueueNode_1 = require("../interfaces/IQueueNode");
const uuid_1 = require("uuid");
const redis_1 = require("../middlewares/redis");
class QueueNode {
    node_id;
    action;
    flags;
    arguments;
    status;
    constructor(_node_id, _action, _flags, _arguments, _status) {
        this.node_id = _node_id || (0, uuid_1.v4)();
        this.action = _action;
        this.flags = _flags;
        this.arguments = _arguments;
        this.status = _status || IQueueNode_1.status.TODO;
    }
    cache = async () => {
        return new Promise((resolve, reject) => {
            redis_1.redisClient.set(this.node_id, JSON.stringify(this.get()), (errCache, replyCache) => {
                if (errCache)
                    reject(errCache);
                redis_1.redisClient.expire(this.node_id, 3600, (errExpire, replyExpire) => {
                    if (errExpire)
                        reject(errExpire);
                    resolve(this.get());
                });
            });
        });
    };
    move = async (from_queue, to_queue) => {
        return new Promise(async (resolve, reject) => {
            redis_1.redisClient.lpop(IQueueNode_1.status[from_queue], async (errorLpop, replyLpop) => {
                if (errorLpop)
                    reject(errorLpop);
                if (this.node_id !== replyLpop)
                    reject(new Error("task.node_id !==replyLpop"));
                redis_1.redisClient.rpush(IQueueNode_1.status[to_queue], async (errorRpush, replyRpus) => {
                    if (errorRpush)
                        reject(errorRpush);
                    this.status = to_queue;
                    await new QueueNode().set(this).deploy();
                });
            });
        });
    };
    deploy = async () => {
        return new Promise(async (resolve, reject) => {
            await this.cache();
            const currentStatus = IQueueNode_1.status[this.status];
            redis_1.redisClient.rpush(currentStatus, this.node_id, (errPush, replyPush) => {
                if (errPush)
                    reject(errPush);
                resolve(this.get());
            });
        });
    };
    get = () => ({
        node_id: this.node_id,
        action: this.action,
        flags: this.flags,
        arguments: this.arguments,
        status: this.status,
    });
    set = (node) => {
        this.node_id = node.node_id || (0, uuid_1.v4)();
        this.action = node.action;
        this.flags = node.flags;
        this.arguments = node.arguments;
        this.status = node.status || IQueueNode_1.status.TODO;
        return this;
    };
}
exports.QueueNode = QueueNode;
