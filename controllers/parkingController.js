const expressAsyncHandler = require("express-async-handler");
const ParkingLot = require("../models/parkingModel");

//create parking

const addParking = expressAsyncHandler(async (req, res) => {
  const {
    parking_name,
    details: { address_1, address_2 },
  } = req.body;
  const parkingNameExist = await ParkingLot.findOne({
    parking_name: parking_name,
  });
  if (parkingNameExist) {
    res.json({ message: "exist parking name" });
  } else {
    const park = await new ParkingLot({
      parking_name,
      details: { address_1, address_2 },
    }).save();
    res.json(park);
  }
});

//read all

const findAllParkings = expressAsyncHandler(async (req, res) => {
  await ParkingLot.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving parkings.",
      });
    });
});

//delete parking

const deleteParking = expressAsyncHandler(async (req, res) => {
  await ParkingLot.deleteOne({ _id: req.params.id })
    .then(res.send({ message: "Parking was deleted successfully!" }))
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Parking ",
      });
    });
});

//get By id

const getParkingById = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const parking = await ParkingLot.findById(id);
  if (parking) {
    res.status(200).json(parking);
  } else {
    res.status(404).json({ message: "parking not found" });
  }
});

//update parking

const updateParking = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const {
    parking_name,
    details: { address_1, address_2 },
  } = req.body;
  try {
    await ParkingLot.findByIdAndUpdate(id, {
      $set: {
        parking_name: parking_name,
        "details.address_1": address_1,
        "details.address_2": address_2,
      },
    });
    res.status(200).send({
      message: "updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = {
  addParking,
  deleteParking,
  updateParking,
  getParkingById,
  findAllParkings,
};
