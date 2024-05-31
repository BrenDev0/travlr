  import React, { useEffect} from 'react'
import styled from "styled-components"
import Layout from '../styles/Layout'
import TicketForm from "../components/TicketForm"
import { useGlobalContext } from '../contex/GlobalContex'
import HomeSkeleton from '../components/skeletons/HomeSkeleton'
import { useTripsContext } from '../contex/TripsContext'

const Adventures = () => {
  const { user, getUser, isLoading, setIsLoading } =  useGlobalContext()
  const { trips, gatherTrips} = useTripsContext()
  
  useEffect(() => {
    getUser();
    gatherTrips();
    setTimeout(() => {
      if (user === null) {
        return null;
      }
      if (user) {
        return setIsLoading(false);
      }
      if (!user) {
        return navigate("/login");
      }
    }, 2000);
  }, [user]);

  // useEffect(() => {
  //   destination
  //   ? fetch(
  //       `https://api.geoapify.com/v1/geocode/autocomplete?text=${destination}&apiKey=${autofillKey}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setDestinationResults(
  //           data.features.map((d) => {
  //             return {
  //               country: d.properties.country,
  //               city: d.properties.city,
  //               id: d.properties.place_id,
  //               coordinates: d.geometry.coordinates
  //             };
  //           })
  //         )
          
  //         ;
  //       })
  //   : setDestinationDropdown(false)
  // }, [destination])
  return (
    isLoading ? <HomeSkeleton /> 
    : <Layout>
    <TripsStyled>
        <TicketForm height={"65%"} width={"80%"} />
    </TripsStyled>
</Layout>
  )
}

const TripsStyled = styled.div`
width: 100%;
height: 90%;
display: flex;
justify-content: center;
align-items: center;

`

export default Adventures
