import Footer from "@/components/self-made/Footer";
import Header from "@/components/self-made/Header";
import ReservationSideBar from "@/components/self-made/ReservationSideBar";
import { useSearch } from "@/context/SearchContext";
import { subDays } from "date-fns";
import { useParams } from "react-router-dom";

function PaymentPage() {
  const { date1, options1 } = useSearch();
  const dateSevenDaysBefore = date1?.from ? subDays(date1.from, 7) : null;
  const { hotelId } = useParams();

  return (
    <div className="flex flex-col min-h-screen">
      <Header type="bookingPage" />
      <main className="flex-1 px-44 pb-32">
        <div className="h-6 bg-black my-8"></div> {/* time line */}
        <section className="grid grid-cols-[1fr_2fr] gap-8">
          <ReservationSideBar
            type="paymentPage"
            hotelId={hotelId}
            dateSevenDaysBefore={dateSevenDaysBefore}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default PaymentPage;
