const QueueNode = require("./QueueNode");
class User {
  #nameOrId;
  #queueNode;
  constructor(nameOrId) {
    this.#nameOrId = nameOrId;
  }
  create(callback) {
    this.#queueNode = new QueueNode("user", "create", [{ name:this.#nameOrId }]);
    this.#queueNode.deploy((id) => callback(id));
  }
  delete(callback) {
    this.#queueNode = new QueueNode("user", "delete", [{ name:this.#nameOrId }]);
    this.#queueNode.deploy((id) => callback(id));
  }
  check(callback){
    QueueNode.fromId(this.#nameOrId,"user",payload=>{
      callback(payload.status())
    })
  }

}

module.exports = User;
