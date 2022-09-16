const mongoose = require("mongoose");
const slotSchema = mongoose.Schema({
  slot_number: Number,
  vehicule_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VehiculeType",
  },
  free: {
    type: Boolean,
    default: true,
  },
  floor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Floor",
  },
});

slotSchema.pre("deleteOne", function(next) {
  const slotId = this.getQuery()["_id"];
  mongoose
    .model("Floor")
    .update({}, { $pull: { slot: slotId } }, function(err, result) {
      if (err) {
        console.log(`[error] ${err}`);
        next(err);
      } else {
        console.log("success");
        next();
      }
    });
});
const Slot = mongoose.model("Slot", slotSchema);
module.exports = Slot;
