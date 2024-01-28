const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connect database successfully!");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
