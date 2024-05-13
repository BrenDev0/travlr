import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { autofillKey, coordinatesKey } from "../utils/keys";
import { useTripsContext } from "../contex/TripsContext";
import { useGlobalContext } from "../contex/GlobalContex";

const TicketForm = ({ width, height }) => {
  const { error, setError } = useGlobalContext()
  const { newTrip } = useTripsContext()
  const [depart, setDepart] = useState("");
  const [destination, setDestination] = useState("");
  const [city, setCity] = useState("")
  const [searchData, setSearchData] = useState([]);
  const [dropdownTo, setDropdownTo] = useState(false);
  const [dropdownFrom, setDropdownFrom] = useState(false);
  const [trip, setTrip] = useState({
    country: destination.country,
    city: destination.city,
    coordinates: {}

  })
  const style = {
    width: width,
    height: height,
  };
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
      : setDropdownTo(false);
  }, [destination]);

  useEffect(() => {
    depart
      ? fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${depart}&apiKey=${autofillKey}`
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
      : setDropdownFrom(false);
  }, [depart]);

//--------------- submit form ---------------
const handleSubmit = async (e) => {
  e.preventDefault()
  const response = await fetch(`https://geocode.maps.co/search?q=${destination}&api_key=${coordinatesKey}`)
  const data = await response.json();
  console.log(data[0].lat)
  setTrip({...trip, coordinates: {lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon)}});
  console.log(trip)
  newTrip(trip)
}


  return (
    <FormStyled style={style}>
      <div className="main-con ticket">
        <div className="stripe">
          <i className="fa-solid fa-plane"></i>
          <span>Ticket</span>
        </div>
        <form onSubmit={handleSubmit} id="main">
          <label htmlFor="from">From:</label>
          <input
            type="text"
            required
            id="from"
            value={depart}
            onChange={(e) => {
              setDepart(e.target.value);
              setDropdownFrom(true);
            }}
          />
          <div className="dropdown" id="departureDD">
            <ul>
              {dropdownFrom &&
                searchData.map((i) => {
                  return (
                    <li
                      key={i.id}
                      onClick={() => {
                        setDepart(`${i.city}, ${i.country}`);
                        setDropdownFrom(false);
                      }}
                    >
                      <i className="fa-solid fa-earth-americas"></i> {i.city},{" "}
                      {i.country}
                    </li>
                  );
                })}
            </ul>
          </div>
          <label htmlFor="destination">To:</label>
          <input
            id="destination"
            type="text"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setDropdownTo(true);
            }}
          />
          <div className="dropdown" id="arrivalDD">
            <ul>
              {dropdownTo &&
                searchData.map((i) => {
                  return (
                    <li
                      key={i.id}
                      onClick={() => {
                        setTrip({...trip, country: i.country, city: i.city});
                        setDestination(`${i.city}, ${i.country}`);
                        setDropdownTo(false);
                      }}
                    >
                      <i className="fa-solid fa-earth-americas"></i> {i.city},{" "}
                      {i.country}
                    </li>
                  );
                })}
            </ul>
          </div>
          <label htmlFor="duration">Days:</label>
          <input type="number" />
          <button>Submit</button>
        </form>
      </div>
      <div className="stub-con ticket">
        <div className="stripe"></div>
        <form id="stub">
          <label htmlFor="passengers">Passengers:</label>
          <input type="text" />
        </form>
      </div>
    </FormStyled>
  );
};

const FormStyled = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;

  .fa-plane {
    color: var(--orange);
  }
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
    justify-content: space-evenly;
  }

  #stub {
    display: flex;
    flex-direction: column;
    height: 85%;
    padding: 15px;
  }

  input {
    
    height: 40px;
    border-radius: 7px;
    font-size: 1rem;
    border: none;
    background: var(--gray);
  }

  input:focus {
    outline: none;
  }

  .dropdown {
    background: var(--orange);
    border-radius: 10px;
  }

  #arrivalDD {
    position: absolute;
    top: 59%;
  }

  #departureDD {
    position: absolute;
    top: 50%;
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

  @media (max-width: 1024px) {
    width: 100%;
    padding: 10px;
    height: 35%;
  }
`;
export default TicketForm;
