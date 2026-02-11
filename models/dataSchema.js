const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defining Schema
const empSchema = new Schema(
  {
    // (should match name="" in input tag)
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    age: Number,
    country: String,
    gender: String,
  },
  {
    timestamps: true,
  },
);

// Creating a model (This model control CRUD operation)
const empData = mongoose.model("Employee", empSchema); // "Employee(s)": name of Collection in MongoDB

module.exports = empData;
