require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3001;
const UserData = require("./models/dataSchema");

// Middleware: decode Form data come with POST request
// Any HTML Form need: express.urlencoded()
app.use(express.urlencoded({ extended: true })); // Without it req.body === undefined

app.get("/", (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
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
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
