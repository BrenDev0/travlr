const mongoose = require("mongoose");
const Trips = require("./tripsModel");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  trips: [{ types: mongoose.Types.ObjectId, ref: "Trip" }],
});

module.exports = mongoos.model("User", UserSchema);
