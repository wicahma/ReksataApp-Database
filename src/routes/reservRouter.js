const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const reservController = require('../controllers/reservController')


router.get("/reservasis", reservController.getAllReserv);
router.get("/reservasi/:rid", reservController.getReservByID);
router.get("/reservasi", reservController.getReservByKey);
router.post("/reservasi", reservController.createReserv);
router.delete("/reservasi", reservController.deleteReserv);
router.put("/reservasi", reservController.updateReserv);
  
module.exports = router