const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema
const userSchema = new Schema({
  userName: String,
});

// Model
const UserData = mongoose.model("User-Data", userSchema);
module.exports = UserData;
