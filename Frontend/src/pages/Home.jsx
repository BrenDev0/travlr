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
    <HomeStyled>
      <Navbar />
      <Map />
    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  width: 100%;
  height: 100%;
  background: var(--white);
`;

export default Home;
