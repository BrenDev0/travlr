import axios from "axios";
import React, { useRef } from "react";
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

  const sideBar = useRef();

  const showSideNav = () => {
    sideBar.current.style.display = "flex";
    sideBar.current.style.right = "0";
  };

  const hideSideNav = () => {
    sideBar.current.style.right = "-500px";
    setTimeout(() => {
      sideBar.current.style.display = "none";
    }, 1500);
  };

  return (
    <NavbarStyled>
      <h1>Travlr</h1>
      <i className="fa-solid fa-bars" id="hamburger" onClick={showSideNav}></i>
      <ul className="nav">
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

      {/* -----------------------mobile menu--------------------- */}

      <ul ref={sideBar} className="side-bar">
        <i className="fa-solid fa-xmark" onClick={hideSideNav}></i>
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
  color: var(--red);
  padding: 10px;
  background: var(--gray);

  .nav {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .side-bar {
    position: absolute;
    background: var(--orange);
    right: 0;
    top: 0;
    width: 50%;
    height: 100%;
    border: 1px solid black;
    z-index: 1;
    display: none;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    transition: 1.5s;
    animation: sideBar 1.5s;
  }

  @keyframes sideBar {
    0% {
      right: -500px;
    }
    100% {
      right: 0;
    }
  }

  .side-bar .nav-links {
    padding: 20px;
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

  .side-bar .nav-links:hover {
    background: var(--red);
  }
  .nav-links {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
  }

  .side-bar .nav-links {
    width: 100%;
    justify-content: left;
    align-items: flex-start;
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

  @media (max-width: 1024px) {
    .nav {
      display: none;
    }
    .fa-bars {
      display: block;
    }
  }
`;

export default Navbar;
