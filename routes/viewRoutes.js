const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");

// HTML pages
router.get("/", ctrl.getIndexPage);
router.get("/add", ctrl.getAddPage);
router.get("/view/:uuid", ctrl.getViewPage);
router.get("/edit/:uuid", ctrl.getEditPage);

// API routes (JSON)
router.get("/api/allEmployees", ctrl.getIndexPageJSON);
router.get("/api/view/:uuid", ctrl.getViewPageJSON);
router.get("/api/edit/:uuid", ctrl.getViewPageJSON);

module.exports = router;
