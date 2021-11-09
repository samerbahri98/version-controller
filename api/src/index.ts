// DEPENDENCIES
import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import cors from "cors";
import helmet from "helmet";
import { buildSchema } from "type-graphql";
import { db } from "./middlewares/db";
import { RegisterResolver } from "./graphql/User/Register";
import { redisClient } from "./middlewares/redis";
const morgan = require("morgan");

(async () => {
	const app = express();

	// MIDDLEWARES
	await db;
	await redisClient;
	app.use(cors());
	app.use(
		helmet({
			contentSecurityPolicy:
				process.env.NODE_ENV === "production" ? undefined : false,
		})
	);
	app.use(morgan("dev"));

	// GRAPHQL
	const schema = await buildSchema({
		resolvers: [RegisterResolver],
	});
	const apolloServer = new ApolloServer({
		schema,
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	});

	await apolloServer.start();

	apolloServer.applyMiddleware({ app });

	// SERVER
	const PORT = process.env.PORT || 3300;
	app.listen(PORT, () => console.log("server online"));
})();
