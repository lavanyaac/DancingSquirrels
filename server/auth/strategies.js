const passport = require('passport');
const app = require('../index.js');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../../db/models/User.js');
const authHelpers = require('./authHelpers.js');

const facebookStrategy = (callbackURL) => {
  return new FacebookStrategy({
    clientID: process.env.FacebookClientID || require('../env/config.js').FACEBOOK.ID,
    clientSecret: process.env.FacebookClientSecret || require('../env/config.js').FACEBOOK.SECRET,
    callbackURL: callbackURL,
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, cb) {
    authHelpers.insertExternal(profile);
    cb(null, profile.id);
  });
};

const googleStrategy = (callbackURL) => {
  return new GoogleStrategy({
    clientID: process.env.GoogleClientID || require('../env/config.js').GOOGLE.ID,
    clientSecret: process.env.GoogleClientSecret || require('../env/config.js').GOOGLE.SECRET,
    callbackURL: callbackURL,
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    authHelpers.insertExternal(profile);
    done(null, profile.id);
  });
};

const githubStrategy = (callbackURL) => {
  return new GithubStrategy({
    clientID: process.env.GitHubClientID || require('../env/config.js').GITHUB.ID,
    clientSecret: process.env.GitHubClientSecret || require('../env/config.js').GITHUB.SECRET,
    callbackURL: callbackURL,
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    authHelpers.insertExternal(profile);
    done(null, profile.id);
  });
};

const localStrategy = () => {
  return new LocalStrategy((username, password, cb) => {
    UserModel.comparePasswords(username, password, cb);
  })
}

module.exports.facebookStrategy = facebookStrategy;
module.exports.googleStrategy = googleStrategy;
module.exports.githubStrategy = githubStrategy;
module.exports.localStrategy = localStrategy;
