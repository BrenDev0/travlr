const mongoose = require("mongoose");

const MomentsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  coordinates:{
    type: Object,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  photos: []
});



const TripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  adventure: {
    type: String,
    required: true
  },

  country: {
    type: String,
    required: true
  },

  state: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  coordinates: {
    type: Object,
    required: true
  },

  moments: [MomentsSchema]

});

module.exports = mongoose.model("Trip", TripSchema);
