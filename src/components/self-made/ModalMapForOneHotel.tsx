import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import { HotelDetails } from "@/models/Hotel.model";

interface ModalMapProps {
  onClose: () => void;
  hotel: HotelDetails;
}

function ModalMapForOneHotel({ onClose, hotel }: ModalMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //display div of hotel for desired hotel on map
  const [hoveredHotel, setHoveredHotel] = useState(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  const handleLoad = useCallback((mapInstance) => {
    if (typeof google !== "undefined") {
      setMap(mapInstance);
      setGoogleLoaded(true);
    } else {
      console.error("Google Maps API is not loaded.");
    }
  }, []);

  const handleMarkerHover = (hotelId: number) => {
    setHoveredHotel(hotelId);
  };

  const handleMarkerOut = () => {
    setHoveredHotel(null);
  };

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    if (map && hotel.latitude && hotel.longitude) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(new google.maps.LatLng(center.lat, center.lng));
      map.fitBounds(bounds);

      // Zoom out a bit after a short delay to ensure the map has finished rendering
      const zoomTimeout = setTimeout(() => {
        map.setZoom(map.getZoom() - 2);
      }, 100);

      return () => clearTimeout(zoomTimeout); // Clean up timeout on unmount
    }
  }, [map, hotel.latitude, hotel.longitude]);

  const center = {
    lat: Number(hotel.latitude),
    lng: Number(hotel.longitude),
  };

  // Function to convert numeric rating to descriptive string
  const getScoreLetter = (rating: number): string => {
    if (rating < 7) return "Pleasant";
    else if (rating >= 7 && rating < 8) return "Good";
    else if (rating >= 8 && rating <= 8.5) return "Very Good";
    else if (rating > 8.5 && rating <= 9) return "Excellent";
    else if (rating > 9 && rating <= 10) return "Wonderful";
    return "";
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-11/12 h-5/6 rounded-lg flex overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-1/3 overflow-y-auto p-4">
          <div className="flex flex-col w-full border border-gray-300 rounded-lg shadow-md overflow-hidden mb-4">
            <div className="flex flex-col">
              <div className="w-full h-48">
                <img
                  src={hotel.image}
                  alt={`Image of ${hotel.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h1 className="text-xl font-bold text-blue-600 cursor-pointer hover:underline">
                      {hotel.name}
                    </h1>
                    <div className="flex items-center mt-1">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm mr-2">
                        {Math.floor(hotel.avgRating)}
                      </span>
                      <span className="text-sm font-semibold">
                        {getScoreLetter(hotel.avgRating)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-blue-600 underline cursor-pointer mb-2">
                  {hotel.city} - Show on map
                </p>
                <p className="text-sm mb-4">{hotel.distance} km from center</p>
                <div className="mb-4">
                  <p className="font-semibold mb-1">
                    Standard Room with Sea View
                  </p>
                  <p className="text-sm">4 nights, 1 adult</p>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    {hotel.freeCancellation ? (
                      <p className="text-green-600 text-sm mt-1">
                        ✓ Free cancellation <br /> ✓ No prepayment needed - pay
                        at the property
                      </p>
                    ) : (
                      <p className="text-sm text-red-600 mt-1">
                        Prepayment needed
                      </p>
                    )}
                    <p className="text-sm text-red-600 mr-4">
                      Only 5 rooms left at this price on our site
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      ₪{hotel.availableRooms[0].price}
                    </p>
                    <p className="text-sm text-green">
                      Includes taxes and charges
                    </p>
                  </div>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                  View
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Closest beaches</h3>
            <ul className="text-sm">
              <li className="flex justify-between mb-1">
                <span>Miki Beach</span>
                <span>100 m</span>
              </li>
              <li className="flex justify-between mb-1">
                <span>Moriah Beach</span>
                <span>100 m</span>
              </li>
              <li className="flex justify-between mb-1">
                <span>The Coral Beach Prael</span>
                <span>150 m</span>
              </li>
              <li className="flex justify-between mb-1">
                <span>Hananya Beach</span>
                <span>200 m</span>
              </li>
              <li className="flex justify-between">
                <span>Kisuki Beach</span>
                <span>250 m</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-2/3 relative">
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              onLoad={handleLoad}
              zoom={12}
            >
              {map && (
                <React.Fragment key={hotel.id}>
                  {googleLoaded && (
                    <Marker
                      position={center}
                      icon={{
                        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                        scaledSize: new google.maps.Size(32, 32),
                      }}
                      label={{
                        text: `₪${hotel.availableRooms[0].price}`,
                        color: "white",
                        className:
                          "bg-blue-800 text-white px-2 py-1 rounded-md text-sm font-bold shadow-lg border border-gray-300",
                      }}
                      onMouseOver={() => handleMarkerHover(hotel)}
                      onMouseOut={handleMarkerOut}
                    />
                  )}
                  {hoveredHotel && hoveredHotel.id === hotel.id && (
                    <OverlayView
                      position={center}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <div className="mt-2">
                          <h3 className="font-bold text-lg">{hotel.name}</h3>
                          <p className="text-sm text-gray-600">
                            {hotel.address}
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="flex justify-between items-center mt-2 gap-4">
                              <span className="text-sm font-semibold">
                                ₪{hotel.availableRooms[0].price}
                              </span>
                              <span className="text-sm font-semibold text-red-500 line-through">
                                ₪{hotel.availableRooms[0].price + 50}
                              </span>
                            </div>
                            <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                              {hotel.avgRating}
                            </span>
                          </div>
                          <p className="text-xs mt-1">
                            Including taxes and charges
                          </p>
                          {hotel.freeCancellation ? (
                            <p className="text-green-600 text-sm mt-1">
                              ✓ Free cancellation <br /> ✓ No prepayment needed
                              - pay at the property
                            </p>
                          ) : (
                            <p className="text-sm text-red-600 mt-1">
                              Prepayment needed
                            </p>
                          )}
                        </div>
                      </div>
                    </OverlayView>
                  )}
                </React.Fragment>
              )}
            </GoogleMap>
          </LoadScript>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 transform translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 rounded-full p-2 shadow-lg"
            style={{ width: "40px", height: "40px" }}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalMapForOneHotel;
