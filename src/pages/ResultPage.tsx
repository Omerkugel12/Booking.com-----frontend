import DropDownSort from "@/components/self-made/DropDownSort";
import FilterSidebar from "@/components/self-made/Filters";
import Footer from "@/components/self-made/Footer";
import Header from "@/components/self-made/Header";
import ResultHotelCard from "@/components/self-made/ResultHotelCard";
import SearchBar from "@/components/self-made/SearchBar";
import { useSearch } from "@/context/SearchContext";
import { Hotel } from "@/models/Hotel.model";
import { useSearchParams } from "react-router-dom";

const hotel1: Hotel = {
  _id: "1",
  name: "Hotel 1",
  type: "hotel",
  city: "New York",
  address: "456 Elm St",
  distance: "2KM",
  photos: [
    "https://cf.bstatic.com/xdata/images/hotel/square240/464042313.webp?k=fa5c892f6a184eb5dc81bd082667f1203dc2138ba4e4429032fe7be1fb1190e6&o=",
  ],
  title: "Hotel 1",
  desc: "This is a great hotel located in the heart of the city.",
  rating: 4.8,
  rooms: ["Room 1", "Room 2", "Room 3"],
  cheapestPrice: 100,
  featured: true,
};

function ResultPage() {
  // Get the current search parameters
  const [searchParams] = useSearchParams();

  // Extract specific query parameters
  const destination = searchParams.get("destination");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");
  const rooms = searchParams.get("rooms");

  return (
    <>
      <Header type="results" />
      <div className="px-44">
        <SearchBar />
      </div>
      <div className="flex mt-10 px-44">
        <div>
          <div>
            <img
              className=" w-80 h-32 rounded-xl"
              src="src\images\ShowOnMap.webp"
              alt="Map"
            />
            <div>
              <FilterSidebar />
            </div>
          </div>
        </div>
        <div className=" h-[100vh] w-full  ">
          <div className=" px-10 ">
            <div className=" flex flex-col gap-2 text-lg ">
              <h2 className=" font-bold text-xl">
                {destination}: {3} properties found
              </h2>
              <p className="text-sm">
                Dates: {startDate} to {endDate}
              </p>
              <p className="text-sm">
                Guests: {adults} adults, {children} children, {rooms} rooms
              </p>
              <DropDownSort />
              <p className=" border text-sm border-gray-200-200 mt-2 rounded-md p-2 w-fit">
                Review any travel advisories provided by your government to make
                an informed decision about your stay in this area, which may be
                considered conflict-affected.
              </p>
            </div>

            <div className=" flex w-full">
              <div className=" w-[95%]">
                <ResultHotelCard key={hotel1._id} hotel={hotel1} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ResultPage;
