  import React, { useEffect} from 'react'
import styled from "styled-components"
import Layout from '../styles/Layout'
import { useGlobalContext } from '../contex/GlobalContex'
import HomeSkeleton from '../components/skeletons/HomeSkeleton'

const Trips = () => {
  const { user, getUser, isLoading, setIsLoading } =  useGlobalContext()
  
  useEffect(() => {
    getUser();
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
  return (
    isLoading ? <HomeSkeleton /> 
    : <Layout>
    <TripsStyled>
        <h1>Trips</h1>
    </TripsStyled>
</Layout>
  )
}

const TripsStyled = styled.div``

export default Trips
