const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/userModel");
const userController = require("../controllers/userController");
const GithubStrategy = require ("passport-github2").Strategy;
const githubLogin = new GithubStrategy(
  {
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://127.0.0.1:8000/auth/github/callback",
  },

  function(accessToken, refreshToken, profile, done) {
    const user = userController.getUserByGithub(profile) 
    console.log(profile)
      return user
      ? done(null, user)
      : done(null, false, {
          message: 'Your login details are not valid. Please try again',
        });
    }
)

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = {
  localLogin: passport.use(localLogin), 
  githubLogin: passport.use(githubLogin)
};
module.exports = passport.use(localLogin).use(githubLogin);
