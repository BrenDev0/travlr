import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../contex/GlobalContex";

const Navbar = () => {
  const { setUser } = useGlobalContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios.get("http://localhost:5000/api/auth/logout");
    setUser({ status: false });
    navigate("/login");
  };

  return (
    <NavbarStyled>
      <h1>Travlr</h1>
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
