import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../styles/Layout";
import { useGlobalContext } from "../contex/GlobalContex";
import RegisterSkeleton from "../components/skeletons/RegisterSkeleton";
import TripForm from "../components/TripForm";

const RegisterTrip = () => {
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
    <RegisterSkeleton />
  ) : (
    <Layout>
      <RegisterStyled>
        
        <TripForm />
      </RegisterStyled>
    </Layout>
  );
};

const RegisterStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  background: var(--white);

  h1{
    font-size: 2rem;
    margin: 3%;
  }
`;

export default RegisterTrip;
