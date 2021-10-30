const fs = require("fs");
const path = require("path");

const resolvers = {};

fs.readdirSync(path.join(__dirname, "Resolvers/")).forEach((file) => {
  console.log(file);
  const resolver = path.parse(path.basename(file)).name;
  // console.log(resolver)
  if (path.extname(file) === ".js")
    resolvers[resolver] = require(path.join(__dirname, "Resolvers/", file));
});

module.exports = resolvers;
