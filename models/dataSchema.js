const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const Schema = mongoose.Schema;

// Defining Schema
const empSchema = new Schema(
  {
    // (should match name="" in input tag)
    uuid: {
      type: String,
      default: uuid,
      unique: true,
      immutable: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 100,
    },
    country: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
  },
  {
    timestamps: true,
  },
);

// Creating a model (This model control CRUD operation)
const empData = mongoose.model("Employee", empSchema); // "Employee(s)": name of Collection in MongoDB

module.exports = empData;
