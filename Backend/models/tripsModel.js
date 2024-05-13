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

  city:{
    type: String,
    required: true
  },

  coordinates: {
    type: Object,
    required: true
  },

  places: [PlaceSchema]
});

const TripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
  },

  destinations: [DestinationSchema],
});

module.exports = mongoose.model("Trip", TripSchema);
