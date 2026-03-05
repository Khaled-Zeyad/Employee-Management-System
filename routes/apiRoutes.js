const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");

router.post("/", ctrl.addEmployee);
router.post("/search", ctrl.searchEmployee);
router.put("/:uuid", ctrl.updateEmployee);
router.delete("/:uuid", ctrl.deleteEmployee);

module.exports = router;
