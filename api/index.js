const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const {
  ApolloServer,
  ApolloError,
  ValidationError,
  gql,
} = require("apollo-server-express");

const http = require("http");
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// app.use(express.json({ extended: false }));

// app.post("/register", (req, res) => {
//   console.log("ues");
//   require("./resolvers/Mutations/register")(req.body)
// });

// app.post("/login", (req, res) => {
//   console.log("ues");
//   require("./resolvers/Queries/login")(req.body)
  
// });

// app.get("/", (req, res) => res.json({ ues: "message" }));
// GRAPHQL API
const typeDefs = require("fs").readFileSync(".gql").toString("utf-8");

const resolvers = require("./resolve.js");
let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}

//SERVER START

startServer();
const httpserver = http.createServer(app);
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => console.log(`gql path is ${apolloServer.graphqlPath}`));
// app.listen(PORT, () => console.log(`gql path is yes`));
