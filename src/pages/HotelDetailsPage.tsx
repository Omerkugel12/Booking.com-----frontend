import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotelDetails } from "../services/hotels.service";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Heart,
  Share,
  Tag,
  CheckCircle,
  Wifi,
  Tv,
  Coffee,
  BedSingle,
} from "lucide-react";

interface HotelDetails {
  avgRating: any;
  valueForMoney: any;
  location: any;
  freeWifi: any;
  comfort: any;
  cleanliness: any;
  id: number;
  name: string;
  city: string;
  price: number;
  description: string;
  distance: number;
  freeCancellation: number;
  prepayment: number;
  scoreLetter: string;
  reviews: { text: string; userId: string }[];
  hotelLink: string;
  image: string;
  facilities: { id: string; category: string; name: string }[];
}

const HotelDetailsPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [hotel, setHotel] = useState<HotelDetails | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = [
    "Overview",
    "Info & prices",
    "Facilities",
    "House rules",
    "The fine print",
    `Guest reviews (${hotel?.reviews.length || 0})`,
  ];

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await getHotelDetails(hotelId);
        console.log(response);

        setHotel(response);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  if (!hotel) {
    return <p>Loading...</p>;
  }

  const facilitiesIcons: { [key: string]: React.ReactNode } = {
    Wifi: <Wifi className="w-5 h-5 text-green-600" />,
    "Flat-screen TV": <Tv className="w-5 h-5 text-green-600" />,
    Kitchen: <Coffee className="w-5 h-5 text-green-600" />,
    "Non-smoking rooms": <BedSingle className="w-5 h-5 text-green-600" />,
    "Family rooms": <BedSingle className="w-5 h-5 text-green-600" />,
    Heating: <CheckCircle className="w-5 h-5 text-green-600" />,
    "Designated smoking area": (
      <CheckCircle className="w-5 h-5 text-green-600" />
    ),
    // Add more mappings as needed based on your facility names
  };

  const MostPopularFacilities = () => {
    const popularFacilities = [
      "Non-smoking rooms",
      "Free Wifi",
      "Family rooms",
      "Heating",
      "Designated smoking area",
    ]; // Adjust this list as per your business logic

    return (
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-4">Most popular facilities</h3>
        <div className="flex flex-wrap gap-6">
          {popularFacilities.map((facility, index) => (
            <div key={index} className="flex items-center space-x-2">
              {facilitiesIcons[facility] || (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              <span className="text-gray-700">{facility}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600 mb-4">
        Home &gt; Hotels &gt; {hotel.city} &gt; {hotel.name}
      </nav>

      {/* Tabs Section */}
      <div className="border-b border-gray-300 mb-4">
        <ul className="flex justify-between space-x-8">
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer p-4 text-sm text-center font-semibold text-gray-600 hover:bg-gray-200 ${
                activeTab === tab ? "text-blue-600 border-blue-600" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && (
                <div className="mt-1 h-[2px] bg-blue-900 w-full"></div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Hotel Details Section */}
      <div className="flex gap-8">
        <div className="flex-1">
          {/* Hotel Info Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center mb-2">
                <span className="bg-yellow-400 text-white font-bold px-2 py-1 rounded-sm mr-2">
                  ★★★
                </span>
                <span className="bg-yellow-400 text-white font-bold px-2 py-1 rounded-sm">
                  Travel Proud
                </span>
              </div>
              <h1 className="text-2xl font-bold mb-2">{hotel.name}</h1>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-blue-600 mr-1" />
                <span>{hotel.city}</span>
                <span className="mx-2">–</span>
                <a href={hotel.hotelLink} className="text-blue-600 font-bold">
                  Excellent location – show map
                </a>
                <span className="ml-2">– Subway Access</span>
              </div>
            </div>
            {/* Action Buttons Section */}
            <div className="flex flex-col gap-2 items-center space-x-4">
              <div className="flex gap-4 items-center">
                <Heart className="text-blue-600 cursor-pointer" />
                <Share className="text-blue-600 cursor-pointer" />
                <Button className="bg-blue-600 text-white">Reserve</Button>
              </div>
              <div>
                <a
                  href="#"
                  className="flex items-center text-blue-600 underline"
                >
                  <Tag className="mr-1" />
                  We Price Match
                </a>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="flex">
            <div className="grid grid-cols-3 gap-2 mb-6 w-4/5">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover rounded-lg shadow-lg col-span-2"
              />
              <div className="grid grid-rows-2 gap-2">
                <img
                  src={hotel.image}
                  alt="Additional view"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
                <img
                  src={hotel.image}
                  alt="Additional view"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className=" w-1/5 bg-white p-4 rounded-lg shadow-lg">
              {/* Rating Section */}
              <div className="flex flex-col items-center border-b pb-4 mb-4">
                <div className="flex items-center">
                  <span className="bg-blue-600 text-white text-lg font-bold px-3 py-1 rounded-md">
                    8.2
                  </span>
                  <span className="ml-2 text-lg font-semibold">Very Good</span>
                </div>
                <p className="text-sm text-gray-600">272 reviews</p>
              </div>

              {/* Review Highlights */}
              <div className="mb-6">
                <p className="text-gray-800 font-semibold mb-2">
                  Guests who stayed here loved:
                </p>
                <div className="flex items-start mb-2">
                  <BedSingle className="w-5 h-5 text-gray-600 mr-2" />
                  <p className="text-sm text-gray-600">
                    "Great location just near tube & Portobello Market on a
                    gorgeous street."
                  </p>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-semibold">Susan</span>
                  <span className="ml-2 text-gray-500">
                    United Arab Emirates
                  </span>
                </div>
              </div>

              {/* Location Section */}
              <div className="border-b pb-4 mb-4 flex justify-between">
                <p className="text-lg font-bold">Excellent location!</p>
                <p className="text-blue-600 font-bold text-xl">
                  {hotel.location}
                </p>
              </div>

              {/* Map Section */}
              <div className="mb-4">
                <img
                  src="https://via.placeholder.com/200x150.png" // Replace with actual map image URL or embed a map.
                  alt="Location map"
                  className="w-full rounded-lg shadow-lg mb-2"
                />
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <BedSingle className="w-5 h-5" />
                  Show on map
                </Button>
              </div>

              {/* Reservation Button */}
              <div className="flex flex-col items-center gap-2">
                <Button className="w-full bg-blue-600 text-white">
                  Reserve
                </Button>
                <Button variant="outline" className="w-full">
                  Save the property
                </Button>
              </div>
            </div>
          </div>
          {/* Key Features */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <FeatureItem
              icon={<BedSingle className="w-5 h-5 text-gray-700" />}
              label="Apartments"
            />
            <FeatureItem
              icon={<Wifi className="w-5 h-5 text-gray-700" />}
              label="Free Wifi"
            />
            <FeatureItem
              icon={<Coffee className="w-5 h-5 text-gray-700" />}
              label="Kitchen"
            />
            <FeatureItem
              icon={<CheckCircle className="w-5 h-5 text-gray-700" />}
              label="Private Bathroom"
            />
            <FeatureItem
              icon={<Tv className="w-5 h-5 text-gray-700" />}
              label="Flat-screen TV"
            />
            <FeatureItem
              icon={<CheckCircle className="w-5 h-5 text-gray-700" />}
              label="Family Rooms"
            />
            {/* Add more features as needed */}
          </div>

          {/* Hotel Description */}
          <div className="flex gap-8 pt-4">
            <div>
              <div className="mb-6 w-2/3">
                <p className="text-gray-800">
                  Notting Hill House provides accommodation within 2.7 miles of
                  the center of London, with free WiFi and a kitchen with a
                  microwave, a fridge, and a stovetop. The property is around a
                  10-minute walk from Portobello Road Market, 1.3 miles from
                  Paddington Station, and 1.4 miles from Royal Albert Hall.
                  Guests can enjoy city views.
                </p>
                <p className="mt-4 text-gray-800">
                  Couples in particular like the location — they rated it 9.6
                  for a two-person trip.
                </p>
                <p className="mt-4 text-gray-500 text-sm">
                  Distance in property description is calculated using ©
                  OpenStreetMap
                </p>
              </div>

              {/* Most Popular Facilities */}
              <MostPopularFacilities />
            </div>
            <div className="">
              <div className="bg-white rounded-lg shadow-lg mb-4">
                <h4 className="text-lg font-semibold mb-2">
                  Property highlights
                </h4>
                <p className="text-sm">Perfect for an 8-night stay!</p>
                <p className="text-sm text-gray-600">
                  Top Location: Highly rated by recent guests (9.6)
                </p>
                <div className="mt-4">
                  <Button className="w-full bg-blue-600 text-white">
                    Reserve
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full mt-2 text-blue-600"
                  >
                    Save the property
                  </Button>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-lg">
                <p className="text-sm text-gray-600">
                  Guests say the description and photos for this property are
                  accurate.
                </p>
              </div>
            </div>
          </div>
          {/* Facilities Section */}
          {/* <div className="mt-6 text-lg">
            <p className="font-semibold">Facilities</p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              {hotel.facilities.length > 0 ? (
                hotel.facilities.map((facility, index) => (
                  <li key={index}>
                    <strong>{facility.category}:</strong> {facility.name}
                  </li>
                ))
              ) : (
                <li>No facilities available</li>
              )}
            </ul>
          </div> */}
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Guest reviews</h3>

        <div className="flex items-center gap-2 mb-4">
          <span className="bg-blue-900 text-white font-bold px-2 py-1 rounded-sm text-lg">
            {hotel.avgRating.toFixed(1)}
          </span>
          <span className="text-lg font-semibold text-gray-600">
            <span className="text-black">Very Good </span>·{" "}
            {hotel.reviews.length} reviews
          </span>
          <a href="#" className="text-blue-600 underline ml-4">
            Read all reviews
          </a>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="flex justify-between pb-2">
              <p className="font-semibold">Staff</p>{" "}
              <p className="text-sm text-gray-500 mt-1">
                {hotel.cleanliness.toFixed(1)}
              </p>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-2 bg-blue-900 rounded-full"
                style={{ width: `${hotel.cleanliness * 10}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between pb-2">
              <p className="font-semibold">Cleanliness</p>{" "}
              <p className="text-sm text-gray-500 mt-1">
                {hotel.cleanliness.toFixed(1)}
              </p>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-2 bg-blue-900 rounded-full"
                style={{ width: `${hotel.cleanliness * 10}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between pb-2">
              <p className="font-semibold">Comfort</p>
              <p className="text-sm text-gray-500 mt-1">
                {hotel.comfort.toFixed(1)}
              </p>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-2 bg-blue-900 rounded-full"
                style={{ width: `${hotel.comfort * 10}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between pb-2">
              <p className="font-semibold">Free Wifi</p>
              <p className="text-sm text-gray-500 mt-1">
                {hotel.freeWifi.toFixed(1)}
              </p>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-2 bg-blue-900 rounded-full"
                style={{ width: `${hotel.freeWifi * 10}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between pb-2">
              <p className="font-semibold">Location</p>{" "}
              <p className="text-sm text-gray-500 mt-1">
                {hotel.location.toFixed(1)}
              </p>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-2 bg-blue-900 rounded-full"
                style={{ width: `${hotel.location * 10}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between pb-2">
              <p className="font-semibold">Value for money</p>
              <p className="text-sm text-gray-500 mt-1">
                {hotel.valueForMoney.toFixed(1)}
              </p>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-2 bg-blue-900 rounded-full"
                style={{ width: `${hotel.valueForMoney * 10}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Select Topics */}
        <div>
          <h1 className="font-bold text-[16px] pt-4">
            Select topics to read reviews:
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Location", "Room", "Clean", "Kitchen", "Bed"].map(
              (topic, index) => (
                <button
                  key={index}
                  className="border border-gray-300 rounded-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-200"
                >
                  + {topic}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature Item component
const FeatureItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex items-center p-3 border border-gray-300 rounded-lg">
    {icon}
    <span className="ml-2 font-semibold text-gray-700">{label}</span>
  </div>
);

export default HotelDetailsPage;
