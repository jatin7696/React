const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  Password: String,
});
// userSchema.pre("save", function (next) {
//   const userSchema = this;
//   console.log("admin.modal ==== > ", userSchema);

//   bcrypt.genSalt(10, function (err, salt) {
//     if (err) {
//       res.json({ success: false, msg: err.message });
//     } else {
//       bcrypt.hash(userSchema.Password, salt, function (err, hashed) {
//         if (err) {
//           return next(err);
//         }
//         console.log("Hashed .......... ==== ", hashed);
//         userSchema.password = hashed;
//         console.log(
//           "this is under usershema password ======= ",
//           userSchema.password
//         );
//         // return ab;
//         next();
//       });
//     }
//   });
// });
module.exports = mongoose.model("users", userSchema);
