const express = require("express");
const {
  createFloor,
  findAllFloors,
  deleteFloor,
  getFloorById,
} = require("../controllers/floorController");
const router = express.Router();
router.route("/createFloor").post(createFloor);
router.route("/getAllFloors/:id").get(findAllFloors);
router
  .route("/:id")
  .delete(deleteFloor)
  .get(getFloorById);
module.exports = router;
