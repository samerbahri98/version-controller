const { v4 } = require("uuid");
const redis = require("../config/redis");

class QueueNode {
  //private
  #id;
  #action;
  #flags;
  #arguments;
  #message;
  #status;

  constructor(action, args, flags, message, status = "TODO", id = v4()) {
    this.#id = id;
    this.#action = action;
    this.#flags = flags;
    this.#arguments = args;
    this.#status = status;
    this.#message = message;
  }

  //getter
  #getData = () => ({
    id: this.#id,
    action: this.#action,
    flags: this.#flags,
    arguments: this.#arguments,
    status: this.#status,
    message: this.#message,
  });

  id = () => this.#id;
  status = () => this.#status;

  cache(callback) {
    redis.set(this.#id, JSON.stringify(this.#getData()), (errSet, replySet) => {
      if (errSet) {
        this.#message = errSet;
        console.log(errSet);
        return;
      }
      redis.expire(this.#id, 3600, (errExpire, replyExpire) => {
        if (errExpire) {
          this.#message = errExpire;
          console.log(errExpire);
          return;
        }
        callback(this.#id);
      });
    });
  }

  deploy(callback) {
    this.cache(() => {
      redis.rpush([this.#status, this.#id], (err, reply) => {
        if (err) {
          this.#message = err;
          console.log(err);
          return;
        }
        this.message = reply;
        callback(this.#id);
      });
    });
  }

  static fromId(id, action,callback) {
    redis.get(id, (err, getReply) => {
      if (err) {
        this.#message = err;
        console.log(err);
        return;
      }
      const node = JSON.parse(getReply);
      const queueNode = new QueueNode(
        node.action,
        node.flags,
        node.args,
        node.message,
        node.status,
        node.id
      );
      if(action===node.action)return callback(queueNode);
    });
  }

  //   static from(status, callback) {
  //     redis.lrange(status, 0, 0, (err, lrangeReply) => {
  //       if (err) {
  //         this.#message = err;
  //         console.log(err);
  //         return this;
  //       }
  //       if (lrangeReply) {
  //         redis.get()
  //         // const node = JSON.parse(reply);
  //         // const queueNode = new QueueNode(
  //         //   node.id,
  //         //   node.flags,
  //         //   node.args,
  //         //   node.message,
  //         //   node.status,
  //         //   node.id
  //         // );
  //         // redis.lpop(status, (errpop, replypop) => {
  //         //   if (errpop) {
  //         //     this.#message = errpop;
  //         //     console.log(errpop);
  //         //     return this;
  //         //   }
  //         //   return queueNode;
  //         // });
  //       }
  //     });
  //   }
}

module.exports = QueueNode;
