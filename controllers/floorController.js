const expressAsyncHandler = require("express-async-handler");
const Floor = require("../models/floorModel");

const createFloor = expressAsyncHandler(async (req, res) => {
  const { parking_id } = req.body;
  const count = (await Floor.find({ parking_id }).count()) + 1;
  try {
    return Floor.create({ floor_number: count, parking_id }).then(() => {
      res.status(200).json({ message: "Floor Created" });
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//delete floor

const deleteFloor = expressAsyncHandler(async (req, res) => {
  await Floor.deleteOne({ _id: req.params.id })
    .then(res.send({ message: "Floor was deleted successfully!" }))
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Floor ",
      });
    });
});

//get all floors

const findAllFloors = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  await Floor.find({ parking_id: id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving floors.",
      });
    });
});

//get Floor By Id

const getFloorById = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const floor = await Floor.findById(id);
  if (floor) {
    res.status(200).json(floor);
  } else {
    res.status(404).json({ message: "floor not found" });
  }
});

module.exports = { createFloor, deleteFloor, findAllFloors, getFloorById };
