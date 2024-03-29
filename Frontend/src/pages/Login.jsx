import React from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <LoginStyled>
      <LoginForm />
    </LoginStyled>
  );
};

const LoginStyled = styled.div``;
export default Login;
