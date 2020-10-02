import React from "react";
import { Map, TileLayer } from "react-leaflet";
import { useCovideContextValue } from "../../contexts/CovidContext";
import { showDataOnMap } from "../../utils/utils";

import "./MapComponent.css";
function MapComponent() {
  const {
    mapCountries,
    mapCenter,
    mapZoom,
    casesType,
  } = useCovideContextValue();

  return (
    <div className="map">
      <Map center={mapCenter} zoom={mapZoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(mapCountries, casesType)}
      </Map>
    </div>
  );
}

export default MapComponent;
