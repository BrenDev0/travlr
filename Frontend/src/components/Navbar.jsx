import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios.get("http://localhost:5000/api/auth/logout");
    navigate("/login");
  };

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
          <button onClick={handleLogout}>LogOut</button>
        </li>
      </ul>
    </NavbarStyled>
  );
};

const NavbarStyled = styled.nav``;

export default Navbar;
