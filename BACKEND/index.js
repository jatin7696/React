const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/user");
const Product = require("./db/Product");
const Contact = require("./db/Contact");
const Jwt = require("jsonwebtoken");
const jwtKey = "e-com";
const app = express();
const bcrypt = require("bcrypt");
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const PORT = 8080;

app.get("/search/:key", async (req, resp) => {
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
    //  console.log("under if 1");
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
  const products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No Product found" });
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
