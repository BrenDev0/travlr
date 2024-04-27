import axios from "axios";
import { useGlobalContext } from "../contex/GlobalContex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Map from "../components/Map";
import HomeSkeleton from "../components/skeletons/HomeSkeleton";

const Home = () => {
  const { getUser, user, isLoading, setIsLoading } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      user.status ? setIsLoading(false) : navigate("/login");
    }, 2000);
  }, [user]);

  return !isLoading ? (
    <HomeStyled>
      <Navbar />
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
