import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getHotelDetailsWithAvailableRooms } from "../services/hotels.service";
import RoomTableDemo from "../components/self-made/DetailsPage/ReservationsTable";
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
import GuestRevies from "@/components/self-made/DetailsPage/GuestRevies";
import RenderFacilities from "@/components/self-made/DetailsPage/RenderFacilities";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const HotelDetailsPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [searchParams] = useSearchParams();
  const [hotel, setHotel] = useState<HotelDetails | null>(null);
  const [rooms, setRooms] = useState<AvailableRoom | null>(null);
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

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await getHotelDetailsWithAvailableRooms(
          hotelId!,
          startDate!,
          endDate!
        );
        console.log(response);

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
    <>
      <Header type="results" />
      <div className="lg:px-72">
        <SearchBar />
      </div>
      <main className="lg:px-72">
        {/*Breadcrumb*/}
        <div className="flex gap-2 text-[0.7rem] text-gray-600 py-6">
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
        </div>

        {/*navbar*/}
        <nav className="border-b border-gray-300 mb-4">
          <ul className="flex justify-between text-sm">
            <Button
              variant="ghost"
              className="flex-1 px-10 border-b-2  pb-5 border-nav_btn_text rounded-none"
            >
              <a href="#overview" className="">
                Overview
              </a>
            </Button>
            <Button variant="ghost" className="flex-1 px-10 pb-5">
              <a href="#info&prices">Info & prices</a>
            </Button>
            <Button variant="ghost" className="flex-1 px-10 pb-5">
              <a href="#faciliteis">Facilities</a>
            </Button>
            <Button variant="ghost" className="flex-1 px-10 pb-5">
              <a href="#houseRules">House rules</a>
            </Button>
            <Button variant="ghost" className="flex-1 px-10 pb-5">
              <a href="#theFinePrint">The fine print</a>
            </Button>
            <Button variant="ghost" className="flex-1 px-10 pb-5">
              <Sheet>
                <SheetTrigger>
                  Guest reviews ({hotel.reviews.length})
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </Button>
          </ul>
        </nav>

        {/*overview*/}
        <section className="flex gap-8" id="overview">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              {/*hotel*/}
              <div>
                <div className="flex items-center">
                  <span className="bg-white text-yellow font-bold py-1 rounded-sm mr-2">
                    {hotel.starsRating && "★".repeat(hotel.starsRating)}
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
              <div className="flex flex-col gap-3 items-center space-x-4">
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
                    href="#info&prices"
                    className="flex items-center gap-2 text-blue-600 text-sm font-semibold"
                  >
                    <Tag size={"16px"} />
                    We Price Match
                  </a>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="max-w-[75%] w-full">
                <div className="grid grid-cols-3 grid-rows-2 gap-2 w-full h-[450px] ">
                  {/* Main large image */}
                  <div className="col-span-2 row-span-2">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Smaller images */}
                  <div className="col-span-1">
                    <img
                      src={hotel.image}
                      alt="Additional view"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="col-span-1">
                    <img
                      src={hotel.image}
                      alt="Additional view"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="col-span-1">
                    <img
                      src={hotel.image}
                      alt="Additional view"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <div className="w-[25%] pl-3 h-[450px] flex flex-col justify-between">
                <div className="border">
                  <div className="flex items-center justify-end gap-2 p-3">
                    <div className="flex flex-col items-center">
                      <span className="ml-2 text-md font-semibold">
                        {getScoreLetter(hotel.avgRating)}
                      </span>
                      <p className="text-[0.7rem] text-gray-600">{`${hotel.reviews.length} reviews`}</p>
                    </div>
                    <div className="bg-blue_1 p-1 rounded-tl-md rounded-tr-md rounded-br-md">
                      <p className="text-md font-semibold text-white">
                        {hotel?.avgRating.toFixed(1)}
                      </p>
                    </div>
                  </div>

                  <div className="border-y p-3 flex flex-col gap-2">
                    <p className="font-semibold text-[0.7rem]">
                      Guests who stayed here loved
                    </p>
                    {/*carusele*/}
                    <div className="flex flex-col gap-5">
                      <div className="flex items-start mb-2">
                        <p className="text-sm text-gray-600">
                          "Great location just near tube & Portobello Market on
                          a gorgeous street."
                        </p>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-semibold">
                          <Avatar className="size-6">
                            <AvatarImage
                              className=""
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </span>
                        <span className="text-[0.7rem] ml-2">Susan</span>
                        <span className="ml-2 text-gray-500 text-[0.7rem]">
                          Israel
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-b p-3 flex justify-between">
                    <p className="text-lg font-bold">
                      Location: {getScoreLetter(hotel?.location)}
                    </p>
                    <div className="bg-blue_1 p-1 rounded-tl-md rounded-tr-md rounded-br-md">
                      <p className="text-md font-semibold text-white">
                        {hotel?.location.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="">
                  <img className="" src={map} alt="Map" />
                </div>
              </div>
            </div>

            {/* <div className="grid grid-cols-4 gap-4 mb-6">
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
            </div> */}

            <div className="flex justify-between">
              <div className="max-w-[65%]">
                <p className="text-gray-800 text-sm">{hotel.description}</p>
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
              <div className="max-w-[28%] w-full bg-purple">
                <div className=" rounded-lg shadow-lg mb-4">
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
        </section>

        {/*info & prices*/}
        <section ref={myDivRef} id="info&prices">
          <RoomTableDemo availableRooms={rooms} nights={numberOfNights} />
          {/*Guest reviews*/}
          <GuestRevies hotel={hotel} />
        </section>

        {/*Facilities*/}
        <RenderFacilities hotel={hotel} />

        {/*House rules*/}
        <section id="houseRules">House rules</section>
        {/*The fine print*/}
        <section id="theFinePrint">The fine print</section>
      </main>
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
