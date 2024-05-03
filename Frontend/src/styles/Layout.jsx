import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <LayoutStyled>
      <Navbar />
      {children}
    </LayoutStyled>
  );
};

const LayoutStyled = styled.div`
  width: 100%;
  height: 100%;
`;

export default Layout;
