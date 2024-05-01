import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../contex/GlobalContex";

const Navbar = () => {
  const { setUser } = useGlobalContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios.get("http://localhost:5000/api/auth/logout");
    setUser(false);
    navigate("/login");
  };

  const showMenu = () => {
    const nav = document.getElementsByClassName("nav");
    nav[0].style.right = "0";
  };

  const hideMenu = () => {
    const nav = document.getElementsByClassName("nav");
    nav[0].style.right = "-200px";
  };

  return (
    <NavbarStyled>
      <h1>Travlr</h1>

      <i className="fa-solid fa-bars" onClick={() => showMenu()}></i>

      <ul className="nav">
        <i className="fa-solid fa-xmark" onClick={() => hideMenu()}></i>
        <li className="nav-links">
          <a href="/">Home</a>
        </li>
        <li className="nav-links">
          <a href="/">Map</a>
        </li>
        <li className="nav-links">
          <a href="/trips">Trips</a>
        </li>
        <li className="nav-links">
          <a href="/">Options</a>
        </li>
        <li>
          <i
            className="fa-solid fa-arrow-right-from-bracket"
            onClick={handleLogout}
          ></i>
        </li>
      </ul>
    </NavbarStyled>
  );
};

const NavbarStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
  font-size: 1rem;
  overflow: hidden;
  color: var(--red);
  padding: 10px;

  .nav {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .fa-solid {
    color: var(--red);
    font-size: 2rem;
    transition: 0.5s;
  }

  .fa-solid:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  .nav-links {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
  }

  .nav-links a {
    color: var(--black);
    width: 100%;

    text-align: center;
  }
  h1 {
    font-family: "Shadows Into Light", cursive;
    color: var(--red);
    font-size: 3rem;
  }

  .fa-bars {
    display: none;
  }

  .fa-xmark {
    display: none;
  }

  @media (max-width: 1024px) {
    .nav {
      position: absolute;
      background: #f44336;
      height: 100%;
      width: 200px;
      text-align: left;
      top: 0;
      right: -200px;
      z-index: 1;
      transition: 1s;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-evenly;
    }

    .nav-links {
      margin-left: 10px;

      background: transparent;
    }

    .fa-bars {
      display: inline;
    }
    .fa-xmark {
      display: inline;
      margin-left: 10px;
    }
  }
`;

export default Navbar;
