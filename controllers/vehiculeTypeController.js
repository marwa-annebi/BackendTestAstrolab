const expressAsyncHandler = require("express-async-handler");
const VehiculeType = require("../models/VehiculeType");

//create vehicule

const createVehiculeType = expressAsyncHandler(async (req, res) => {
  const { name, picture } = req.body;
  const nameExist = await VehiculeType.findOne({ name: name });
  try {
    if (nameExist) {
      res.status(400).json({ message: "vehicule type exist" });
    } else {
      const vehiculetype = await new VehiculeType({
        name,
        picture,
      }).save();
      res.json(vehiculetype);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//read all

const getAllVehiculeTypes = expressAsyncHandler(async (req, res) => {
  try {
    const vehiculeTypes = await VehiculeType.find();
    res.status(200).send(vehiculeTypes);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//update vehicule

const updateTypeVehicule = expressAsyncHandler(async (req, res) => {
  const { name, picture } = req.body;
  try {
    await VehiculeType.findByIdAndUpdate(req.params.id, {
      $set: {
        name: name,
        picture: picture,
      },
    });
    res.status(200).send({
      message: "updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete vehicule type

const deleteVehiculeType = expressAsyncHandler(async (req, res) => {
  await VehiculeType.deleteOne({ _id: req.params.id })
    .then(res.send({ message: "Vehicule Type was deleted successfully!" }))
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete vehicule type ",
      });
    });
});

//get vehicule type

const getVehiculeType = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const vehiculetype = await VehiculeType.findById(id);
    if (vehiculetype) {
      res.status(200).json(vehiculetype);
    } else {
      res.status(404).json({ message: "vehicule type not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createVehiculeType,
  updateTypeVehicule,
  deleteVehiculeType,
  getAllVehiculeTypes,
  getVehiculeType,
};
