const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/mern_admin";
// mongoose.connect(URI);

const URI = process.env.MONGODB_URI

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("CONNECTION SUCCESSFULL TO DB");
  } catch (error) {
    console.error("DATABASE CONNETION FAILED");
    process.exit(0);
  }
};

module.exports = connectDb;
