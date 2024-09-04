import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getHotelDetailsWithAvailableRooms } from "../services/hotels.service";
import RoomTableDemo from "../components/self-made/DetailsPage/ReservationsTable";
import { HotelDetails, AvailableRoom } from "../models/Hotel.model";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/self-made/SearchBar";
import Header from "@/components/self-made/Header";
import Footer from "@/components/self-made/Footer";
import GuestRevies from "@/components/self-made/DetailsPage/GuestRevies";
import RenderFacilities from "@/components/self-made/DetailsPage/RenderFacilities";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import HouseRulesComp from "@/components/self-made/DetailsPage/HouseRulesComp";
import FinePrintComp from "@/components/self-made/DetailsPage/FinePrintComp";
import OverviewSection from "@/components/self-made/DetailsPage/OverviewSection";
import ReviewModal from "@/components/self-made/DetailsPage/ReviewModal";
import { Loader } from "rsuite";

export const getScoreLetter = (rating: number): string => {
  if (rating < 7) return "Pleasant";
  else if (rating >= 7 && rating < 8) return "Good";
  else if (rating >= 8 && rating <= 8.5) return "Very Good";
  else if (rating > 8.5 && rating <= 9) return "Excellent";
  else if (rating > 9 && rating <= 10) return "Wonderful";
  return "";
};

const HotelDetailsPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [searchParams] = useSearchParams();
  const [hotel, setHotel] = useState<HotelDetails | null>(null);
  const [rooms, setRooms] = useState<AvailableRoom[] | null>(null);
  const myDivRef = useRef(null);

  const scrollToMyDiv = () => {
    if (myDivRef.current) {
      myDivRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
    return (
      <p>
        <Loader />
      </p>
    );
  }

  // Function to convert numeric rating to descriptive string

  return (
    <>
      <Header type="results" />
      <div className="max-w-[1050px] 2xl:max-w-[1050px] w-full mx-auto">
        <SearchBar type="default" />
      </div>
      <main className="max-w-[1050px] 2xl:max-w-[1050px] w-full mx-auto">
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
                <SheetContent
                  style={{ maxWidth: "900px" }}
                  className="rounded-l-2xl  overflow-scroll"
                >
                  <ReviewModal hotel={hotel} />
                </SheetContent>
              </Sheet>
            </Button>
          </ul>
        </nav>
        {/*overview*/}
        <OverviewSection hotel={hotel} scrollToMyDiv={scrollToMyDiv} />
        {/*info & prices*/}
        <section ref={myDivRef} id="info&prices">
          <RoomTableDemo availableRooms={rooms} nights={numberOfNights} />
          {/*Guest reviews*/}
          <GuestRevies hotel={hotel} />
        </section>
        {/*Facilities*/}
        <RenderFacilities hotel={hotel} />
        {/*House rules*/}
        <HouseRulesComp hotel={hotel} />
        {/*The fine print*/}
        <FinePrintComp />
      </main>
      <Footer />
    </>
  );
};

// Feature Item component

export default HotelDetailsPage;
