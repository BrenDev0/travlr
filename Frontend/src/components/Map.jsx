import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import { useTripsContext } from "../contex/TripsContext";
import ChangeMapCenter from "./ChangeMapCenter";
import PhotosCard from "./PhotosCard";

const Map = () => {
const { trips, gatherTrips } = useTripsContext()

const [coordinates, setCoordinates] = useState({
  lat: 51.505,
  lon: -0.09,
  zoom: 3
})

const [moments, setMoments] = useState([])

useEffect(() => {
gatherTrips()
}, [])

  return (
    <MapStyled>
      <MapContainer scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          trips && trips.map((i) => {
              return(
                <Marker eventHandlers={{
                  click:
                  () => {
                    setCoordinates({
                      lat: i.coordinates.lat,
                      lon: i.coordinates.lon,
                      zoom: 12
                    })
                    setMoments(i.moments)
                  }
                }} key={i._id} position={[i.coordinates.lat, i.coordinates.lon]}>
                  <Popup>
                    {i.adventure},<br/> {i.city}, {i.state} <br/> --{i.country}
                  </Popup>
                </Marker>
              )
          })
        }
        {/* {
          moments.length > 0 && moments.map((m) => {
            return (
              <Marker key={m._id} position={[m.coordinates.lat, m.coordinates.lon]}>
              <Popup>
                {m.name} <br/> <PhotosCard type="upload" photos={m.photos}width={'400px'} imageWidth={'75px'} /> <br/> {m.address}
              </Popup>
            </Marker>
            )
          })
        } */}
        <ChangeMapCenter coordinates={coordinates} zoom={coordinates.zoom} />
      </MapContainer>
    </MapStyled>
  );
};

const MapStyled = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;
  z-index: 0;

  .leaflet-container {
    width: 100%;
    height: 100%;
  }
`;

export default Map;
