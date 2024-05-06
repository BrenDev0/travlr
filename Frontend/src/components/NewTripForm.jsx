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
      <div className="main-con ticket">
        <div className="stripe">
          <i className="fa-solid fa-plane"></i>
          <span>Ticket</span>
        </div>
        <form action="" id="main">
          <label htmlFor="from">From:</label>
          <input type="text" required id="from" />
          <label htmlFor="destination">To:</label>
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
      </div>
      <div className="stub-con ticket">
        <div className="stripe"></div>
        <form id="stub"></form>
      </div>
    </FormStyled>
  );
};

const FormStyled = styled.div`
  width: 65%;
  height: 50%;
  border-radius: 10px;
  display: flex;

  .ticket {
    border: 2px solid gray;
    border-radius: 10px;
  }
  .main-con {
    border-right: none;
    width: 75%;
    height: 85%;
    display: flex;
    flex-direction: column;
  }

  .stub-con {
    width: 25%;
    height: 85%;
    border-left: 2px dashed gray;
  }

  .stripe {
    width: 100%;
    height: 15%;
    border-radius: 10px 10px 0 0;
    background: var(--red);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .stripe span {
    font-size: 1.5rem;
    margin-left: 10px;
  }

  #main {
    height: 85%;
    display: flex;
    flex-direction: column;
    padding: 15px;
  }

  #stub {
    height: 85%;
  }

  input {
    width: 25%;
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
