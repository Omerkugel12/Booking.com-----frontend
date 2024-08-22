import { BedSingle, CalendarDays, UserRound } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function SearchBar() {
  return (
    <div className="max-h-48 h-full mx-auto p-6 bg-bg_search_bar rounded-lg shadow-md">
      <form id="search-form" className="flex flex-col md:flex-row gap-4">
        <div className="flex w-full">
          <BedSingle strokeWidth={1.75} className="" />
          <Input
            type="text"
            id="destination"
            name="destination"
            placeholder="Where are you going?"
            required
            className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative w-full">
          <CalendarDays
            strokeWidth={1.75}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          />
          <Input
            type="date"
            id="checkout-date"
            name="checkout_date"
            required
            className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative w-full">
          <UserRound
            strokeWidth={1.75}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          />
          <Input
            type="number"
            id="guests"
            name="guests"
            placeholder="Guests"
            min="1"
            required
            className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button
          type="submit"
          id="search-btn"
          className="w-full md:w-auto p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Search
        </Button>
      </form>
    </div>
  );
}

export default SearchBar;
