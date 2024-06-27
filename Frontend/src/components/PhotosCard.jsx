import React from 'react'
import styled from "styled-components"

const PhotosCard = ({preview, photos, width, imageWidth}) => {
    const PHOTO_URL = 'http://localhost:5000/images/get-image/'
  return (
    <CardSyled style={{width: width}}>
      { 
       photos.map((photo) =>{
            return (
                preview ? 
                <img style={{width: imageWidth ,height: imageWidth}} src={URL.createObjectURL(photo)} alt="" />
                :
                <img style={{width: imageWidth ,height: imageWidth}} src={PHOTO_URL + photo.filename} alt="" />
                
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
