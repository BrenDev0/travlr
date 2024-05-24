import React, { useEffect, useState} from 'react'
import styled from 'styled-components'
import { autofillKey } from '../utils/keys'
import { placeIcon } from '../utils/icons'

const TripForm = () => {
  const [destination, setDestination] = useState("")
  const [destinationResults, setDestinationResults] = useState([])
  const [destinationDropdown, setDestinationDropdown] = useState(false)
  const [place, setPlace] = useState("")
  const [placeResults, setPlaceResults] = useState([])
  const [placeDropdown, setPlaceDropdown] = useState(false)
  
  const [category, setCategory] = useState("catering")
    const [form, setForm] = useState({
        country: '',
        city: '',
        coordinates: [],
        places: []
    })

    useEffect(() => {
      destination
      ? fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${destination}&apiKey=${autofillKey}`
        )
          .then((res) => res.json())
          .then((data) => {
            setDestinationResults(
              data.features.map((d) => {
                return {
                  country: d.properties.country,
                  city: d.properties.city,
                  id: d.properties.place_id,
                  coordinates: d.geometry.coordinates
                };
              })
            )
            
            ;
          })
      : setDestinationDropdown(false)
    }, [destination])

    useEffect(() => {
      place ?
      fetch(`https://api.geoapify.com/v2/places?categories=${category}&name=${place}&bias=proximity:${form.coordinates.lon},${form.coordinates.lat}&limit=20&apiKey=${autofillKey}
      `).then((res) => res.json())
      .then((data) => {
        setPlaceResults(data.features.map((i) => {
          return {
            category: category,
            name:i.properties.address_line1
          }
        }))
      })
      : setPlaceDropdown(false)

    },[place])
  return (
    <FormSyled>
        <form action="">
            <div className="destination form-div">
              <label htmlFor="destination">Destination:</label>
              <input type="text" required id='destination' value={destination} onChange={(e) => {setDestination(e.target.value); setDestinationDropdown(true)}} />
              {
                destinationDropdown && <div className="dropdown city">
                  <ul>
                    {
                      destinationResults.map((i) => {
                        return (
                          <li key={i.id} onClick={() => {
                            setForm({
                              country: i.country,
                              city: i.city,
                              coordinates: {
                                lat: i.coordinates[1],
                                lon: i.coordinates[0],
                              },
                              places: []
                            })
                            setDestination(`${i.city}, ${i.country}`);
                            setDestinationDropdown(false)
                          }}>{placeIcon} {i.city}, {i.country}</li>
                        )
                      })
                    }
                  </ul>
                </div>
              }
            </div> 
            <div className="form-div">
              <div className="select">
                <div className="info">
                  <span>Select a category</span>
                </div>
              </div>
            </div>
            <div className="form-div">
              <label htmlFor="place">Place:</label>
              <input type="text" required value={place} onChange={(e) => {setPlace(e.target.value), setPlaceDropdown(true)}} />
              {
                placeDropdown && <div className="dropdown place">
                  <ul>
                    {
                      placeResults.map((i) => {
                        return (
                          <li key={i.id} onClick={() => {
                            setForm({
                             ...form, places: [...form.places, {
                              category: i.category,
                              name: i.name
                             }]
                            })
                            setPlace(`${i.name}`);
                            setPlaceDropdown(false)
                          }}>{placeIcon} {i.name}</li>
                        )
                      })
                    }
                  </ul>
                </div>
              }
            </div>
        </form>
    </FormSyled>
  )
}

const FormSyled = styled.div`
width: 100%;
height: 100%;



form{
  width: 100%;
  height: 10%;
 display: flex;
 justify-content: space-around;
 align-items: center;
 background: var(--orange);
 box-shadow: 0 2px 7px var(--black);
}



.form-div{
  display: flex;
  justify-content: space-around; 
}

.form-div label{
  color: var(--white);
  margin-right: 10px;
}

.form-div input{
  border-radius: 5px;
}

.dropdown {
border: 2px solid var(--gray);
border-radius: 0 0 10px 10px;
background: var(--white);
position: absolute;
}

.city{
  left: 14.5%;
  top: 17%
}

.place{
  right: 4%;
  top: 17%;
}

.dropdown li {
  padding: 10px
}

.dropdown li:hover {
  cursor: pointer;
  background: var(--red);
  color: var(--white);
}

.dropdown li:last-child{
  border-radius: 0 0 10px 10px
}

`

export default TripForm
