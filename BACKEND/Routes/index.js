const express = require("express");
const router = express.Router();
require("../db/config");
const log = require("../controller/login");
const signup = require("../controller/signup");
const addToCart = require("../controller/addToCart");
const checkout = require("../controller/checkout");
const productWorking = require("../controller/allProductWorking");

router.post("/login", log.login);
router.post("/register", signup.signup);
router.get("/search/:key", productWorking.searchProduct);
router.post("/add-product", productWorking.addProduct);
router.get("/products", productWorking.products);
router.delete("/delete/:id", productWorking.deleteProduct);
router.get("/product/:id", productWorking.productById);
router.put("/Update/:id", productWorking.updateProduct);
router.post("/Contact", productWorking.contact);
router.post("/addToCart", addToCart.addToCart);
router.post("/create-order", checkout.createOrder);
router.get("/get-razorpay-key", checkout.getrazorpaykey);
router.post("/pay-order", checkout.payOrder);

module.exports = router;

// router.get("/search/:key", async (req, resp) => {
//   // console.log("thisissearchhhhhhhhhhhhhhhhhh", req);
//   let result = await Product.find({
//     $or: [
//       {
//         name: { $regex: req.params.key },
//       },
//       {
//         company: { $regex: req.params.key },
//       },
//       {
//         category: { $regex: req.params.key },
//       },
//     ],
//   });
//   //console.log("thisissearchhhhhhhhhhhhhhhhhh  ", result);
//   resp.send(result);
// });

// router.post("/add-product", async (req, resp) => {
//   console.log(req.body.price);
//   let product = new Product(req.body);
//   let result = await product.save();
//   resp.send(result);
// });

// router.get("/products", async (req, resp) => {
//   try {
//     const page = parseInt(req.query.page) || "0";
//     console.log("this is page === ", page);
//     const pageSize = 4;
//     const total = await Product.countDocuments({});
//     // const { l } = req.query;
//     // console.log(page);
//     const products = await Product.find()
//       .limit(pageSize)
//       .skip(pageSize * page);
//     resp.json({
//       total,
//       totalPages: Math.ceil(total / pageSize),
//       products,
//     });

//     if (products.length > 0) {
//       resp.send("test");
//       // resp.status(400).json({
//       //   products,
//       //   success: true,
//       // });
//     } else {
//       resp.send({ result: "No Product found" });
//     }
//   } catch (err) {
//     console.log("hard error", err);
//   }
// });

// router.delete("/delete/:id", async (req, resp) => {
//   let result = await Product.deleteOne({ _id: req.params.id });
//   resp.send(result);
// }),

// router.get("/product/:id", async (req, resp) => {
//   let result = await Product.findOne({ _id: req.params.id });
//   if (result) {
//     resp.send(result);
//   } else {
//     resp.send({ result: "No Record Found." });
//   }
// });

// router.put("/Update/:id", async (req, resp) => {
//   console.log("this is update product id ", req.params.id);
//   let result = await Product.updateOne(
//     { _id: req.params.id },
//     { $set: req.body }
//   );
//   console.log("this is update product result ", result);
//   resp.send(result);
// });

// router.post("/addToCart", async (req, res) => {
//   // console.log("this is node add to cart == > ", req.body);
//   if (req.body != null) {
//     console.log("this is node add to cart == > ", req.body);
//     let data = req.body;
//     //const userId = JSON.parse(localStorage.getItem("user"))._id;
//     //  console.log("this is user id ==> ", userId);
//     //for (var i = 0; i <= data.length; i++) {
//     // if (data[i].userId != null) {
//     // console.log("this is from object userid ==== > ", data[i].userId);
//     const cartData = await Cart(req.body);
//     console.log("this is cart data ====== ", cartData);
//     const result = await cartData.save();
//     console.log("this is cart result ====== ", result);
//     res.send(result);
//     //}
//     // }
//     // let user = await User.findById(req.body.userId);
//     // console.log("this is matched userid == ", user);
//   }

//   // var cartProduct = [req.body];``
//   //cartProduct = req.body._id;
//   //console.log("cartProduct === >  ", cartProduct);
// });
