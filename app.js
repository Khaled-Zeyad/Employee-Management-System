require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3001;
const UserData = require("./models/dataSchema");

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

// Middleware: decode Form data come with POST request
// Any HTML Form need: express.urlencoded()
app.use(express.urlencoded({ extended: true })); // Without it req.body === undefined

// Add static files (e.g., CSS, JS, Images)
app.use(express.static("public"));

// EJS
app.set("view engine", "ejs");

// Main directory
app.get("/", (req, res) => {
  UserData.find() // Get data from DB by using The Model
    .then((result) => {
      console.log(result.at(-1).userName);
      res.render("home", {
        title: "Home page",
        username: result.at(-1).userName, // Display the last name added
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/index.html", (req, res) => {
  res.send("<h1> Data has been sent! </h1>");
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

// Create POST request (should match path of action attribute in Form tag)
app.post("/", (req, res) => {
  const user = new UserData(req.body);
  console.log(req.body);
  user
    .save()
    .then(() => {
      res.redirect("/index.html");
    })
    .catch((err) => {
      console.log(err);
    });
});
