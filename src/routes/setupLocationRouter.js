const express = require("express");
const router = express.Router();
const setupController = require("../controllers/setupLocationController");

router.get("/setups", setupController.getAllSetup);

router.post("/setup", setupController.createSetup);
module.exports = router;
