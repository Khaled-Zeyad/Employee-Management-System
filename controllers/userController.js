const empData = require("../models/dataSchema");
const { employeeFields } = require("../config/fieldPolicies");
const { sanitizeBody } = require("../utils/sanitize");
const country_list = require("../utils/countries");
const moment = require("moment");
const gender_list = ["Male", "Female"];

// HTML
exports.getIndexPage = async (req, res) => {
  try {
    const arr = await empData.find();
    res.render("index", { arr, moment, uuid: "" });
  } catch (err) {
    console.log(err);
    res.status(500).send("<h1>Server Error</h1>");
  }
};

exports.getAddPage = (req, res) => {
  res.render("user/add", { country_list, gender_list });
};

exports.getViewPage = async (req, res) => {
  try {
    const obj = await empData.findOne({ uuid: req.params.uuid });
    if (!obj) return res.status(404).send("<h1>Employee not found</h1>");
    res.render("user/view", { uuid: req.params.uuid, obj, moment });
  } catch (err) {
    console.log(err);
    res.status(500).send("<h1>Server Error</h1>");
  }
};

exports.getEditPage = async (req, res) => {
  try {
    const obj = await empData.findOne({ uuid: req.params.uuid });
    if (!obj) return res.status(404).send("<h1>Employee not found</h1>");
    res.render("user/edit", {
      uuid: req.params.uuid,
      obj,
      country_list,
      gender_list,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("<h1>Server Error</h1>");
  }
};

// JSON
exports.getIndexPageJSON = async (req, res) => {
  try {
    const arr = await empData.find();
    res.json(arr);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getViewPageJSON = async (req, res) => {
  try {
    const obj = await empData.findOne({ uuid: req.params.uuid });

    if (!obj) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(obj);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getEditPageJSON = async (req, res) => {
  try {
    const obj = await empData.findOne({ uuid: req.params.uuid });
    if (!obj) return res.status(404).json({ message: "Employee not found" });
    res.json(obj);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addEmployee = async (req, res) => {
  try {
    const sanitizedBody = sanitizeBody(req.body, employeeFields.create);
    const emp = await empData.create(sanitizedBody);
    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: emp,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.searchEmployee = async (req, res) => {
  try {
    const searchText = String(req.body.searchText || "").trim();
    if (!searchText) return res.redirect("/");
    function escapeRegex(text) {
      return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    const safeText = escapeRegex(searchText);
    const searchNumber = parseInt(safeText);
    let query = {
      $or: [
        { firstName: { $regex: safeText, $options: "i" } },
        { lastName: { $regex: safeText, $options: "i" } },
      ],
    };
    if (!isNaN(searchNumber)) query.$or.push({ age: searchNumber });
    const arr = await empData.find(query);
    res.render("user/search", { arr, moment });
  } catch (err) {
    console.log(err);
    res.status(500).send("<h1>Server Error</h1>");
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const sanitizedBody = sanitizeBody(req.body, employeeFields.update);
    const updated = await empData.findOneAndUpdate(
      { uuid: req.params.uuid },
      { $set: sanitizedBody },
      { new: true, runValidators: true },
    );
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: updated,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const deleted = await empData.findOneAndDelete({ uuid: req.params.uuid });
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
