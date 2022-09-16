const express = require("express");
const router = express.Router();
const {
  createSlot,
  readAll,
  deleteSlot,
  getSlotById,
  updateSlot,
  createBlocSlots,
  numberfreeSlot,
  avilableSlot,
} = require("../controllers/slotController");

router.route("/createSlot").post(createSlot);

router.route("/getAllSlots/:id").get(readAll);

router
  .route("/:id")
  .delete(deleteSlot)
  .get(getSlotById)
  .put(updateSlot);

router.route("/createBlocSlots").post(createBlocSlots);

router.route("/numberOfFreeSlot/:id/:typeVehicule").get(numberfreeSlot);

router.route("/avilableSlot/:id/:typeVehicule").get(avilableSlot);

module.exports = router;
