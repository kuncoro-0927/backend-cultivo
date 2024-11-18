const express = require("express");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const { isAdmin } = require("./middleware/auth.js");
const dotenv = require("dotenv");
const { testConnection } = require("./config/db.js");
const router = require("./routes/route.js");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(bodyParser.json());
app.use(passport.initialize());

require("./config/passport.js")(passport);
app.get("/admin", isAdmin, (req, res) => {
  res.send("Welcome Admin");
});

app.listen(process.env.APP_PORT, async () => {
  await testConnection();
  console.log(`Running at http://localhost:${process.env.APP_PORT}`);
});
