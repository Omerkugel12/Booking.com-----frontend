import BookingContent from "@/components/self-made/BookingComps/BookingContent";
import Footer from "@/components/self-made/Footer";
import Header from "@/components/self-made/Header";
import ReservationSideBar from "@/components/self-made/BookingComps/ReservationSideBar";
import { useAuth } from "@/context/AuthContext";
import { useSearch } from "@/context/SearchContext";
import { subDays } from "date-fns";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

function BookingPage() {
  const { loggedInUser } = useAuth();
  const { date1, options1 } = useSearch();
  const dateSevenDaysBefore = date1?.from ? subDays(date1.from, 7) : null;
  const { hotelId } = useParams();
  const [nextStep, setNextStep] = useState<boolean>(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header type="bookingPage" />
      <main className="flex-1 px-44 pb-32">
        <div className="h-6 bg-black my-8"></div> {/* time line */}
        <section className="grid grid-cols-[1fr_2fr] gap-8">
          <ReservationSideBar
            type="bookingPage"
            hotelId={hotelId}
            dateSevenDaysBefore={dateSevenDaysBefore}
          />

          {!nextStep ? (
            <BookingContent
              loggedInUser={loggedInUser}
              dateSevenDaysBefore={dateSevenDaysBefore}
              options1={options1}
              setNextStep={setNextStep}
            />
          ) : (
            <>
              <div>
                <p>hii</p>
                <Button onClick={() => setNextStep(false)}>back</Button>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default BookingPage;
