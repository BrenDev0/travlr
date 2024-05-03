import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { autofillKey } from "../utils/keys";

const NewTripForm = () => {
  const [destination, setDestination] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  useEffect(() => {
    destination
      ? fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${destination}&apiKey=${autofillKey}`
        )
          .then((res) => res.json())
          .then((data) => {
            setSearchData(
              data.features.map((d) => {
                return {
                  country: d.properties.country,
                  city: d.properties.city,
                  id: d.properties.place_id,
                };
              })
            );
          })
      : setDropdown(false);
  }, [destination]);
  return (
    <FormStyled>
      <form action="">
        <label htmlFor="destination">Destination</label>
        <input
          id="destination"
          type="text"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            setDropdown(true);
          }}
        />
        <div className="dropdown">
          <ul>
            {dropdown &&
              searchData.map((i) => {
                return (
                  <li
                    key={i.id}
                    onClick={() => {
                      setDestination(`${i.city}, ${i.country}`);
                      setDropdown(false);
                    }}
                  >
                    <i className="fa-solid fa-earth-americas"></i> {i.city},{" "}
                    {i.country}
                  </li>
                );
              })}
          </ul>
        </div>
      </form>
    </FormStyled>
  );
};

const FormStyled = styled.div`
  form {
    width: 25%;
    display: flex;
    flex-direction: column;
  }

  input {
    height: 40px;
    border-radius: 7px;
    font-size: 1.2rem;
    border: 3px solid var(--light-green);
  }

  input:focus {
    outline: none;
  }

  .dropdown {
    background: var(--green);
    border-radius: 10px;
  }

  .dropdown li {
    padding: 10px;
    color: var(--white);
    margin-top: 5px;
    font-size: 1.2rem;
  }

  .dropdown li:hover {
    cursor: pointer;
  }

  .fa-earth-americas {
    margin-right: 10px;
  }
`;
export default NewTripForm;
