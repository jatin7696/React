require("../db/config");
const User = require("../db/user");
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtKey } = require("../config");

module.exports = {
    signup :  async (req, res) => {
        let user = new User(req.body);
        console.log("thisis user pass ==== ", user.Password);
        const salt = await bcrypt.genSalt(10);
        console.log("thisis salt ==== ", salt);
        user.Password = await bcrypt.hash(user.Password, salt);
        //console.log("thisis user.password ==== ", user.Password);
        let result = await user.save();
        // console.log("this is result >>> ", result);
      
        result = result.toObject();
        delete result.password;
        //console.log("sssssss >>> ", result);
        Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            res.send("something went wrong");
          }
          console.log("under JWT sign", result);
          res.send({ result, auth: token });
        });
        //   result = await JSON.stringify(result);
        // res.send(result);
      }
    }