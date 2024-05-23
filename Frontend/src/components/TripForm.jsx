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
                destinationDropdown && <div className="dropdown">
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
              <label htmlFor="place">PLace</label>
              <input type="text" required value={place} onChange={(e) => {setPlace(e.target.value), setPlaceDropdown(true)}} />
              {
                placeDropdown && <div className="dropdown">
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
  height: 100%;
  display: flex;
  justify-content: space-evenly;
}



.form-div{
  display: flex;
  flex-direction: column;
  height: 100%;
  
}

.dropdown {
border: 2px solid var(--black);
border-radius: 10px;
background: var(--orange);

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
.dropdown li:first-child{
  border-radius: 10px 10px 0 0
}


    

`

export default TripForm
