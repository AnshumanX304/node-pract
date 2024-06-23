const mongoose = require("mongoose");
require('dotenv').config();
const dbconnection = async() => {
  try {
    await mongoose.connect(process.env.dbconfig);
    console.log("database connected !")
  } catch (err) {
    console.log(err);
  }
};
module.exports = dbconnection;
