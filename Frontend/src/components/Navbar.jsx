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
      <i class="fa-solid fa-bars"></i>
      <ul className="nav">
        <li className="nav-links">
          <a href="/">Home</a>
        </li>
        <li className="nav-links">
          <a href="/">Map</a>
        </li>
        <li className="nav-links">
          <a href="/">Trips</a>
        </li>
        <li className="nav-links">
          <a href="/">Options</a>
        </li>
        <li>
          <i
            class="fa-solid fa-arrow-right-from-bracket"
            onClick={handleLogout}
          ></i>
        </li>
      </ul>
    </NavbarStyled>
  );
};

const NavbarStyled = styled.nav`
  opacity: 0.85;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 2%;
  right: 2%;
  width: 75%;
  height: 5%;
  z-index: 1;
  font-size: 1rem;

  color: var(--tan);

  .nav {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .fa-solid {
    color: var(--dark-purple);
    font-size: 2rem;
    transition: 0.5s;
  }

  .fa-solid:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  .nav-links {
    background: var(--dark-purple);
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
  }

  .nav-links a {
    color: var(--tan);
    width: 100%;

    text-align: center;
  }
  h1 {
    font-family: "Shadows Into Light", cursive;
    color: var(--purple);
    font-size: 3rem;
  }

  .fa-bars {
    display: none;
  }

  @media (max-width: 1024px) {
    .nav {
      display: none;
    }

    .fa-bars {
      display: inline;
    }
  }
`;

export default Navbar;
