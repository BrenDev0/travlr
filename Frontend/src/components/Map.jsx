import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import { useTripsContext } from "../contex/TripsContext";

const Map = () => {
const { trips, gatherTrips } = useTripsContext()

useEffect(() => {
gatherTrips()
}, [])

  return (
    <MapStyled>
      <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          trips && trips.map((i) => {
              return(
                <Marker key={i._id} position={[i.coordinates.lat, i.coordinates.lon]}>
                  <Popup>
                    {i.city}, {i.country}
                  </Popup>
                </Marker>
              )
          })
        }
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
