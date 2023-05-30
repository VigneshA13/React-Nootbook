const connectToMongo = require("./db");
const express = require("express");

const app = express();
connectToMongo();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("welcome....");
});
