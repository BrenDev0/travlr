import axios from "axios";
import { useGlobalContext } from "../contex/GlobalContex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Map from "../components/Map";
import HomeSkeleton from "../components/skeletons/HomeSkeleton";

const Home = () => {
  const { getUser, user, isLoading } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
    if (user) {
      !user.status && navigate("/login");
    }
  }, [user]);

  return !isLoading ? (
    <HomeStyled>
      <Map />
    </HomeStyled>
  ) : (
    <HomeSkeleton />
  );
};

const HomeStyled = styled.div`
  width: 100%;
  height: 100%;
`;

export default Home;
