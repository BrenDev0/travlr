import React from 'react'
import styled from 'styled-components'

const TripForm = () => {
    const [form, setForm] = useState({
        country: '',
        city: '',
        coordinates: [],
        places: []
    })
  return (
    <FormSyled>
        <form action="">
            <label htmlFor="country">Country</label>
            <input type="text" required id='country' value={country} onChange={(e) => setForm({...form, country: e.target.value})} />
            <label htmlFor="city">City</label>
            <input type="text" required id='city' />
        </form>
    </FormSyled>
  )
}

const FormSyled = styled.div`
    

`

export default TripForm
