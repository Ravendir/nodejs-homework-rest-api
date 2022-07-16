const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connection successful");
  } catch (error) {
    console.error(error.message);
    process.exit();
  }
};

module.exports = { dbConnection };