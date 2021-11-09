import { NodeSSH } from "node-ssh";
import * as fs from "fs";
import * as path from "path";

export const ssh = new NodeSSH().connect({
	host: process.env.GIT_CONTAINER,
	username: process.env.GIT_CONTAINER_USERNAME,
	// privateKey: fs.readFileSync(path.join(__dirname, "../ssh/id_rsa"), "utf-8"),
	password: process.env.GIT_CONTAINER_PASSWORD,
});

export const cli = "sudo /var/actions/run.sh"
