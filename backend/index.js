const connectToMongo = require("./db");
const express = require("express");

const app = express();
connectToMongo();

// Available Routes
app.use("/api/login", require("./routes/login"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("welcome....");
});
