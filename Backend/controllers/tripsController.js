const Trip = require("../models/tripsModel")
const User = require("../models/userModel")

// register a new trip
const registerTrip =  async(req, res) => {
    const { title, country, city, coordinates, } =  req.body;
    const user = await User.findById(req.user)
    
    const trip = Trip({
        user,
        title,
        destinations: {
            country,
            city,
            coordinates: {
                lat: coordinates.lat,
                lon: coordinates.lon
            }
        }

    })

    try {
        if (!country|| !city || !coordinates){
            return res.status(400).json({message: "All fields required"})
        }

        await trip.save();
        res.status(200).json({messege: "Trip registered"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }


}


//get all trips 

const getTrips = async (req, res) => {
    const trips = await Trip.find({
        user: req.user,

    })

    res.status(200).json(trips)
}

module.exports = { registerTrip, getTrips }