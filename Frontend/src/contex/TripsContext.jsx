import { createContext } from "react";
import axios from "axios"


const TripsContext = createContext()

export const TripsProvider = ({children}) => {
    const TRIPS_URL = "http://localhost:5000/api/trips/"


    const newTrip  = async (trip) => {
        
    }

    return (
        <TripsContext.Provider
        value={
            newTrip
        }
        >
            {children}
        </TripsContext.Provider>
    )
}


export const useTripsContext  = () =>  useContext(TripsContext)