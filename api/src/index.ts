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
import { AuthResolver } from "./graphql/User/AuthResolver";
import { UserResolver } from "./graphql/User/UserResolver";
import { RepositoryResolver } from "./graphql/Repository/RepositoryResolver";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { getConnection } from "typeorm";
import { context } from "./middlewares/Context";
import { SshInit } from "./config/ssh";
import { PublicKeyResolver } from "./graphql/PublicKey/PublicKeyResolver";
import { TicketResolver } from "./graphql/Ticket/TicketResolver";

const morgan = require("morgan");

(async () => {
  console.log("starting");
  const app = express();

  // MIDDLEWARES
  await db;
  await SshInit;
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
    resolvers: [
      AuthResolver,
      UserResolver,
      RepositoryResolver,
      PublicKeyResolver,
      TicketResolver,
    ],
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
    // introspection: false,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  // SERVER
  const PORT = process.env.PORT || 3300;
  app.listen(PORT, () => console.log("server online"));
})();
