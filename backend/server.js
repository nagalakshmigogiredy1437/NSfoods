const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const vendorRoutes = require("./Routes/vendorRoute");
const restaurentRoutes = require("./Routes/restaurentRoute");
const productRoutes = require("./Routes/productRoute");
const path = require("path");

const app = express();
dotEnv.config();

const PORT = process.env.PORT;
const mongo_uri = process.env.Mongodb;
mongoose
  .connect(mongo_uri)
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log("error in mongo connection", err);
  });
app.use(bodyparser.json());
app.use("/vendor", vendorRoutes);
app.use("/restaurent", restaurentRoutes);
app.use("/product", productRoutes);
app.use("/uploads/", express.static("uploads"));

app.listen(PORT, () => {
  console.log("server listening on the port 4000");
});

app.use("/home", (req, res) => {
  res.send("<h1>welcome to tasty Food</h1>");
});
