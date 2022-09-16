const mongoose = require("mongoose");
const ticketSchema = mongoose.Schema({
  _id_ticket: String,
  entry_time: String,
  exit_time: String,
  slot_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slot",
  },
  status: {
    type: String,
    default: "active",
  },
});
const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
