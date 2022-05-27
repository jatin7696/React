const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  port: process.env.PORT,
  jwtKey: process.env.jwtKey
};
