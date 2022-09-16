const mongoose = require("mongoose");
const parkingSchema = mongoose.Schema({
  parking_name: {
    type: String,
  },
  details: {
    address_1: String,
    address_2: String,
  },
});
parkingSchema.pre("deleteOne", function(next) {
  const parkingnId = this.getQuery()["_id"];
  mongoose
    .model("Floor")
    .deleteMany({ parking_id: parkingnId }, function(err, result) {
      if (err) {
        console.log(`[error] ${err}`);
        next(err);
      } else {
        console.log("success");
        next();
      }
    });
});
const ParkingLot = mongoose.model("ParkingLot", parkingSchema);
module.exports = ParkingLot;
