const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./routes/main");
const notFound = require("./middleWare/notFound");
const errorHandler = require("./middleWare/errorHandler");
//middleWear
app.use(express.json());
app.use("/api/v1", main);
app.use(express.static("./public"));
//notFound
app.use(notFound);
//errorHandler
app.use(errorHandler);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await app.listen(port, console.log(`server is running on port: ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
