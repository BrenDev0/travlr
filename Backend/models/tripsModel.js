const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  trips: [{ type: mongoose.Types.ObjectId, ref: "Trip" }],
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],

  name: {
    type: String,
    required: true,
  },

  cities: [CitySchema],

  dates: {
    StartDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
});

const CitySchema = new mongoose.Schema({
  trips: [{ type: mongoose.Types.ObjectId, ref: "Trip" }],
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  name: {
    type: String,
    required: true,
  },
  places: [PlaceSchema],
});

const PlaceSchema = new mongoose.Schema({
  trips: [{ type: mongoose.Types.ObjectId, ref: "Trip" }],
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  category: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  photos: [],
});

const TripSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  countries: [CountrySchema],
  description: {
    type: String,
  },
  dates: {
    StartDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
  },
});

module.exports = mongoose.model("Trip", TripSchema);
