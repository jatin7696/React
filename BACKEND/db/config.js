const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/UserName", {
     useNewUrlParser: true,
     useUnifiedTopology: true
}) .then(() => {
    console.log("Connected to the databse !");
  })
  .catch(err => {
    console.log("Cannot connect to the database !", err);
   // process.exit();
  });
     