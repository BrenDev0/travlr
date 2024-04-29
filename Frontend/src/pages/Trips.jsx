import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useGlobalContext } from "../contex/GlobalContex";
import HomeSkeleton from "../components/skeletons/HomeSkeleton";

const Trips = () => {
  const navigate = useNavigate();
  const { setIsLoading, isLoading, user, getUser } = useGlobalContext();
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

  return isLoading ? (
    <HomeSkeleton />
  ) : (
    <TripsStyled>
      <Navbar />
      <form action="">
        <label htmlFor="title">Title</label>
        <input type="text" required id="title" />
        <label htmlFor="destination">Destination</label>
        <input type="text" required id="destination" />
      </form>
    </TripsStyled>
  );
};

const TripsStyled = styled.div`
  display: flex;
`;

export default Trips;
