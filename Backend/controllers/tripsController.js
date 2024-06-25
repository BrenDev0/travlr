const Trip = require("../models/tripsModel")
const User = require("../models/userModel")


// register a new trip
const registerTrip =  async(req, res) => {
    const { adventure, country, city, coordinates, } =  req.body;
    const user = await User.findById(req.user)
    
    const trip = Trip({
        user,
        adventure,
        country,
        city,
        coordinates: {
                lat: coordinates.lat,
                lon: coordinates.lon
            },
        moments: []    
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

//add moments
const addMoment = async (req, res) => {
    try {
        const { id } = req.params
        const { name, category, address, lat, lon} = req.body
        const photos = req.files
        await Trip.findByIdAndUpdate(
            {_id: id},
        {
            $push: {
                moments: {
                    name, 
                    category,
                    address,
                    coordinates: {
                        lat: parseFloat(lat),
                        lon: parseFloat(lon)
                    },
                    photos
                }
            }
        }
        )
        res.status(200).json({message: "Moment added"})
    } catch (error) {
        return res.status(500).json({message: error.message})
        
    }
}

module.exports = { registerTrip, getTrips, addMoment }