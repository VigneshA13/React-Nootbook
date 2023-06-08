const connectToMongo = require("./db");
const express = require("express");

const cors = require("cors");
const app = express();

connectToMongo();

app.use(cors());

// the below line return the value in console in json formate
app.use(express.json());

// Available Routes
app.use("/api/login", require("./routes/login"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("welcome....");
});
