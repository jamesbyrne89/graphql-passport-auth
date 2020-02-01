import passport from "passport";
import db from "./db";

const serializeUser = passport.serializeUser((user, next) => {
  next(null, user.id);
});

const deserializeUser = passport.deserializeUser((id, next) => {
  const users = db.getUsers();
  const matchingUser = users.find(user => user.id === id);
  next(null, matchingUser);
});

const session = passport.session();

const initialize = passport.initialize();

export default {
  serializeUser,
  deserializeUser,
  session,
  initialize
};
