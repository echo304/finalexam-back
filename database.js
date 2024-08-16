const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const mongoDB = "mongodb+srv://final:final@cluster0.ez7ugjh.mongodb.net/BookDB";

async function main() {
  await mongoose.connect(mongoDB);
}

module.exports = main;