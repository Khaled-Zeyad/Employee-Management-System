require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const methodOverride = require("method-override");
const app = express();
const port = 3001;
const empData = require("./models/dataSchema");
const country_list = require("./utils/countries");
const moment = require("moment");
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
const connectLivereload = require("connect-livereload");

app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// override with POST having ?_method=DELETE
// app.use(methodOverride("_method"));

// app.use() --> Middleware --> decode Form data come with POST request
// Any HTML Form need: express.urlencoded()
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Without it req.body === undefined

// Add static files (e.g., CSS, JS, Images)
app.use(express.static("public"));

// EJS
app.set("view engine", "ejs");

// GET Requests
app.get("/", (req, res) => {
  empData
    .find()
    .then((result) => {
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user/add", (req, res) => {
  res.render("user/add", { country_list });
});

app.get("/view/:uuid", async (req, res) => {
  try {
    const result = await empData.findOne({ uuid: req.params.uuid });
    if (!result) {
      res.status(404).send("<h1>Employee not found</h1>");
    }
    res.render("user/view", { obj: result, moment: moment });
  } catch (err) {
    console.log(err);
    res.status(500).send("<h1>Server Error</h1>");
  }
});

app.get("/edit/:uuid", async (req, res) => {
  try {
    const result = await empData.findOne({ uuid: req.params.uuid });
    if (!result) {
      res.status(404).send("<h1>Employee not found</h1>");
    }
    res.render("user/edit", {
      obj: result,
      country_list,
      gender_list: ["Male", "Female"],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("<h1>Server Error</h1>");
  }
});

app.get("/user/search", (req, res) => {
  res.render("user/search");
});

// POST Request (Create Employee)
app.post("/user/add", async (req, res) => {
  try {
    const emp = new empData({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      age: req.body.age,
      country: req.body.country,
      gender: req.body.gender,
    });
    await emp.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("<h1>Server Error</h1>");
  }
});

// Delete Request
app.delete("/user/:uuid", async (req, res) => {
  try {
    const result = await empData.findOneAndDelete({ uuid: req.params.uuid });
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
    console.log(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`); // Server work if DB connection success
    });
  })
  .catch((err) => {
    console.log(err);
  });
