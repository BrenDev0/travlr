import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return (
    <NavbarStyled>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">Trips</a>
        </li>
        <li>
          <a href="/">Options</a>
        </li>
        <li>
          <a href="/">LogOut</a>
        </li>
      </ul>
    </NavbarStyled>
  );
};

const NavbarStyled = styled.nav``;

export default Navbar;
