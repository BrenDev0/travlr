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
      <div className="content">
        <div className="form-con">
          <form action="">
            <label htmlFor="title">Title</label>
            <input type="text" required id="title" />
            <label htmlFor="destination">Destination</label>
            <input type="text" id="destination" />
          </form>
        </div>
      </div>
    </TripsStyled>
  );
};

const TripsStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--white);
`;

export default Trips;
