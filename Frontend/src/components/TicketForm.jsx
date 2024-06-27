import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { autofillKey } from "../utils/keys";
import { useTripsContext } from "../contex/TripsContext";
import { useGlobalContext } from "../contex/GlobalContex";
import { searchIcon } from "../utils/icons";


const TicketForm = ({ width, height }) => {
  const { error, setError } = useGlobalContext()
  const { newTrip } = useTripsContext()
  const [destination, setDestination] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [dropdownTo, setDropdownTo] = useState(false);
  const [trip, setTrip] = useState({
    adventure: "" ,
    country: "",
    city: "",
    coordinates: {},
    arrival: "",
    departure: ""
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
                  state: d.properties.state,
                  city: d.properties.city,
                  id: d.properties.place_id,
                  coordinates: d.geometry.coordinates
                };
              })
            );
          })
      : setDropdownTo(false);
  }, [destination]);



//--------------- submit form ---------------
const handleSubmit = async (e) => {
  e.preventDefault()
  newTrip(trip)
  setDestination("")
  setTrip({...trip, coordinates:{}, adventure: ''})
}


  return (
    <FormStyled style={style}>
      <div className="main-con ticket">
        <div className="stripe">
          <i className="fa-solid fa-plane"></i>
          <span>Ticket</span>
        </div>
        <form onSubmit={handleSubmit} id="main">
          <label htmlFor="from">Title:</label>
          <input
            type="text"
            required
            id="from"
            placeholder="Name your adventure"
            value={trip.adventure}
            onChange={(e) => setTrip({...trip, adventure: e.target.value})}
            
          />
          <label htmlFor="destination">Destination:</label>
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
                        setTrip({...trip, country: i.country, state: i.state, city: i.city, coordinates: {
                          lat: i.coordinates[1],
                          lon: i.coordinates[0],
                        }});
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
          <label htmlFor="duration">Dates:</label>
          <div className="dates">
            <span>Arrival: <input type="date" value={trip.arrival} onChange={(e) => setTrip({...trip, arrival: e.target.value})} /></span>
            <span>Departure: <input type="date" value={trip.departure} onChange={(e) => setTrip({...trip, departure: e.target.value})} /></span>
          </div>
          <div className="btn-con"><button className="btn">Submit</button></div>
        </form>
      </div>
      <div className="stub-con ticket">
        <div className="stripe"></div>
        <form id="stub">
          <label htmlFor="passengers">Passengers:</label>
          <span><input type="text" /> {searchIcon}</span>
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
  box-shadow: 3px 5px 15px var(--black);

  .dates{
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

 

  .btn:hover{
   cursor: pointer;
  }

  .btn-con{
    width:100%;
    display: flex;
    justify-content: flex-end
  }

  .btn{
    background-color: var(--orange);
    width: 20%;
    height: 100%;
    border-radius: 10px;
    margin-top: 10px
  }

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
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .stub-con {
    width: 25%;
    height: 100%;
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
