const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  userId: String,
  company: String,
});

module.exports = mongoose.model("products", productSchema);

/*  
************ this is for validation of product schema ********************
 required: [true, "Please include the product name"]

*/
