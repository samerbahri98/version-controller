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
import { db } from "./config/db";
import { RegisterResolver } from "./graphql/User/Register";
import { redisClient } from "./config/redis";
import { UserResolver } from "./graphql/User/User";
import { RepositoryResolver } from "./graphql/Repository/RepositoryResolver";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { getConnection } from "typeorm";
import { context } from "./middlewares/Context";

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
	app.use(express.json());

	// GRAPHQL
	const schema = await buildSchema({
		resolvers: [RegisterResolver, UserResolver, RepositoryResolver],
	});
	const apolloServer = new ApolloServer({
		schema,
		context: ({ req, res }) => ({
			req,
			res,
		}),
		plugins: [
			ApolloServerPluginLandingPageGraphQLPlayground(),
			ApolloServerLoaderPlugin({
				typeormGetConnection: getConnection, // for use with TypeORM
			}),
		],
	});

	await apolloServer.start();

	apolloServer.applyMiddleware({ app });

	// SERVER
	const PORT = process.env.PORT || 3300;
	app.listen(PORT, () => console.log("server online"));
})();
