const mongoose = require("mongoose");

const connect = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to DB!");
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = connect;
