import React from "react";
import styled from "styled-components";

const Form = () => {
  return (
    <FormStyled>
      <div className="form-inputs">
        <label htmlFor="">Email:</label>
        <input type="text" />
      </div>

      <div className="form-inputs">
        <label htmlFor="">Passowrd:</label>
        <input type="text" />
      </div>
      <button>Login</button>
    </FormStyled>
  );
};

const FormStyled = styled.form``;

export default Form;
