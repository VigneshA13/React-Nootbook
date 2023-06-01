const mongoose = require("mongoose");
let mongoURI = "mongodb://0.0.0.0:27017/test";

const connectToMongo = async () => {
  await mongoose.connect(mongoURI);
  console.log("connected.......");
};

module.exports = connectToMongo;
