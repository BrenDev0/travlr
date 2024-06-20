import { createContext, useContext, useState} from "react";
import axios from "axios"
import { useGlobalContext } from "./GlobalContex";


const TripsContext = createContext()

export const TripsProvider = ({children}) => {
    const TRIPS_URL = "http://localhost:5000/api/trips/"

    const { setError} = useGlobalContext()

    // states
    const [trips, setTrips] = useState([])


    const newTrip  = async (trip) => {
        try {
            await axios.post(`${TRIPS_URL}/register`, trip)
            gatherTrips()
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const gatherTrips = async () => {
        const trips = await axios.get(`${TRIPS_URL}get-trips`)

        trips.data ? setTrips(trips.data) : null
    }

    const addMoment = async (moment, id) => {
        await axios.put(`${TRIPS_URL}add-moment/${id}`, moment, {headers:{'Content-Type': 'multipart/form-data'} } )
        gatherTrips()

    }

    return (
        <TripsContext.Provider
        value={
        {
            newTrip,
            gatherTrips,
            addMoment,
            trips,
        }
        }
        >
            {children}
        </TripsContext.Provider>
    )
}


export const useTripsContext  = () =>  useContext(TripsContext)