const expressAsyncHandler = require("express-async-handler");
const Slot = require("../models/slotModel");
const Ticket = require("../models/ticketModel");

const givenTicket = expressAsyncHandler(async (req, res) => {
  const { entry_time, exit_time } = req.body;
  const id = req.params.id;
  if (!entry_time || !exit_time) {
    res.status(400).json({ message: "Please Fill all the feilds" });
  } else {
    const ticket = await new Ticket({
      _id_ticket: Math.random()
        .toString(36)
        .substr(2, 9),
      entry_time,
      exit_time,
      slot_id: id,
    }).save();
    const slot = await Slot.findByIdAndUpdate(id, { free: false }).populate(
      "floor_id"
    );

    res.json({ ticket, slot });
  }
});

const unparksVehicule = expressAsyncHandler(async (req, res) => {
  const { _id_ticket } = req.body;
  if (!_id_ticket) {
    res.status(400);
    throw new Error("Please Fill  the feild");
  }
  const result = await Ticket.findOne({ _id_ticket });
  if (result) {
    await Slot.findByIdAndUpdate(result.slot_id, { free: true }).populate(
      "floor_id"
    );
    await Ticket.findByIdAndUpdate(result._id, { status: "archived" });
    res.status(200).json({ message: "Success" });
  } else {
    res.status(400).json({ message: "invalid ticket id " });
  }
});
module.exports = { givenTicket, unparksVehicule };
