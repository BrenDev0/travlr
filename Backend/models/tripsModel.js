const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
});

const DestinationSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },

  city: {
    name: {
      type: String,
      required: true,
    },
    coordinates: {
      type: object,
      required: true,
    },

    places: [],
  },
});

const TripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  destinations: [DestinationSchema],
});

module.exports = mongoose.model("Trip", TripSchema);
