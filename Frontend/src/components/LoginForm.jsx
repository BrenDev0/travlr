import React from "react";
import styled from "styled-components";

const LoginForm = () => {
  return (
    <FormStyled>
      <div className="form-inputs">
        <label htmlFor="">Email:</label>
        <input type="text" placeholder="email..." />
      </div>

      <div className="form-inputs">
        <label htmlFor="">Password:</label>
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
  width: 40%;
  height: 50%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  .form-inputs {
    display: flex;
    flex-direction: column;
    font-size: 20px;
    align-items: left;

    label {
      margin-bottom: 15px;
      align-self: left;
    }

    input {
      border-radius: 5px;
      width: 300px;
      height: 40px;
      margin-left: 10px;
      font-size: 16px;
      padding-left: 3px;
    }
  }
  button {
    font-size: 17px;
    width: 20%;
    height: 10%;
    cursor: pointer;
    border: none;
    border-radius: 10px;
  }
  a,
  p {
    font-size: 20px;
    align-self: flex-end;
    margin-right: 20px;
    text-decoration: none;
  }
`;

export default LoginForm;
