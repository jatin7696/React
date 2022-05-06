const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/schema");

mongoose.connect("mongodb://localhost/pagination", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", async () => {
  if ((await User.countDocuments().exec()) > 0) return;
  Promise.all([
    User.create({ _id: 1, name: "User 1" }),
    User.create({ _id: 2, name: "User 2" }),
    User.create({ _id: 3, name: "User 3" }),
    User.create({ _id: 4, name: "User 4" }),
    User.create({ _id: 5, name: "User 5" }),
    User.create({ _id: 6, name: "User 6" }),
    User.create({ _id: 7, name: "User 7" }),
    User.create({ _id: 8, name: "User 8" }),
    User.create({ _id: 9, name: "User 9" }),
    User.create({ _id: 10, name: "User 10" }),
    User.create({ _id: 11, name: "User 11" }),
    User.create({ _id: 12, name: "User 12" }),
    User.create({ _id: 13, name: "User 13" }),
    User.create({ _id: 14, name: "User 14" }),
    User.create({ _id: 15, name: "User 15" }),
    User.create({ _id: 16, name: "User 16" }),
    User.create({ _id: 17, name: "User 17" }),
    User.create({ _id: 18, name: "User 18" }),
    User.create({ _id: 19, name: "User 19" }),
    User.create({ _id: 20, name: "User 20" }),
    User.create({ _id: 21, name: "User 21" }),
    User.create({ _id: 22, name: "User 22" }),
    User.create({ _id: 23, name: "User 23" }),
    User.create({ _id: 24, name: "User 24" }),
  ]).then(() => console.log("Added All Users"));
});

app.get("/users", paginatedResults(), (req, res) => {
  res.json(res.paginatedResults);
});

function paginatedResults() {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    console.log("user data ", page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;
    const results = {};

    try {
      //console.log("user data ", user.find());

      results.resul = await User.find().limit(limit).skip(skipIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      console.log("error");
      res
        .status(500)
        .json({ message: "Error Occured while fetching the data" });
    }
  };
}

console.log("Server Started!");

// server runs and checks the paginations on this links
// http://localhost:3000/users?page=3&limit=2
app.listen(3000); //http://localhost:3000/users?page=3&limit=2
