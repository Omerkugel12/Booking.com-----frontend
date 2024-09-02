
import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const Map = ({ hotels }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [map, setMap] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  useEffect(() => {
    if (map && hotels?.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      hotels.forEach(hotel => {
        const latitude = Number(hotel.latitude);
        const longitude = Number(hotel.longitude);
        if (!isNaN(latitude) && !isNaN(longitude)) {
          bounds.extend(new window.google.maps.LatLng(latitude, longitude));
        }
      });
      map.fitBounds(bounds);
      map.setZoom(Math.min(14, Math.max(map.getZoom(), 10)));
    }
  }, [map, hotels]);

  if (!apiKey) {
    console.error('Google Maps API key is missing');
    return <div>Error: Google Maps API key is missing</div>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
      >
        {hotels?.map(hotel => {
          const latitude = Number(hotel.latitude);
          const longitude = Number(hotel.longitude);

          if (isNaN(latitude) || isNaN(longitude)) {
            console.error(`Invalid latitude or longitude for hotel: ${hotel.name}`);
            return null;
          }

          return (
            <Marker
              key={hotel.id}
              position={{ lat: latitude, lng: longitude }}
              onClick={() => setSelectedHotel(hotel)}
              label={{
                text: `₪${hotel.price}`,
                color: 'white',
                className: 'bg-blue-600 px-2 py-1 rounded-full text-sm font-bold'
              }}
            />
          );
        })}

        {selectedHotel && (
          <InfoWindow
            position={{
              lat: Number(selectedHotel.latitude),
              lng: Number(selectedHotel.longitude)
            }}
            onCloseClick={() => setSelectedHotel(null)}
          >
            <div className="bg-white p-2 rounded-lg shadow-md">
              <h3 className="font-bold text-lg">{selectedHotel.name}</h3>
              <p className="text-sm">{selectedHotel.address}</p>
              <p className="text-blue-600 font-bold mt-2">₪{selectedHotel.price}</p>
              <p className="text-sm mt-1">{selectedHotel.rating} - {selectedHotel.reviewCount} reviews</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;