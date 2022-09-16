const express = require("express");
const {
  givenTicket,
  unparksVehicule,
} = require("../controllers/ticketController");
const router = express.Router();

router.route("/givenTicket/:id").post(givenTicket);
router.route("/unparkVehicule").post(unparksVehicule);
module.exports = router;
