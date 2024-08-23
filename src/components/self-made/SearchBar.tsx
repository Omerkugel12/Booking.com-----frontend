import { BedSingle, CalendarDays, UserRound } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function SearchBar() {
  return (
    <div className=" w-full p-[3px] bg-bg_search_bar rounded-sm">
      <form
        id="search-form"
        className="w-full bg-bg_search_bar flex items-center gap-1 "
      >
        {/* Destination Input */}

        <div className="relative flex-1 ring-0 bg-white flex items-center px-4 rounded-sm  hover:ring-1 ring-orange-600">
          <BedSingle
            strokeWidth={1.75}
            className="mr-2 h-7 w-7 text-gray-500 "
          />
          <Input
            type="text"
            id="destination"
            name="destination"
            placeholder="Where are you going?"
            required
            className="w-full border-none outline-0 placeholder-gray-500 text-xs font-semibold"
          />
        </div>

        {/* Date Input */}
        <div className="relative flex-1 bg-white flex items-center px-4 rounded-sm hover:ring-1 ring-orange-600">
          <CalendarDays
            strokeWidth={1.75}
            className="mr-2 h-7 w-7 text-gray-500 "
          />
          <Input
            type="text"
            id="dates"
            name="dates"
            placeholder="Thu 29 Aug — Sat 31 Aug"
            required
            className="w-full border-none focus:outline-none focus:ring-0 placeholder-gray-500 text-xs font-semibold"
          />
        </div>

        {/* Guests Input */}
        <div className="relative flex-1 bg-white flex items-center px-4 rounded-sm hover:ring-1 ring-orange-600">
          <UserRound
            strokeWidth={1.75}
            className="mr-2 h-7 w-7 text-gray-500"
          />
          <Input
            type="text"
            id="guests"
            name="guests"
            placeholder="2 adults · 0 children · 1 room"
            required
            className="w-full border-none focus:outline-none focus:ring-0 placeholder-gray-500 text-xs font-semibold"
          />
        </div>
        <div>
          {/* Search Button */}
          <Button
            type="submit"
            id="search-btn"
            className="flex-none px-4 py-4 bg-blue-500 text-white text-md font-semibold rounded-sm hover:bg-blue-700 transition-colors"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
