const UserModel = require("../../models/User");
const user = new UserModel({
  id: "",
});
let User = {};

user.login((userdata) => {
  User =  {
    ...userdata,
  };
});

module.exports = {user:User,token:"abc"};
