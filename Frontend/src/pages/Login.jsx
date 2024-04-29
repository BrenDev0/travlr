import React, { useEffect } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import background from "../images/background.webp";
import { useGlobalContext } from "../contex/GlobalContex";
import { useNavigate } from "react-router-dom";
import HomeSkeleton from "../components/skeletons/HomeSkeleton";

const Login = () => {
  const navigate = useNavigate();
  const { user, isLoading, setIsLoading } = useGlobalContext();
  useEffect(() => {
    setTimeout(() => {
      if (user === null) {
        return null;
      }
      if (user) {
        navigate("/");
      }
      if (!user) {
        setIsLoading(false);
      }
    }, 2000);
  }, [user]);
  return isLoading ? (
    <HomeSkeleton />
  ) : (
    <LoginStyled>
      <LoginForm />
    </LoginStyled>
  );
};

const LoginStyled = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
export default Login;
