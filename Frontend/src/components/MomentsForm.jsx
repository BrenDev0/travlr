import React, { useEffect, useState} from 'react'
import styled from 'styled-components'
import { autofillKey } from '../utils/keys'
import { chevronDown, placeIcon } from '../utils/icons'

const MomentsForm = () => {
  const [selectedAdventure, setSelectedAdventure] = useState("Chose an adventure")
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
              <div className="adventureSelect">
              <span>{selectedAdventure} {chevronDown}</span>
              </div> 
            </div> 
            <div className="form-div">
              <div className="adventureSelect">
                <span>Select a category {chevronDown}</span>
              </div>
            </div>
            <div className="form-div">
              <input type="text" required value={place} placeholder='location...' onChange={(e) => {setPlace(e.target.value), setPlaceDropdown(true)}} />
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
 display: flex;
 justify-content: space-around;
 align-items: center;
 background: var(--orange);
 box-shadow: 0 2px 7px var(--black);
 padding:15px
}



.form-div{
  display: flex;
  flex-direction: column;
}

.form-div label{
  color: var(--white);
  margin-right: 10px;
}

.form-div input{
  background: var(--gray);
  border-radius: 7px;
  padding: 5px
}

.form-div input:focus{
  outline: 1.5px solid var(--red)
}

.adventureSelect {
  background: var(--gray);
  border-radius: 7px;
  padding: 5px
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

.fa-circle-chevron-down{
  color: var(--orange);
}
.fa-circle-chevron-down:hover{
  cursor: pointer;
}



`

export default MomentsForm
