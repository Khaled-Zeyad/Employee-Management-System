const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
});

mongoose
  .connect("mongodb://rwx:iZF0bCNsUgAvlqie@localhost:27017/Employees-DB")
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
