const express = require("express");
const {
  addParking,
  deleteParking,
  getParkingById,
  findAllParkings,
  updateParking,
} = require("../controllers/parkingController");
const router = express.Router();

router.route("/createParking").post(addParking);
router.route("/getAllParkings").get(findAllParkings);
router
  .route("/:id")
  .delete(deleteParking)
  .get(getParkingById)
  .put(updateParking);
module.exports = router;
