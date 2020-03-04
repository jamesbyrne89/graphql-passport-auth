import express from "express";
import session from "express-session";
import passport from "passport";
import { GraphQLLocalStrategy, buildContext } from "graphql-passport";
import uuid from "uuid/v4";
import dotenv from "dotenv";
import auth from "./auth";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import db from "./db";

dotenv.config();

const PORT = 4000;
const SESSION_SECRET = process.env.REACT_APP_SESSION_SECRET;

const app = express();

passport.use(
  new GraphQLLocalStrategy((email, password, done) => {
    const users = db.getUsers();
    const matchingUser = users.find(
      user => email === user.email && password === user.password
    );
    const error = matchingUser ? null : new Error("no matching user");
    done(error, matchingUser);
  })
);

app.use(
  session({
    genId: req => uuid(),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  })
);

app.use(auth.initialize);
app.use(auth.session);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => buildContext({ req, res })
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
