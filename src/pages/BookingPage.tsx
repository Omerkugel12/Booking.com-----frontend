import BookingContent from "@/components/self-made/BookingComps/BookingContent/BookingContent";
import Footer from "@/components/self-made/Footer";
import Header from "@/components/self-made/Header";
import ReservationSideBar from "@/components/self-made/BookingComps/ReservationSideBar";
import { useAuth } from "@/context/AuthContext";
import { useSearch } from "@/context/SearchContext";
import { differenceInDays, format, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HotelDetails } from "@/models/Hotel.model";
import api from "@/services/api.service";
import PaymentContent from "@/components/self-made/BookingComps/PaymentContent/PaymentContent";
import { useReservation } from "@/context/ReservationContext";
import ProgressStepsBar from "@/components/self-made/BookingComps/ProgressStepsBar";
import { useToast } from "@/hooks/use-toast";

function BookingPage() {
  const { toast } = useToast();
  const { loggedInUser } = useAuth();
  const { date1, options1 } = useSearch();
  const dateSevenDaysBefore = date1?.from ? subDays(date1.from, 7) : null;
  const { hotelId } = useParams();
  const [nextStep, setNextStep] = useState<boolean>(false);
  const [hotel, setHotel] = useState<HotelDetails | null>(null);
  const { roomSelections, totalPrice } = useReservation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHotelById(hotelId: string) {
      try {
        const startDate = date1?.from ? format(date1.from, "yyyy-MM-dd") : "";
        const endDate = date1?.to ? format(date1.to, "yyyy-MM-dd") : "";
        const { data } = await api.get(
          `/hotels/${hotelId}?startDate=${startDate}&endDate=${endDate}`
        );
        setHotel(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchHotelById(hotelId as string);
  }, []);
  const totalDays =
    date1?.to && date1?.from && differenceInDays(date1.to, date1.from);
  const totalPrice1 = totalPrice * 0.9;
  const totalGuests = options1 && options1.adults + options1.children;
  const totalRooms = roomSelections.reduce(
    (acc, room) => acc + room.quantity,
    0
  );

  // useEffect(() => {
  //   console.log("Room Selections:", roomSelections);
  //   console.log("Total Price:", totalPrice);
  // }, [roomSelections, totalPrice]);

  async function addResrvation() {
    roomSelections.forEach(async (roomSelections) => {
      const newReservation = {
        userID: loggedInUser?._id,
        hotelID: hotelId,
        roomID: roomSelections.roomId,
        startDate: date1?.from ? format(date1.from, "yyyy-MM-dd") : null,
        endDate: date1?.to ? format(date1.to, "yyyy-MM-dd") : null,
        roomsForReservation: roomSelections.quantity,
      };

      try {
        const { data } = await api.post(
          "/reservations/reservation",
          newReservation
        );
        toast({
          title: data.message,
          description:
            "Thank you for your reservation, you will receive your reservation information to your Email account",
        });
        navigate("/", { replace: true });
      } catch (error: any) {
        console.log(error);
        toast({
          variant: "destructive",
          title: error.message,
        });
      }
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header type="bookingPage" />
      <main className="flex-1 px-0 max-w-[1050px] 2xl:max-w-[1050px] w-full mx-auto pb-32">
        {/* Pogress-bar */}
        <ProgressStepsBar nextStep={nextStep} />
        {/* <Button onClick={() => setNextStep(false)} className="">
          back
        </Button> */}
        <section className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
          {!nextStep ? (
            <ReservationSideBar
              hotel={hotel}
              type="bookingPage"
              hotelId={hotelId}
              totalPrice1={totalPrice1}
              totalGuests={totalGuests}
              totalRooms={totalRooms}
              dateSevenDaysBefore={dateSevenDaysBefore}
              totalDays={totalDays}
            />
          ) : (
            <ReservationSideBar
              hotel={hotel}
              type="paymentPage"
              hotelId={hotelId}
              totalPrice1={totalPrice1}
              totalGuests={totalGuests}
              totalRooms={totalRooms}
              dateSevenDaysBefore={dateSevenDaysBefore}
              totalDays={totalDays}
            />
          )}

          {!nextStep ? (
            <BookingContent
              loggedInUser={loggedInUser}
              dateSevenDaysBefore={dateSevenDaysBefore}
              options1={options1}
              setNextStep={setNextStep}
            />
          ) : (
            <PaymentContent
              addResrvation={addResrvation}
              totalPrice1={totalPrice1}
              hotel={hotel}
              date1={date1}
              //   hotelId={hotelId}
              //   totalRooms={totalRooms}
              //   totalGuests={totalGuests}
              totalDays={totalDays}
              roomSelections={roomSelections}
            />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default BookingPage;
