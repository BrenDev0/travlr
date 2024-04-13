import axios from "axios";
import { useGlobalContext } from "../contex/GlobalContex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Map from "../components/Map";

const Home = () => {
  const {} = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccess = async () => {
      const res = await axios.get("http://localhost:5000/api/auth");

      if (!res.data.status) {
        navigate("/login");
      }
    };
    verifyAccess();
  }, []);

  return (
    <HomeStyled>
      <Map />
    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  width: 100%;
  height: 100%;
`;

export default Home;
