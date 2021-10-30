const fs = require("fs");
const path = require("path");

const Queries = {};

fs.readdirSync(path.join(__dirname,"Queries/")).forEach((file) => {
  const Query = path.parse(path.basename(file)).name;
  if (path.extname(file) === ".js")
    Queries[Query] = require(__dirname,"Queries/",file);
});

module.exports = Queries;
