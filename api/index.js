import express from "express";
import session from "express-session";
import uuid from "uuid/v4";
import dotenv from "dotenv";
import auth from "./auth";

dotenv.config();

const PORT = 4000;
const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

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

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
