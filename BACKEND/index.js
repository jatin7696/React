const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/user");
const Product = require("./db/Product");
const Contact = require("./db/Contact");
const Jwt = require("jsonwebtoken");
const Cart = require("./db/cart");
const Razorpay = require("razorpay");
// const jwtKey = "ecom";
const app = express();
const bcrypt = require("bcrypt");
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const { jwtKey } = require("./config");
const Order = require("./db/order");
const cart = require("./db/cart");
const PORT = 8080;
// const dotenv = require("dotenv");
// dotenv.config();
// console.log("this is env key ============ ", jwtKey);

app.post("/create-order", async (req, res) => {
  console.log("this is requestfororder  ", req.body);
  try {
    var instance = new Razorpay({
      key_id: process.env.Razorpay_Key,
      key_secret: process.env.Razorpay_secret,
    });

    let options = {
      amount: req.body.amount, // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options, function (err, order) {
      console.log("orders === ", order);
      if (order == null) {
        console.log("underidconditoion", order);
        return res.status(500).send("some error occured");
      }
      res.send(order);
    });
  } catch (error) {
    console.log(error, "error aa gaya");
  }
});

app.get("/get-razorpay-key", (req, res) => {
  res.send({ key: "rzp_test_AHarLPM8Zl6Anf" });
});

app.post("/pay-order", async (req, res) => {
  try {
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;
    const newOrder = Order({
      isPaid: true,
      amount: amount,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    await newOrder.save();
    res.send({
      msg: "Payment was successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/search/:key", async (req, resp) => {
  // console.log("thisissearchhhhhhhhhhhhhhhhhh", req);
  let result = await Product.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
      {
        company: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
    ],
  });
  //console.log("thisissearchhhhhhhhhhhhhhhhhh  ", result);
  resp.send(result);
});

app.post("/register", async (req, res) => {
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
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.username) {
    // console.log("under if 1");
    let user = await User.findOne(req.body).select("-password");
    console.log("this is login user", user);
    if (user) {
      console.log("under if 2");
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.Password
      );
      if (!validPassword) {
        resp.send({ result: "No User found" });
      }
      // console.log("this is valid ipasswod ===== ", validPassword);

      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        console.log(err, token);
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
});

app.post("/add-product", async (req, resp) => {
  console.log(req.body.price);
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products", async (req, resp) => {
  try {
    const page = parseInt(req.query.page) || "0";
    console.log("this is page === ", page);
    const pageSize = 4;
    const total = await Product.countDocuments({});
    // const { l } = req.query;
    // console.log(page);
    const products = await Product.find()
      .limit(pageSize)
      .skip(pageSize * page);
    resp.json({
      total,
      totalPages: Math.ceil(total / pageSize),
      products,
    });

    if (products.length > 0) {
      resp.send("test");
      // resp.status(400).json({
      //   products,
      //   success: true,
      // });
    } else {
      resp.send({ result: "No Product found" });
    }
  } catch (err) {
    console.log("hard error", err);
  }
});

app.delete("/delete/:id", async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
}),
  app.get("/product/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
      resp.send(result);
    } else {
      resp.send({ result: "No Record Found." });
    }
  });

app.put("/Update/:id", async (req, resp) => {
  console.log("this is update product id ", req.params.id);
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  console.log("this is update product result ", result);
  resp.send(result);
});

app.post("/Contact", async (req, res) => {
  console.log("this is contact us API ==== ", req.body);
  let contact = await Contact(req.body);
  let result = await contact.save();
  console.log("this is contact result === ", result);
  res.send(result);
});

app.post("/addToCart", async (req, res) => {
  // console.log("this is node add to cart == > ", req.body);
  if (req.body != null) {
    console.log("this is node add to cart == > ", req.body);
    let data = req.body;
    //const userId = JSON.parse(localStorage.getItem("user"))._id;
    //  console.log("this is user id ==> ", userId);
    //for (var i = 0; i <= data.length; i++) {
    // if (data[i].userId != null) {
    // console.log("this is from object userid ==== > ", data[i].userId);
    const cartData = await Cart(req.body);
    console.log("this is cart data ====== ", cartData);
    const result = await cartData.save();
    console.log("this is cart result ====== ", result);
    res.send(result);
    //}
    // }
    // let user = await User.findById(req.body.userId);
    // console.log("this is matched userid == ", user);
  }

  // var cartProduct = [req.body];``
  //cartProduct = req.body._id;
  //console.log("cartProduct === >  ", cartProduct);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
