import React, { useState } from "react";
import styled from "styled-components";
import logo from "../images/earth.jpg";
import { useGlobalContext } from "../contex/GlobalContex";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifypassword, setVerifyPassword] = useState("");
  const [error, setError] = useState(null);
  const { access } = useGlobalContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const form = { name, email, password };
      const success = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form,
        { withCredentials: true }
      );
      if (success) {
        await access();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className="logo">
        <h1>travlr</h1>
        <span>Embark on an adventure</span>
      </div>
      <img src={logo} alt="globe" />
      <div className="form-inputs">
        <i className="fa-solid fa-user"></i>
        <input
          type="text"
          required
          placeholder="name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-inputs">
        <i className="fa-solid fa-envelope"></i>
        <input
          type="email"
          required
          placeholder="email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-inputs">
        <i className="fa-solid fa-lock"></i>
        <input
          type="password"
          required
          placeholder="password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Signup</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Already have an account? <a href="/login">Login</a>
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
  a:link {
    text-decoration: none;
  }

  a:visited {
    color: red;
  }
`;

export default SignupForm;
