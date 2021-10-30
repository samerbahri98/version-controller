const User = require("../../models/User");

const login = ({ email, password }) => {
  const user = new User({
    email,
    password,
  });
  user.login((userdata) => {return {
    token: "apv",
    user: userdata,
  }});
};

module.exports = login;
