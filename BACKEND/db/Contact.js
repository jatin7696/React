const mongoose = require("mongoose");
const ContactSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Mobile: Number,
  Description: String,
});

module.exports = mongoose.model("Contact", ContactSchema);
