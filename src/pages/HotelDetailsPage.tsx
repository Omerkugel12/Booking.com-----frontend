import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotelDetails } from "../services/hotels.service";
import { Button } from "@/components/ui/button";
import { MapPin, Heart, Share, Tag, CheckCircle, Wifi, Tv } from "lucide-react";

interface HotelDetails {
  id: number;
  name: string;
  city: string;
  price: number;
  description: string;
  distance: number;
  freeCancellation: number;
  prepayment: number;
  scoreLetter: string;
  reviews: number;
  hotelLink: string;
  image: string;
  facilities: string[] | null; // Allow facilities to be null
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
    "Guest reviews (272)",
  ];

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await getHotelDetails(hotelId);
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

  const FacilityItem = ({
    icon,
    label,
  }: {
    icon: React.ReactNode;
    label: string;
  }) => (
    <div className="flex items-center">
      {icon}
      <span className="ml-2 text-gray-700">{label}</span>
    </div>
  );
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600 mb-4">
        Home &gt; Hotels &gt; {hotel.city} &gt; {hotel.name}
      </nav>
      <div className="border-b border-gray-300">
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
                <div className="mt-1 h-[2px] bg-blue-600 w-full"></div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* Main Hotel Details Section */}
      <div className="flex gap-8 pt-4">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            {/* Hotel Info Section */}
            <div>
              <div className="flex items-center mb-2">
                <span className="bg-yellow-400 text-white font-bold px-2 py-1 rounded-sm mr-2">
                  ★★★
                </span>
                <span className="bg-yellow-400 text-white font-bold px-2 py-1 rounded-sm">
                  Travel Proud
                </span>
              </div>
              <h1 className="text-2xl font-bold">Notting Hill House</h1>
              <div className="flex items-center text-sm text-gray-600 pb-6 pt-4">
                <MapPin className="w-4 h-4 text-blue-600 mr-1" />
                <span>{hotel.city}</span>
                <span className="mx-2">–</span>
                <a href="#" className="text-blue-600 font-bold">
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
          <div className="flex gap-4">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-1/2 rounded-lg shadow-lg"
            />
            {/* Additional Images Placeholder */}
            <div className="grid grid-cols-2 gap-2 w-1/2">
              <img
                src={hotel.image}
                alt="Other view"
                className="w-full rounded-lg shadow-lg"
              />
              <img
                src={hotel.image}
                alt="Other view"
                className="w-full rounded-lg shadow-lg"
              />
              {/* Add more image placeholders as needed */}
            </div>
          </div>

          <div className="container mx-auto py-8 px-4">
            <div className="gap-8">
              {/* Main Details Section */}
              <div>
                {/* Key Features */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <FeatureItem
                    icon={<Wifi className="w-5 h-5 text-gray-700" />}
                    label="Kitchen"
                  />
                  <FeatureItem
                    icon={<Wifi className="w-5 h-5 text-gray-700" />}
                    label="Shower"
                  />
                  <FeatureItem
                    icon={<Wifi className="w-5 h-5 text-gray-700" />}
                    label="Free Wifi"
                  />
                  <FeatureItem
                    icon={<Tv className="w-5 h-5 text-gray-700" />}
                    label="Flat-screen TV"
                  />
                  <FeatureItem
                    icon={<Wifi className="w-5 h-5 text-gray-700" />}
                    label="Family Rooms"
                  />
                  <FeatureItem
                    icon={<CheckCircle className="w-5 h-5 text-gray-700" />}
                    label="Key card access"
                  />
                  {/* Add more features as needed */}
                </div>

                {/* Hotel Description */}
                <div className="flex gap-8">
                  <div className="flex-3">
                    <div className="text-gray-800 mb-6">
                      <p>
                        Notting Hill House provides accommodations within 2.7
                        miles of the center of London, with free Wifi and a
                        kitchen with a microwave, a fridge, and a stovetop. The
                        property is around a 10-minute walk from Portobello Road
                        Market, 1.3 miles from Paddington Station, and 1.4 miles
                        from Royal Albert Hall. Guests can enjoy city views.
                      </p>
                      <p className="mt-2">
                        At the condo hotel, all units have a desk, a flat-screen
                        TV, a private bathroom, bed linen, and towels.
                        Kitchenware and a kettle are also featured. The rooms
                        are equipped with heating facilities.
                      </p>
                      <p className="mt-2">
                        Couples in particular like the location – they rated it
                        9.6 for a two-person trip.
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Distance in property description is calculated using ©
                        OpenStreetMap
                      </p>
                    </div>

                    {/* Popular Facilities */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-2">
                        Most popular facilities
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        <FacilityItem
                          icon={<Wifi className="w-5 h-5 text-green-600" />}
                          label="Free Wifi"
                        />
                        <FacilityItem
                          icon={<Wifi className="w-5 h-5 text-green-600" />}
                          label="Family rooms"
                        />
                        <FacilityItem
                          icon={
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          }
                          label="Non-smoking rooms"
                        />
                        <FacilityItem
                          icon={
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          }
                          label="Designated smoking area"
                        />
                        {/* Add more facilities */}
                      </div>
                    </div>
                  </div>{" "}
                  {/* Sidebar Section */}
                  <div className="w-1/3 flex-1">
                    <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
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
                        Guests say the description and photos for this property
                        are accurate.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-lg">
            <p className="font-semibold">Facilities</p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              {hotel.facilities && hotel.facilities.length > 0 ? (
                hotel.facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))
              ) : (
                <li>No facilities available</li>
              )}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        {/* <div className="w-1/3">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-blue-600 font-bold text-2xl">
              {hotel.scoreLetter}
            </p>
            <p className="text-gray-600">{hotel.reviews} reviews</p>
            <Button className="w-full mt-4 bg-blue-600 text-white">
              Reserve
            </Button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HotelDetailsPage;
