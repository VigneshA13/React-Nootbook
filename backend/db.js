const mongoose = require("mongoose");
mongoURI = "mongodb://localhost:27017/";

const connectToMongo = () => {
  mongoose.connect(mongoURI);
  console.log("connected.......");
};

module.exports = connectToMongo;
