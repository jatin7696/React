const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  userId: String,
  company: String,
  qty: String,
});

module.exports = mongoose.model("Cart", cartSchema);
