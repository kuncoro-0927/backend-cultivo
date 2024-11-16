const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../config/db.js");
require("dotenv").config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(options, (jwt_payload, done) => {
    db.query(
      "SELECT * FROM users WHERE id = ?",
      [jwt_payload.id],
      (err, results) => {
        if (err) return done(err, false);
        if (results.length) {
          return done(null, results[0]);
        }
        return done(null, false);
      }
    );
  })
);

module.exports = passport;
