import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import BookingSidebarFilter from './Filters';
import { Card } from './card';
import { CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { useSearchParams } from 'react-router-dom';
import { HotelResult } from '@/models/Hotel.model';
import { getHotels } from '@/services/hotels.service';

interface Hotel {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  distance: string;
}

interface ModalMapProps {
  isOpen: boolean;
  onClose: () => void;
  hotels: Hotel[];
}

function ModalMap({ isOpen, onClose}: ModalMapProps) {
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
    const meals = searchParams.get("meals")
    const sortBy = searchParams.get("sortBy");
  
    // State to store fetched hotels
    const [hotels, setHotels] = useState<HotelResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
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
          const response = await getHotels(filters);
          console.log(response.data);
  
          setHotels(response.data);
  
          if (response.data.length > 0) {
            const firstImageUrl = response.data[0].image || "";
            saveRecentSearch(firstImageUrl);
          }
        } catch (err) {
          setError("Error fetching hotels. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchHotels();
    }, [destination, startDate, endDate, adults, children, rooms,searchParams]);

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  useEffect(() => {
    if (map && hotels.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      hotels.forEach(hotel => {
        if (hotel.latitude && hotel.longitude) {
          bounds.extend(new google.maps.LatLng(hotel.latitude, hotel.longitude));
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose} >
      <div className="bg-white w-11/12 h-5/6 rounded-lg flex overflow-hidden" onClick={e => e.stopPropagation()}> 
      {/* Prevents closing the modal when clicking inside */}
      <div className="w-1/4 relative overflow-y-auto">
        <BookingSidebarFilter/>
        </div>
        <div className="w-1/4 overflow-y-auto p-4">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="flex flex-col w-auto border border-gray-300 rounded-lg shadow-md overflow-hidden mb-4 ">
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
                      <h1
                        className="text-lg font-bold text-blue-600 cursor-pointer hover:text-black"
                      >
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
                  <p className="text-sm mt-2">Location {hotel.location.toFixed(1)}</p>
                  <div className="flex justify-between mt-4">
                    <div>
                      <p className="text-sm font-bold">{hotel.type || "Standard Room"}</p>
                      {hotel.freeCancellation && (
                        <div className="text-green-600 text-sm mt-1">
                          ✓ Free cancellation
                        </div>
                      )}
                      {hotel.prepayment && (
                        <div className="text-green-600 text-sm mt-1">
                          ✓ No prepayment needed - pay at the property
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 line-through">
                        ₪{hotel.totalPrice + 500} 
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        ₪{hotel.totalPrice}
                      </p>
                      <p className="text-xs text-gray-500">Includes taxes and fees</p>
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
              onLoad={setMap}
            >
             {map && hotels.length > 0 && hotels.map(hotel => (
                <Marker
                  key={hotel.id}
                  position={{ lat: hotel.latitude, lng: hotel.longitude }}
                  label={{
                    text: `₪${hotel.price}`,
                    color: 'white',
                    className: 'bg-blue-600 px-2 py-1 rounded-full text-sm font-bold'
                  }}
                />
              ))}
            </GoogleMap>
          </LoadScript>
          <button
          onClick={onClose}
          className="absolute top-4 right-4 transform translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 rounded-full p-2 shadow-lg"
          style={{ width: '40px', height: '40px' }}
        >
          &times;
        </button>
        </div>
      </div>
    </div>
  );
}

export default ModalMap;
