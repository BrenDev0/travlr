import React, { useEffect, useState} from 'react'
import styled from 'styled-components'
import { autofillKey } from '../utils/keys'

const TripForm = () => {
  const [destination, setDestination] = useState("")
  const [destinationResults, setDestinationResults] = useState([])
  const [destinationDropdown, setDestinationDropdown] = useState(false)
  const [place, setPlace] = useState("")
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
        console.log(data)
      })
      : null

    },[place])
  return (
    <FormSyled>
        <form action="">
            <div className="destination form-div">
              <h2>Choose your destination</h2>
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
                          }}>{i.city}, {i.country}</li>
                        )
                      })
                    }
                  </ul>
                </div>
              }
            </div>
            <div className="places form-div">
              
              <label htmlFor="search">Search:</label>
              <input type="text" required id='search' value={place} onChange={(e) => setPlace(e.target.value)} />
              <input type="file" name="images" id="images" />
            </div>
            <div className=" form-div">
              <label htmlFor="test">test</label>
              <input type="text" id='test' />
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

.places{
  border-left: 1px solid var(--red);
  border-right: 1px solid var(--red)
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
