const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");
const { multer } = require("../middlewares/FileHandler");

router.get("/bills", billController.getAllBill);
router.get("/bill/:id", billController.getBillById);
router.post("/bill/:id_res", billController.createBill);
router.put("/bill/:id", multer.single("file"), billController.updateBill);

module.exports = router;
