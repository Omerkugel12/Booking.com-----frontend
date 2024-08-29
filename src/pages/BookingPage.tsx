import BookingContent from "@/components/self-made/BookingComps/BookingContent/BookingContent";
import Footer from "@/components/self-made/Footer";
import Header from "@/components/self-made/Header";
import ReservationSideBar from "@/components/self-made/BookingComps/ReservationSideBar";
import { useAuth } from "@/context/AuthContext";
import { useSearch } from "@/context/SearchContext";
import { format, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HotelDetails } from "@/models/Hotel.model";
import api from "@/services/api.service";
import PaymentContent from "@/components/self-made/BookingComps/PaymentContent/PaymentContent";

function BookingPage() {
  const { loggedInUser } = useAuth();
  const { date1, options1 } = useSearch();
  const dateSevenDaysBefore = date1?.from ? subDays(date1.from, 7) : null;
  const { hotelId } = useParams();
  const [nextStep, setNextStep] = useState<boolean>(false);
  const [hotel, setHotel] = useState<HotelDetails | null>(null);

  useEffect(() => {
    async function fetchHotelById(hotelId: string) {
      try {
        const startDate = date1?.from ? format(date1.from, "yyyy-MM-dd") : "";
        const endDate = date1?.to ? format(date1.to, "yyyy-MM-dd") : "";
        const { data } = await api.get(
          `/hotels/${hotelId}?startDate=${startDate}&endDate=${endDate}`
        );
        setHotel(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchHotelById(hotelId as string);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header type="bookingPage" />
      <main className="flex-1 px-44 pb-32">
        <div className="h-6 bg-black my-8"></div> {/* time line */}
        <section className="grid grid-cols-[1fr_2fr] gap-8">
          {!nextStep ? (
            <ReservationSideBar
              hotel={hotel}
              type="bookingPage"
              hotelId={hotelId}
              dateSevenDaysBefore={dateSevenDaysBefore}
            />
          ) : (
            <ReservationSideBar
              hotel={hotel}
              type="paymentPage"
              hotelId={hotelId}
              dateSevenDaysBefore={dateSevenDaysBefore}
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
            <PaymentContent setNextStep={setNextStep} />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default BookingPage;
