import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Map = ({ hotels }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [mapCenter, setMapCenter] = useState({
    lat: 51.509865,
    lng: -0.118092,
  }); // Default center
  const [mapZoom, setMapZoom] = useState(10);

  useEffect(() => {
    if (hotels.length > 0) {
      // Calculate bounds based on hotels
      const bounds = new window.google.maps.LatLngBounds();
      hotels.forEach((hotel) => {
        const latitude = Number(hotel.latitude);
        const longitude = Number(hotel.longitude);
        if (!isNaN(latitude) && !isNaN(longitude)) {
          bounds.extend(new window.google.maps.LatLng(latitude, longitude));
        }
      });

      // Update map center and zoom based on bounds
      setMapCenter(bounds.getCenter().toJSON());
      setMapZoom(12); // Adjust zoom level as needed
    }
  }, [hotels]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={mapZoom}
      >
        {hotels.map((hotel) => {
          const latitude = Number(hotel.latitude);
          const longitude = Number(hotel.longitude);

          if (isNaN(latitude) || isNaN(longitude)) {
            console.error(
              `Invalid latitude or longitude for hotel: ${hotel.name}`
            );
            return null;
          }

          return (
            <Marker
              key={hotel.id}
              position={{ lat: latitude, lng: longitude }}
              title={hotel.name}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
