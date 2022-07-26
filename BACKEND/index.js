const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const PORT = 8080;

app.use("/api", require("./Routes/index"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
