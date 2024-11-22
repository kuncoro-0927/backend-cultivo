// const { Strategy, ExtractJwt } = require("passport-jwt");
// const { query } = require("../config/db");
// const dotenv = require("dotenv");
// dotenv.config();

// module.exports = (passport) => {
//   const opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: process.env.JWT_SECRET || "khitan271",
//   };

//   passport.use(
//     new Strategy(opts, (jwt_payload, done) => {
//       query("SELECT * FROM users WHERE id = ?", [jwt_payload.id])
//         .then((result) => {
//           if (result.length === 0) return done(null, false);
//           return done(null, result[0]);
//         })
//         .catch((err) => done(err, false));
//     })
//   );
// };
