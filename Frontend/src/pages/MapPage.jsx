import { useGlobalContext } from "../contex/GlobalContex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Map from "../components/Map";
import HomeSkeleton from "../components/skeletons/HomeSkeleton";
import Layout from "../styles/Layout";

const MapPage = () => {
    const { getUser, user, isLoading, setIsLoading } = useGlobalContext();
    const navigate = useNavigate();
  
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
        <MapStyled>
          <Map />
        </MapStyled>
      </Layout>
    );
  };
  
  const MapStyled = styled.div`
    width: 100%;
    height: 90%;
    background: var(--white);
  `;


export default MapPage
