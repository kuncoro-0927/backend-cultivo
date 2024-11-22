const express = require("express");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { testConnection } = require("./config/db.js");
const router = require("./routes/route.js");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(bodyParser.json());
app.use(passport.initialize());

require("dotenv").config();
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.listen(process.env.APP_PORT, async () => {
  await testConnection();
  console.log(`Running at http://localhost:${process.env.APP_PORT}`);
});
