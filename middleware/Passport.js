const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;
const StrategyJWT = passportJWT.Strategy;

const secretKey = process.env.JWT_SECRET;

passport.use(
  new StrategyJWT(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
    },
    (jwtPayload, done) => {
      if (!jwtPayload || !jwtPayload.id) {
        return done(null, false, { message: "Invalid token payload" });
      }
      return done(null, jwtPayload);
    }
  )
);

const authenticateUser = passport.authenticate("jwt", { session: false });

module.exports = authenticateUser;
