import React, { useState } from "react";
import styled from "styled-components";
import logo from "../images/earth.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../contex/GlobalContex";

const LoginForm = () => {
  const { access } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const form = { email, password };
      const success = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
        { withCredentials: true }
      );
      if (success) {
        await access();
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className="logo">
        <h1>travlr</h1>
        <span>Share your adventure</span>
      </div>
      <img src={logo} alt="globe" />
      <div className="form-inputs">
        <i className="fa-solid fa-envelope"></i>
        <input
          type="emial"
          placeholder="email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-inputs">
        <i className="fa-solid fa-lock"></i>
        <input
          type="password"
          placeholder="password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Don't have an account? <a href="/signup">Signup</a>
      </p>
    </FormStyled>
  );
};

const FormStyled = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 75%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background: white;
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 40%;
    border-radius: 100%;
  }
  h1 {
    font-family: "Shadows Into Light", cursive;
    font-weight: 400;
    font-style: normal;
    font-size: 3vw;
  }
  .form-inputs {
    display: flex;
    align-items: center;
    font-size: 20px;

    i {
      font-size: 1.8vw;
    }

    input {
      border-radius: 5px;
      width: 100%;
      height: 100%;
      margin-left: 10px;
      font-size: 16px;
      padding-left: 3px;
    }
  }
  button {
    font-size: 1vw;
    width: 20%;
    height: 7%;
    cursor: pointer;
    border: none;
    border-radius: 10px;
  }

  button:active {
    transform: scale(1.2);
    transition: ease-in-out 0.2s;
  }
  a {
    text-decoration: none;
    color: red;
  }
`;

export default LoginForm;
