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
    </TripsStyled>
  );
};

const TripsStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--white);

  form {
    border: 2px solid var(--red);
    border-radius: 10px;
    padding: 15px;
    height: 75%;
  }
`;

export default Trips;
