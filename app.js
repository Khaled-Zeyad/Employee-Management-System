require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3001;
const empData = require("./models/dataSchema");
const moment = require("moment");

// Auto-refresh
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

// app.use() --> Middleware --> decode Form data come with POST request
// Any HTML Form need: express.urlencoded()
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
  res.render("user/add");
});

app.get("/user/edit", (req, res) => {
  res.render("user/edit");
});

app.get("/user/search", (req, res) => {
  res.render("user/search");
});

app.get("/user/:id", (req, res) => {
  empData
    .findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

// POST Requests
app.post("/user/add", (req, res) => {
  const emp = new empData(req.body);
  emp
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
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
