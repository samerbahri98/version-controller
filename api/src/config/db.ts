import { createConnection, Connection } from "typeorm";
import { Repo } from "../entities/Repo";
import { User } from "../entities/User";

export const db = createConnection({
	type: "postgres",
	host: process.env.PG_HOST,
	port: Number(process.env.PG_PORT),
	username: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DB,
	entities: [User, Repo],
});
