const mongoose = require("mongoose");
const floorSchema = mongoose.Schema({
  floor_number: {
    type: Number,
  },
  parking_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParkingLot",
  },
  slot: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
    },
  ],
});
floorSchema.pre("deleteOne", function(next) {
  const floorId = this.getQuery()["_id"];
  mongoose
    .model("Slot")
    .deleteMany({ floor_id: floorId }, function(err, result) {
      if (err) {
        console.log(`[error] ${err}`);
        next(err);
      } else {
        console.log("success");
        next();
      }
    });
});
const Floor = mongoose.model("Floor", floorSchema);
module.exports = Floor;
