import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../styles/Layout";
import NewTripForm from "../components/NewTripForm";
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
    <Layout>
      <TripsStyled>
        <NewTripForm />
      </TripsStyled>
    </Layout>
  );
};

const TripsStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
  background: var(--white);
`;

export default Trips;
