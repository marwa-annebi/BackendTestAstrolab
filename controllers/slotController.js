const expressAsyncHandler = require("express-async-handler");
const Floor = require("../models/floorModel");
const Slot = require("../models/slotModel");

//create Slot

const createSlot = async function(slot, floor_id) {
  return Slot.create({
    ...slot,
    floor_id,
    slot_number: (await Slot.find({ floor_id }).count()) + 1,
  }).then((docSlot) => {
    return docSlot;
  });
};

const createBlocSlots = expressAsyncHandler(async (req, res) => {
  const { floor_id, slot } = req.body;
  for (let index = 0; index < slot.length; index++) {
    result = await createSlot(slot[index], floor_id);
    console.log(result);
    resultUpdateFloor = await Floor.findByIdAndUpdate(
      floor_id,
      { $push: { slot: result._id } },
      { new: true, useFindAndModify: false }
    );
  }
  if (!result) {
    res.send({ result: "false" });
  } else res.send({ result: "true" });
});

//read All

const readAll = expressAsyncHandler(async (req, res) => {
  await Slot.find({ floor_id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving slots.",
      });
    });
});

//get Slot By Id

const getSlotById = expressAsyncHandler(async (req, res) => {
  const slot = await Slot.findById(req.params.id);
  if (slot) {
    res.status(200).json(slot);
  } else {
    res.status(404).json({ message: "floor not found" });
  }
});

//update slot

const updateSlot = expressAsyncHandler(async (req, res) => {
  const { vehicule_type, free } = req.body;
  try {
    await Slot.findByIdAndUpdate(req.params.id, {
      $set: {
        vehicule_type: vehicule_type,
        free: free,
      },
    });
    res.status(200).send({
      message: "updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete Slot

const deleteSlot = expressAsyncHandler(async (req, res) => {
  await Slot.deleteOne({ _id: req.params.id })
    .then(res.send({ message: "Slot was deleted successfully!" }))
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Slot ",
      });
    });
});

//the number of free slots per floor for a specific vehicle type

const numberfreeSlot = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const typeVehicule = req.params.typeVehicule;
  let count = 0;
  let array = [];
  let slots = [];

  const floors = await Floor.find({ parking_id: id }).populate({
    path: "slot",
    populate: { path: "floor_id", select: "floor_number" },
  });
  floors.map((index, key) => {
    count = 0;
    slots = [];
    index.slot.map((slot) => {
      if (slot.free === true && slot.vehicule_type == typeVehicule) {
        console.log("helo");
        slots.push(slot);
        count++;
      }
    });
    array.push({ key: key, count: count, slot: slots });
  });
  console.log("array", array);
  return array;
});

//the first available slot

const avilableSlot = expressAsyncHandler(async (req, res) => {
  result = await numberfreeSlot(req, res);
  if (result.length === 0) {
    return res.status(400).json({ message: "no free slot" });
  } else {
    const min = Math.min(...result.map((item) => item.key));
    const index = result.indexOf(min) + 1;
    const floor = result[index];
    const minSlot = Math.min(...floor.slot.map((item) => item._id_slot));
    const indexSlot = result.indexOf(minSlot) + 1;
    res.json(floor.slot[indexSlot]);
  }
});

module.exports = {
  createSlot,
  readAll,
  getSlotById,
  deleteSlot,
  updateSlot,
  createBlocSlots,
  avilableSlot,
  numberfreeSlot,
};
