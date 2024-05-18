import React, { useEffect, useState} from 'react'
import styled from 'styled-components'

const TripForm = () => {
  const [destination, setDestination] = useState("")
  const [destinationResults, setDestinationResults] = useState(null)
    const [form, setForm] = useState({
        country: '',
        city: '',
        coordinates: [],
        places: []
    })
  return (
    <FormSyled>
        <form action="">
            <div className="destination form-div">
              <h2>Add your adventure</h2>
              <label htmlFor="destination">Destination:</label>
              <input type="text" required id='destination' value={destination} onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className="places form-div">
              <label htmlFor="search">Search:</label>
              <input type="text" required id='search' />
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


    

`

export default TripForm
