import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { getHotelDetailsWithAvailableRooms } from "../services/hotels.service";
import RoomTableDemo from "../components/self-made/ReservationsTable";
import goldLike from "@/images/goldLike.svg";
import map from "@/images/ShowOnMap.webp";
import { HotelDetails, AvailableRoom } from "../models/Hotel.model";
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
  Bath,
  Users,
  CigaretteOff,
} from "lucide-react";
import SearchBar from "@/components/self-made/SearchBar";
import Header from "@/components/self-made/Header";
import Footer from "@/components/self-made/Footer";

const HotelDetailsPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [searchParams] = useSearchParams();
  const [hotel, setHotel] = useState<HotelDetails | null>(null);
  const [rooms, setRooms] = useState<AvailableRoom | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const myDivRef = useRef(null);

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  let numberOfNights;
  if (startDate && endDate) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const difference = endDateObj.getTime() - startDateObj.getTime();

    // Calculate the number of nights
    numberOfNights = difference / (1000 * 60 * 60 * 24);
    // console.log(numberOfNights);
  } else {
    console.error("Invalid date parameters");
  }

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
        const response = await getHotelDetailsWithAvailableRooms(
          hotelId!,
          startDate!,
          endDate!
        );
        setHotel(response);
        setRooms(response.availableRooms);
        // console.log(response.availableRooms);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [hotelId, startDate, endDate]);

  if (!hotel) {
    return <p>Loading...</p>;
  }

  const scrollToMyDiv = () => {
    if (myDivRef.current) {
      myDivRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderFacilities = () => {
    // Group facilities by category
    const groupedFacilities = hotel.facilities.reduce((acc, facility) => {
      if (!acc[facility.category]) {
        acc[facility.category] = [];
      }
      acc[facility.category].push(...facility.name.split("\n"));
      return acc;
    }, {} as Record<string, string[]>);

    return (
      <div className="grid grid-cols-3 gap-6 mt-8">
        {Object.keys(groupedFacilities).map((category) => (
          <div key={category}>
            <h3 className="font-bold text-lg mb-2">{category}</h3>
            <ul className="list-none">
              {groupedFacilities[category].map((item, index) => (
                <li key={index} className="flex items-center mb-2">
                  <span className="mr-2">✓</span>{" "}
                  {/* This can be replaced with an icon if needed */}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Header type="results" />
      <div className="px-44">
        <SearchBar />
      </div>
      <div className="px-44 py-8">
        <nav className="flex gap-2 text-sm text-gray-600 mb-4">
          <a href="" className="text-blue-500 hover:underline">
            Home
          </a>
          &gt;
          <a href="" className="text-blue-500 hover:underline">
            Hotels
          </a>
          &gt;
          <a href="" className="text-blue-500 hover:underline">
            {hotel.city}
          </a>
          &gt;
          <a href="">{hotel.name}</a>
        </nav>

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

        <div className="flex gap-8">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="flex items-center mb-2">
                  <span className="bg-white text-yellow font-bold px-2 py-1 rounded-sm mr-2">
                    ★★★
                  </span>
                  <img src={goldLike} alt="Booking Logo" className="h-6" />
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

              <div className="flex flex-col gap-2 items-center space-x-4">
                <div className="flex gap-4 items-center">
                  <Heart className="text-blue-600 cursor-pointer" />
                  <Share className="text-blue-600 cursor-pointer" />
                  <Button
                    className="bg-blue-600 text-white"
                    onClick={scrollToMyDiv}
                  >
                    Reserve
                  </Button>
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
              <div className="w-1/5 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center justify-end gap-2 border-b pb-4 mb-4">
                  <div className="flex flex-col items-center">
                    <span className="ml-2 text-lg font-semibold">
                      Very Good
                    </span>
                    <p className="text-sm text-gray-600">272 reviews</p>
                  </div>
                  <span className="bg-blue-900 text-white text-lg font-bold px-3 py-1 rounded-md">
                    8.2
                  </span>
                </div>

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

                <div className="border-b pb-4 mb-4 flex justify-between">
                  <p className="text-lg font-bold">Excellent location!</p>
                  <p className="text-blue-600 font-bold text-xl">
                    {hotel.location.toFixed(1)}
                  </p>
                </div>

                <div className="mb-4">
                  <img className=" w-80 h-32 rounded-xl" src={map} alt="Map" />
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <BedSingle className="w-5 h-5" />
                    Show on map
                  </Button>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Link to={`/hotel/${hotelId}/booking`}>
                    <Button className="w-full bg-blue-600 text-white">
                      Reserve
                    </Button>
                  </Link>

                  <Button variant="outline" className="w-full">
                    Save the property
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <FeatureItem
                icon={<BedSingle className="w-6 h-6 text-gray-700" />}
                label="Apartments"
              />
              <FeatureItem
                icon={<Wifi className="w-6 h-6 text-gray-700" />}
                label="Free Wifi"
              />
              <FeatureItem
                icon={<Coffee className="w-6 h-6 text-gray-700" />}
                label="Kitchen"
              />
              <FeatureItem
                icon={<Bath className="w-6 h-6 text-gray-700" />}
                label="Private Bathroom"
              />
              <FeatureItem
                icon={<Tv className="w-6 h-6 text-gray-700" />}
                label="Flat-screen TV"
              />
              <FeatureItem
                icon={<Users className="w-6 h-6 text-gray-700" />}
                label="Family Rooms"
              />
              <FeatureItem
                icon={<CheckCircle className="w-6 h-6 text-gray-700" />}
                label="Key card access"
              />
              <FeatureItem
                icon={<CigaretteOff className="w-6 h-6 text-gray-700" />}
                label="Non-smoking rooms"
              />
            </div>

            <div className="flex gap-8 pt-4">
              <div className="mb-6 w-3/4">
                <div>
                  <p className="text-gray-800">{hotel.description}</p>
                  <p className="mt-4 text-gray-800">
                    Couples in particular like the location — they rated it 9.6
                    for a two-person trip.
                  </p>
                  <p className="mt-4 text-gray-500 text-sm">
                    Distance in property description is calculated using ©
                    OpenStreetMap
                  </p>
                </div>

                {/* <MostPopularFacilities /> */}
              </div>
              <div className="w-1/4">
                <div className="bg-white rounded-lg shadow-lg mb-4">
                  <h4 className="text-lg font-semibold mb-2">
                    Property highlights
                  </h4>
                  <p className="text-sm">Perfect for an 8-night stay!</p>
                  <p className="text-sm text-gray-600">
                    Top Location: Highly rated by recent guests (9.6)
                  </p>
                  <div className="mt-4">
                    <Button
                      className="w-full bg-blue-600 text-white"
                      onClick={scrollToMyDiv}
                    >
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
          </div>
        </div>
        <div ref={myDivRef}>
          <RoomTableDemo availableRooms={rooms} nights={numberOfNights} />
        </div>
        {renderFacilities()}
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
      <Footer />
    </>
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
