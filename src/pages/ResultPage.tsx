import { useEffect, useState } from "react";
import DropDownSort from "@/components/self-made/DropDownSort";
import FilterSidebar from "@/components/self-made/Filters";
import Footer from "@/components/self-made/Footer";
import Header from "@/components/self-made/Header";
import ResultHotelCard from "@/components/self-made/ResultHotelCard";
import SearchBar from "@/components/self-made/SearchBar";
import { useSearch } from "@/context/SearchContext";
import { HotelResult } from "@/models/Hotel.model";
import { useSearchParams } from "react-router-dom";
import { getHotels } from "@/services/hotels.service";
import Map from "@/components/self-made/Map";
import ModalMap from "@/components/self-made/ModalMap";

function ResultPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get the current search parameters
  const [searchParams] = useSearchParams();

  // Extract specific query parameters
  const destination = searchParams.get("destination");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");
  const rooms = searchParams.get("rooms");
  const minPrice = searchParams.get("priceMin");
  const maxPrice = searchParams.get("priceMax");
  const freeCancelation = searchParams.get("Freecancellation");
  const noPrepayment = searchParams.get("Noprepayment");
  const starRating = searchParams.get("starRating");
  const meals = searchParams.get("meals");
  const sortBy = searchParams.get("sortBy");
  console.log(freeCancelation);
  // State to store fetched hotels
  const [hotels, setHotels] = useState<HotelResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const saveRecentSearch = (imageUrl: string) => {
    const recentSearch = {
      destination: destination || "",
      startDate: startDate || "",
      endDate: endDate || "",
      guests: {
        adults: adults ? parseInt(adults) : 1,
        children: children ? parseInt(children) : 0,
        rooms: rooms ? parseInt(rooms) : 1,
      },
      imageUrl: imageUrl || "https://source.unsplash.com/random?city", // Fallback image if none is available
    };

    const existingSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    const updatedSearches = [recentSearch, ...existingSearches];
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);

      try {
        const filters = {
          name: destination || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          numOfPeople: adults ? parseInt(adults) : undefined,
          numOfRooms: rooms ? parseInt(rooms) : undefined,
          priceMin: minPrice ? parseInt(minPrice) : undefined,
          priceMax: maxPrice ? parseInt(maxPrice) : undefined,
          freeCancellation: freeCancelation
            ? freeCancelation === "true"
            : undefined,
          prepayment: noPrepayment
            ? noPrepayment === "true"
            : noPrepayment === "false",
          starsRating: starRating ? starRating : undefined,
          meals: meals ? meals : undefined,
          sortBy: sortBy,
        };
        const response = await getHotels(filters);
        console.log(filters.priceMin);
        setHotels(response.data);

        if (response.data.length > 0) {
          const firstImageUrl = response.data[0].image || "";
          saveRecentSearch(firstImageUrl);
        }
      } catch (err) {
        setError("Error fetching hotels. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [destination, startDate, endDate, adults, children, rooms, searchParams]);

  const openModal = () => {
    console.log("Opening modal. Hotels:", hotels);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  if (error) return <p>{error}</p>;

  return (
    <div className=" h-full">
      <Header type="results" />
      <div className="max-w-[1050px] 2xl:max-w-[1050px] w-full mx-auto">
        <SearchBar type="default" />
      </div>
      <div className="flex mt-10 max-w-[1050px] 2xl:max-w-[1050px] w-full mx-auto">
        <div>
          <div>
            <img
              className=" w-80 h-32 rounded-xl cursor-pointer"
              src="src/images/ShowOnMap.webp"
              alt="Map"
              onClick={openModal}
            />
            {/* <Map hotels={hotels} /> */}
            <ModalMap
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              hotels={hotels}
            />
            <div>
              <FilterSidebar />
            </div>
          </div>
        </div>
        <div className="h-[100vh] w-full">
          <div className="px-10">
            {loading && <p>Loading hotels...</p>}
            <div className="flex flex-col gap-2 text-lg">
              <h2 className="font-bold text-xl pb-4">
                {destination ? destination.toUpperCase() : ""}: {hotels.length}{" "}
                properties found
              </h2>

              {/*  <p className="text-sm">
                Dates: {startDate} to {endDate}
              </p>
              <p className="text-sm">
                Guests: {adults} adults, {children} children, {rooms} rooms
              </p> */}
              <DropDownSort />
              {/* <p className="border text-sm border-gray-200-200 mt-2 rounded-md p-2 w-fit">
                Review any travel advisories provided by your government to make
                an informed decision about your stay in this area, which may be
                considered conflict-affected.
              </p> */}
            </div>

            <div className="flex w-full">
              {hotels.length > 0 ? (
                <div className="w-[95%]">
                  {hotels.map((hotel) => (
                    <ResultHotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              ) : (
                <p>No hotels matched</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
