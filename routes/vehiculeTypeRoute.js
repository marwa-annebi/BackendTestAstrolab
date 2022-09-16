const express = require("express");
const {
  createVehiculeType,
  updateTypeVehicule,
  deleteVehiculeType,
  getAllVehiculeTypes,
  getVehiculeType,
} = require("../controllers/vehiculeTypeController");
const router = express.Router();

router.route("/createVehiculeType").post(createVehiculeType);
router.route("/getAllVehiculeTypes").get(getAllVehiculeTypes);
router
  .route("/:id")
  .delete(deleteVehiculeType)
  .get(getVehiculeType)
  .put(updateTypeVehicule);

module.exports = router;
