const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
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
  name: {
    type: String,
    required: true,
  },
  places: [PlaceSchema],
});

const PlaceSchema = new mongoose.Schema({
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

// trips --> countries --> cities ---> places

const TripSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
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
    photos: [],
  },
});

module.exports = mongoose.model("Trip", TripSchema);
