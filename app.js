require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
});

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
