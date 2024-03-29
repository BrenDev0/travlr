import React from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import background from "../images/background.jpg";

const Login = () => {
  return (
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
