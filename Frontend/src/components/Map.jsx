import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";

const Map = () => {
  return (
    <MapStyled>
      <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </MapStyled>
  );
};

const MapStyled = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;

  .leaflet-container {
    width: 100%;
    height: 100%;
  }
`;

export default Map;
