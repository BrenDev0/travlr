import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../styles/Layout";
import { useGlobalContext } from "../contex/GlobalContex";
import HomeSkeleton from "../components/skeletons/HomeSkeleton"
import MomentsForm from "../components/MomentsForm";

const Moments = () => {
  const navigate = useNavigate();
  const { setIsLoading, isLoading, user, getUser } = useGlobalContext();

  useEffect(() => {
    getUser();
    setTimeout(() => {
      if (user) {
        return setIsLoading(false);
      }
      else if (!user) {
        return navigate("/login");
      }
      else{
        return null;
      }
    }, 2000);
  }, [user]);

  return isLoading ? (
    <HomeSkeleton />
  ) : (
    <Layout>
      <RegisterStyled>
        <MomentsForm />
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

export default Moments;
