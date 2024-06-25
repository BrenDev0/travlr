import React from 'react'
import { useMap } from 'react-leaflet'

const ChangeMapCenter = ({coordinates, zoom}) => {
    const map = useMap()
    map.setView(coordinates, zoom)
  return null
}

export default ChangeMapCenter
