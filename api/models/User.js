const QueueNode = require("./QueueNode");
const pg = require("../config/pg");

class User {
  #id;
  #firstName;
  #lastName;
  #userName;
  #email;
  #attributionTag;
  #phone;
  #created_at;
  #password;
  #nameOrId;
  #queueNode;

  constructor({
    id,
    firstName,
    lastName,
    userName,
    email,
    attributionTag,
    phone,
    created_at,
    password,
    nameOrId,
    queueNode,
  }) {
    this.#id = id;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#userName = userName;
    this.#email = email;
    this.#attributionTag = attributionTag;
    this.#phone = phone;
    this.#created_at = created_at;
    this.#password = password;
    this.#nameOrId = nameOrId;
    this.#queueNode = queueNode;
  }
  register(callback) {
    pg.query(
      "CALL create_user($1,$2,$3,$4,$5,$6)",
      [
        this.#firstName,
        this.#lastName,
        this.#userName,
        this.#email,
        this.#password,
        this.#phone,
      ],
      (err, res) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(res);
        this.#queueNode = new QueueNode("user", "create", [
          { name: this.#userName },
        ]);
        this.#queueNode.deploy((id) => callback(id));
      }
    );
  }
  login(callback) {
    pg.query(
      "SELECT * from validate_user($1,$2)",
      [this.#email, this.#password],
      (err, res) => {
        if (err) {
          console.log(err);
          return;
        }
        const userdata = res.rows[0];
        this.#id = userdata.userid;
        this.#firstName = userdata.first_name;
        this.#lastName = userdata.last_name;
        this.#userName = userdata.username;
        this.#attributionTag = `${userdata.first_name} ${userdata.last_name}<${
          this.#email
        }>`;
        this.#phone = userdata.phone;
        this.#created_at = userdata.created_at;
        callback(this.#dump());
      }
    );
  }

  #dump = () => ({
    id: this.#id,
    firstName: this.#firstName,
    lastName: this.#lastName,
    userName: this.userName,
    email: this.#email,
    attributionTag: this.#attributionTag,
    phone: this.#phone,
    created_at: this.#created_at,
  });

  get(callback) {
    pg.query(
      `SELECT 
      first_name,last_name,username,email,phone,created_at
      FROM user_data
      WHERE user_id=$1`,
      [this.#id],
      (err, res) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(res);
        callback(res);
      }
    );
  }
  // delete(callback) {
  //   this.#queueNode = new QueueNode("user", "delete", [
  //     { name: this.#nameOrId },
  //   ]);
  //   this.#queueNode.deploy((id) => callback(id));
  // }

  // check(callback) {
  //   QueueNode.fromId(this.#nameOrId, "user", (payload) => {
  //     callback(payload.status());
  //   });
  // }
}

module.exports = User;
