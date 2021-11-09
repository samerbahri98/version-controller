"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = exports.ssh = void 0;
const node_ssh_1 = require("node-ssh");
exports.ssh = new node_ssh_1.NodeSSH().connect({
    host: process.env.GIT_CONTAINER,
    username: process.env.GIT_CONTAINER_USERNAME,
    // privateKey: fs.readFileSync(path.join(__dirname, "../ssh/id_rsa"), "utf-8"),
    password: process.env.GIT_CONTAINER_PASSWORD,
});
exports.cli = "sudo /var/actions/run.sh";
