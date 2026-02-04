const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defining Schema
const userSchema = new Schema({
  userName: String, // (should match name="" in input tag)
});

// Creating a model (This model control CRUD operation)
const UserData = mongoose.model("User-Data", userSchema); // "User-Data(s)": name of Collection in MongoDB

module.exports = UserData;
