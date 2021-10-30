const User = require("../../models/User");

const register = ({
  firstName,
  lastName,
  userName,
  email,
  phone,
  password,
}) => {
  const user = new User({
    firstName,
    lastName,
    userName,
    email,
    phone,
    password,
  });
  user.register(console.log);
};


module.exports=register