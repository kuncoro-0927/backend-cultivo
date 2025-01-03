// passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const { query } = require("../config/db");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/cultivo/api/auth/google/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const user = await query("SELECT * FROM users WHERE email = ?", [
          profile.emails[0].value,
        ]);

        if (user.length > 0) {
          const token = jwt.sign(
            { id: user[0].id, email: user[0].email, role: user[0].role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          return done(null, { ...user[0], token });
        } else {
          const newUser = await query(
            "INSERT INTO users (email, name, role_id, google_id, isverified) VALUES (?, ?, ?, ?,?)",
            [
              profile.emails[0].value,
              profile.displayName,
              "2",
              profile.id,
              true,
            ]
          );

          const token = jwt.sign(
            {
              id: newUser.insertId,
              email: profile.emails[0].value,
              role: "2",
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          return done(null, {
            id: newUser.insertId,
            email: profile.emails[0].value,
            role: "user",
            token,
            refreshToken,
          });
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
