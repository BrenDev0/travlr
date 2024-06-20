import React, { useEffect, useState} from 'react'
import styled from 'styled-components'
import { autofillKey } from '../utils/keys'
import { accomidationIcon, cateringIcon, chevronDown, chevronUp, imageIcon, museumIcon, naturalIcon, placeIcon, spaIcon } from '../utils/icons'
import { useTripsContext } from "../contex/TripsContext"

const MomentsForm = () => {
  const { trips, gatherTrips,addMoment } = useTripsContext()
  const [selectedAdventure, setSelectedAdventure] = useState({
    adventure: "Select an adventure",  
  })
  const [adventuresDropdown, setAdventuresDropdown] = useState(false)
  const [place, setPlace] = useState("")
  const [placeResults, setPlaceResults] = useState([])
  const [placeDropdown, setPlaceDropdown] = useState(false)
  const [categoryDropdown, setCategoryDropdown] = useState(false)
  const [category, setCategory] = useState("catering")
  const [photos, setPhotos] = useState([])
    const [form, setForm] = useState({
        name: '',
        category: '',
        photos: []
    })

    
    useEffect(() =>{
      gatherTrips()
    }, [])

    useEffect(() => {
      place ?
      fetch(`https://api.geoapify.com/v2/places?categories=${category}&name=${place}&bias=proximity:${selectedAdventure.coordinates.lon},${selectedAdventure.coordinates.lat}&limit=20&apiKey=${autofillKey}
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

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData()
      formData.append('name', form.name )
      formData.append('category', form.category)
      form.photos.forEach((pic) => formData.append('photos', pic))
  
      await addMoment(formData, selectedAdventure._id);
      
      setForm({
        name: '',
        category: '',
        photos: []
      }),
      setSelectedAdventure({
        adventure: "Select an adventure",  
      });
      setPlace("")
    
    }



  return (
    <FormSyled>
        <form onSubmit={handleSubmit} encType='multipart/form-data' >
            <div className="destination form-div">
              <div className="adventureSelect">
              <span onClick={() => adventuresDropdown ? setAdventuresDropdown(false) : setAdventuresDropdown(true)}>{selectedAdventure.adventure} {adventuresDropdown ? chevronUp : chevronDown}</span>
              {
                adventuresDropdown && <div className="dropdown adventures">
                <ul>
                  {
                    trips.map((trip) => {
                      return(
                        <li key={trip._id} onClick={() => {setSelectedAdventure(trip); setAdventuresDropdown(false)}}>{trip.adventure}</li>
                      )
                    })
                  }
                  
                </ul>
              </div>
              }
              </div> 
            </div> 
            <div className="form-div">
              <div className="adventureSelect">
                <span onClick={() => categoryDropdown ? setCategoryDropdown(false): setCategoryDropdown(true)}>Select a category {categoryDropdown ? chevronUp : chevronDown}</span>
                {
                  categoryDropdown && 
                <div className="dropdown">
                  <ul>
                    <li key={"catering"} onClick={() => {setCategory("catering"); setCategoryDropdown(false)}}>{cateringIcon} Food and drink</li>
                    <li key={"Museums"} onClick={() => {setCategory("museum"); setCategoryDropdown(false)}}>{museumIcon} Mesuems</li>
                    <li key={"accommodation"} onClick={() => {setCategory("accommodation"); setCategoryDropdown(false)}}>{accomidationIcon} Hotel</li>
                    <li key={"leisure"} onClick={() => {setCategory("leisure"); setCategoryDropdown(false)}}>{spaIcon} Parks & Leisure</li>
                    <li key={"natural"} onClick={() => {setCategory("natural"); setCategoryDropdown(false)}}>{naturalIcon} Nature</li>
                  </ul>
                </div>
                }
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
                          <li key={i.name} onClick={() => {
                            setForm({
                             ...form,
                             name: i.name,
                             category: category
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
            <div className="form-div">
              <input type="file" name='photos' id='images' accept='.png, .jpg, .jpeg' onChange={(e) => setForm({...form, photos: [...form.photos, e.target.files[0]]}) } style={{display: "none"}}/>
              <label htmlFor="images">{imageIcon}</label>

            </div>
            <button type="submit">Submit</button>
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

.adventureSelect:hover{
cursor: default
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
  right: 40%;
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

.fa-circle-chevron-up{
  color: var(--red)
}

.fa-circle-chevron-up:hover{
  cursor: pointer;
}

.fa-images{
  color: var(--white);
  font-size: 2rem;
}

.fa-images:hover {
  cursor: pointer;
}

@media (max-width: 1024px) {

  form {
    height: 100%;
    width: 50%;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
  }
}

@media (max-width: 720px) {

  form {
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
}



`

export default MomentsForm
