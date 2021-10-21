const QueueNode = require("./QueueNode");
class Repo {
  #nameOrId;
  #user;
  #queueNode;
  constructor(nameOrId, user) {
    this.#nameOrId = nameOrId;
    this.#user = user;
  }
  create(callback) {
    this.#queueNode = new QueueNode("Repo", "create", [
      { name: this.#nameOrId },
      { user: this.#user },
    ]);
    this.#queueNode.deploy((id) => callback(id));
  }
  delete(callback) {
    this.#queueNode = new QueueNode("Repo", "delete", [
      { name: this.#nameOrId },
      { user: this.#user },
    ]);
    this.#queueNode.deploy((id) => callback(id));
  }
  check(callback) {
    QueueNode.fromId(this.#nameOrId, "Repo", (payload) => {
      callback(payload.status());
    });
  }
  
}

module.exports = Repo;
