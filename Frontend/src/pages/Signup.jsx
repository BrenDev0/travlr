import React from "react";
import styled from "styled-components";
import background from "../images/background.webp";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <LoginStyled>
      <SignupForm />
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
export default Signup;
