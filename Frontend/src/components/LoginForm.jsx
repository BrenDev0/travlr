import React from "react";
import styled from "styled-components";
import logo from "../images/logo.jpg";

const LoginForm = () => {
  return (
    <FormStyled onSubmit={(e) => e.preventDefault()}>
      <div className="logo">
        <h1>travlr</h1>
        <span>Embark on an adventure</span>
      </div>
      <img src={logo} alt="globe" />
      <div className="form-inputs">
        <i className="fa-solid fa-envelope"></i>
        <input type="text" placeholder="email..." />
      </div>

      <div className="form-inputs">
        <i class="fa-solid fa-lock"></i>
        <input type="text" placeholder="password..." />
      </div>
      <button>Login</button>
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
    width: 50%;
    border-radius: 100%;
  }
  h1 {
    font-family: "Shadows Into Light", cursive;
    font-weight: 400;
    font-style: normal;
    font-size: 50px;
  }
  .form-inputs {
    display: flex;
    align-items: center;
    font-size: 20px;

    i {
      font-size: 2vw;
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
    font-size: 17px;
    width: 20%;
    height: 7%;
    cursor: pointer;
    border: none;
    border-radius: 10px;
  }
  a,
  p {
    font-size: 1.1rem;

    margin-right: 20px;
    text-decoration: none;
  }
`;

export default LoginForm;
