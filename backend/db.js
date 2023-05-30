const mongoose = require("mongoose");
mongoURI = "mongodb://0.0.0.0:27017/";

const connectToMongo = () => {
  mongoose.connect(mongoURI);
  console.log("connected.......");
};

module.exports = connectToMongo;
