import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useSearch } from "@/context/SearchContext"; // Import the useSearch hook

interface RecentSearch {
  destination: string;
  startDate: string;
  endDate: string;
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
  imageUrl: string;
}

const RecentSearches: React.FC = () => {
  const navigate = useNavigate();
  const recentSearches: RecentSearch[] = JSON.parse(
    localStorage.getItem("recentSearches") || "[]"
  );
  const { setDestination1, setDate1, setOptions1 } = useSearch(); // Destructure context setters

  const uniqueRecentSearches = recentSearches.filter(
    (search, index, self) =>
      index ===
      self.findIndex(
        (s) =>
          s.destination === search.destination &&
          s.startDate === search.startDate &&
          s.endDate === search.endDate &&
          s.guests.adults === search.guests.adults &&
          s.guests.children === search.guests.children &&
          s.guests.rooms === search.guests.rooms
      )
  );

  const handleSearchClick = (search: RecentSearch) => {
    // Update the context with the selected search values
    setDestination1(search.destination);
    setDate1({
      from: parseISO(search.startDate),
      to: parseISO(search.endDate),
    });
    setOptions1(search.guests);

    const searchParams = new URLSearchParams({
      destination: search.destination,
      startDate: search.startDate,
      endDate: search.endDate,
      adults: search.guests.adults.toString(),
      children: search.guests.children.toString(),
      rooms: search.guests.rooms.toString(),
    });

    // Navigate to the results page
    navigate(`/results?${searchParams.toString()}`);
  };

  const handleRemoveSearch = (index: number) => {
    const updatedSearches = [...uniqueRecentSearches];
    updatedSearches.splice(index, 1);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    window.location.reload();
  };

  const formatDateRange = (startDate: string, endDate: string): string => {
    const start = format(parseISO(startDate), "MMM d");
    const end = format(parseISO(endDate), "MMM d");
    return `${start}-${end}`;
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Your recent searches</h2>
      {uniqueRecentSearches.length > 0 && (
        <Carousel>
          <div className="relative">
            <CarouselContent className="flex gap-4">
              {uniqueRecentSearches.map((search, index) => (
                <CarouselItem key={index} className="w-[300px] flex-none">
                  <div
                    className="relative flex items-center bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer p-2"
                    onClick={() => handleSearchClick(search)}
                  >
                    <img
                      src={search.imageUrl}
                      alt={search.destination}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="ml-4 flex-grow">
                      <h3 className="text-lg font-semibold">
                        {search.destination}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDateRange(search.startDate, search.endDate)},{" "}
                        {search.guests.adults + search.guests.children} people
                      </p>
                    </div>
                    <button
                      className="absolute top-2 right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSearch(index);
                      }}
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {uniqueRecentSearches.length > 3 && (
              <>
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white shadow"
                  >
                    ←
                  </Button>
                </CarouselPrevious>
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white shadow"
                  >
                    →
                  </Button>
                </CarouselNext>
              </>
            )}
          </div>
        </Carousel>
      )}
    </div>
  );
};

export default RecentSearches;
