const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;
const StrategyJWT = passportJWT.Strategy;

const secretKey =
  process.env.JWT_SECRET ||
  "db071ab9603b826cda4d897660ff3ff601fa671682a78dc7a9e24e894f42f5af"; // Gunakan env var di production

passport.use(
  new StrategyJWT(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
    },
    (jwtPayload, done) => {
      if (!jwtPayload || !jwtPayload.id) {
        return done(null, false); // Jika token tidak valid
      }
      return done(null, jwtPayload); // Berikan payload user
    }
  )
);

// // Middleware untuk melindungi route
const authenticateUser = passport.authenticate("jwt", { session: false });

module.exports = authenticateUser;
