require("../db/config");
const User = require("../db/user");
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtKey } = require("../config");

module.exports = {
  login: async (req, resp) => {
    //console.log("under loged   == " + req.body);
    //console.log("under loginapi   == " + req.body.username);
    if (req.body.password && req.body.username) {
      // console.log("under if 1");
      let user = await User.findOne(req.body).select("-password");
      // console.log("this is login user", user);
      if (user) {
        //  console.log("under if 2");
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.Password
        );
        if (!validPassword) {
          resp.send({ result: "No User found" });
        }
        // console.log("this is valid ipasswod ===== ", validPassword);

        Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
          //  console.log(err, token);
          if (err) {
            resp.send("Something went wrong");
          }
          resp.send({ user, auth: token });
        });
      } else {
        resp.send({ result: "No User found" });
      }
    } else {
      resp.send({ result: "No User found" });
    }
  },
};
