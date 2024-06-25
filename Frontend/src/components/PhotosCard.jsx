import React from 'react'
import styled from "styled-components"

const PhotosCard = ({photos, width, height, imageWidth}) => {
    
  return (
    <CardSyled style={{width: width}}>
      {
        photos.map((photo) =>{
            return (
                <img style={{width: imageWidth ,height: imageWidth}} src={URL.createObjectURL(photo)} alt="" />
            )
        })
      }
   </CardSyled>
  )
}

const CardSyled = styled.div`

    display: flex;
    flex-wrap: wrap;

    img {
        margin: 3px;
        padding: 2px;
    }
`

export default PhotosCard
