const mongoose = require("mongoose");
const vehiculeTypeSchema = mongoose.Schema({
  name: {
    type: String,
  },
  picture: {
    type: String,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
});
const VehiculeType = mongoose.model("VehiculeType", vehiculeTypeSchema);
module.exports = VehiculeType;
