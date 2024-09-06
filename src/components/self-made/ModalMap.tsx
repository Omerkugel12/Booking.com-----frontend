import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import BookingSidebarFilter from "./Filters";
import { useSearchParams } from "react-router-dom";
import { HotelResult } from "@/models/Hotel.model";
import { getHotels } from "@/services/hotels.service";

interface ModalMapProps {
  onClose: () => void;
  hotels: HotelResult[];
}

function ModalMap({ onClose }: ModalMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  // Get the current search parameters
  const [searchParams] = useSearchParams();

  // Extract specific query parameters
  const destination = searchParams.get("destination");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");
  const rooms = searchParams.get("rooms");
  const minPrice = searchParams.get("priceMin");
  const maxPrice = searchParams.get("priceMax");
  const freeCancelation = searchParams.get("Freecancellation");
  const noPrepayment = searchParams.get("Noprepayment");
  const starRating = searchParams.get("starRating");
  const meals = searchParams.get("meals");
  const sortBy = searchParams.get("sortBy");

  // State to store fetched hotels
  const [hotels, setHotels] = useState<HotelResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //display div of hotel for desired hotel on map
  const [hoveredHotel, setHoveredHotel] = useState<number | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  const handleLoad = useCallback((mapInstance: google.maps.Map | null) => {
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

  const saveRecentSearch = (imageUrl: string) => {
    const recentSearch = {
      destination: destination || "",
      startDate: startDate || "",
      endDate: endDate || "",
      guests: {
        adults: adults ? parseInt(adults) : 1,
        children: children ? parseInt(children) : 0,
        rooms: rooms ? parseInt(rooms) : 1,
      },
      imageUrl: imageUrl || "https://source.unsplash.com/random?city", // Fallback image if none is available
    };

    const existingSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    const updatedSearches = [recentSearch, ...existingSearches];
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);

      try {
        const filters = {
          name: destination || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          numOfPeople: adults ? parseInt(adults) : undefined,
          numOfRooms: rooms ? parseInt(rooms) : undefined,
          priceMin: minPrice ? parseFloat(minPrice) : undefined,
          priceMax: maxPrice ? parseFloat(maxPrice) : undefined,
          freeCancellation: freeCancelation
            ? freeCancelation === "true"
            : undefined,
          prepayment: noPrepayment
            ? noPrepayment === "true"
            : noPrepayment === "false",
          starsRating: starRating ? starRating : undefined,
          meals: meals ? meals : undefined,
          sortBy: sortBy,
        };
        const response:any = await getHotels(filters);
        console.log(response.data);
        setHotels(response.data);

        if (response.data.length > 0) {
          const firstImageUrl = response.data[0].image || "";
          saveRecentSearch(firstImageUrl);
        }
      } catch (err: unknown) {
        setError(`Error fetching hotels. Please try again later. ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [destination, startDate, endDate, adults, children, rooms, searchParams]);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    if (map && hotels.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      hotels.forEach((hotel) => {
        if (hotel.latitude && hotel.latitude) {
          bounds.extend(
            new google.maps.LatLng(
              Number(hotel.latitude),
              Number(hotel.longitude)
            )
          );
        }
      });
      map.fitBounds(bounds);
    }
  }, [map, hotels]);

  // Function to convert numeric rating to descriptive string
  const getScoreLetter = (rating: number): string => {
    if (rating < 7) return "Pleasant";
    else if (rating >= 7 && rating < 8) return "Good";
    else if (rating >= 8 && rating <= 8.5) return "Very Good";
    else if (rating > 8.5 && rating <= 9) return "Excellent";
    else if (rating > 9 && rating <= 10) return "Wonderful";
    return "";
  };

  // if (!googleLoaded) return null;

  // // Function to clear the map instance
  // const destroyMap = (mapInstance: google.maps.Map) => {
  //   if (mapInstance) {
  //     google.maps.event.clearInstanceListeners(mapInstance);
  //     mapInstance = null;
  //     setGoogleLoaded(false);
  //   }
  // };

  // // Handle map unmount to clear the map instance
  // const handleUnmount = (mapInstance: google.maps.Map | null) => {
  //   console.log(mapInstance, "dada");
  //   destroyMap(mapInstance);
  // };

  console.log(error);
  console.log(loading);
  console.log(googleLoaded);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-11/12 h-5/6 rounded-lg flex overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prevents closing the modal when clicking inside */}
        <div className="w-1/4 relative overflow-y-auto">
          <BookingSidebarFilter />
        </div>
        <div className="w-1/4 overflow-y-auto p-4">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="flex flex-col w-auto border border-gray-300 rounded-lg shadow-md overflow-hidden mb-4 "
            >
              <div className="flex">
                <div className="w-1/3">
                  <img
                    src={hotel.image}
                    alt={`Image of ${hotel.name}`}
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                </div>
                <div className="w-2/3 p-4">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h1 className="text-lg font-bold text-blue-600 cursor-pointer hover:text-black">
                        {hotel.name}
                      </h1>
                      <div className="flex gap-2 mt-1">
                        <p className="text-xs text-blue-600 font-medium underline cursor-pointer">
                          {hotel.city}
                        </p>
                        <p className="text-xs text-blue-600 font-medium cursor-pointer underline">
                          Show on map
                        </p>
                      </div>
                      <p className="text-xs text-black font-medium mt-2">
                        {hotel.distance} km from center
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                      <div className="flex flex-col items-end">
                        <p className="text-base font-semibold text-gray-900">
                          {getScoreLetter(hotel.avgRating)}
                        </p>
                      </div>
                      <div className="flex justify-center items-center w-8 h-8 bg-blue-900 rounded">
                        <p className="text-white text-sm font-bold">
                          {hotel.avgRating}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs mt-2">Location {hotel.distance}</p>
                  <div className="flex justify-between mt-4">
                    <div>
                      <p className="text-sm font-bold">
                        {hotel.type || "Standard Room"}
                      </p>
                      {hotel.freeCancellation ? (
                        <p className=" text-green text-sm mt-1">
                          ✓ Free cancellation
                        </p>
                      ) : (
                        <p className="text-sm text-red-600 mt-1">
                          ✓ No prepayment needed - pay at the property
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 line-through">
                        ${hotel.price + 500}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        ${hotel.price}
                      </p>
                      <p className="text-xs text-gray-500">
                        Includes taxes and fees
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2 relative">
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              onLoad={handleLoad}
              // onUnmount={handleUnmount}
            >
              {map &&
                hotels.length > 0 &&
                hotels.map((hotel) => (
                  <React.Fragment key={hotel.id}>
                    <Marker
                      position={{
                        lat: Number(hotel.latitude),
                        lng: Number(hotel.longitude),
                      }}
                      icon={{
                        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                        scaledSize: new google.maps.Size(20, 20),
                      }}
                      label={{
                        text: `$${hotel.price}`,
                        color: "white",
                        className:
                          "bg-blue-800 text-white px-2 py-1 rounded-md text-sm font-bold shadow-lg border border-gray-300",
                      }}
                      onMouseOver={() => handleMarkerHover(hotel.id)}
                      onMouseOut={handleMarkerOut}
                    />
                    {hoveredHotel && hoveredHotel === hotel.id && (
                      <OverlayView
                        position={{
                          lat: Number(hotel.latitude),
                          lng: Number(hotel.longitude),
                        }}
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
                                  ${hotel.price}
                                </span>
                                <span className="text-sm font-semibold text-red-500 line-through">
                                  ${hotel.price + 28}
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
                              <p className=" text-green text-sm mt-1">
                                ✓ Free cancellation <br /> ✓ No prepayment
                                needed - pay at the property
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
                ))}
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

export default ModalMap;
