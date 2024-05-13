import { createContext, useContext, useState} from "react";
import axios from "axios"
import { useGlobalContext } from "./GlobalContex";


const TripsContext = createContext()

export const TripsProvider = ({children}) => {
    const TRIPS_URL = "http://localhost:5000/api/trips/"

    const { setError } = useGlobalContext()


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
        const trips = await axios.get(`${TRIPS_URL}/trips`)

        setTrips(trips.data)
    }

    return (
        <TripsContext.Provider
        value={
        {
            newTrip,
            gatherTrips,
            trips,
        }
        }
        >
            {children}
        </TripsContext.Provider>
    )
}


export const useTripsContext  = () =>  useContext(TripsContext)