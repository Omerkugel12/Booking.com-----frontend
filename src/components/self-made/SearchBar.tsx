import { BedSingle, UserRound } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { DatePickerWithRange } from "./DateRangePicker";
import React from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

function SearchBar() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });

  function handleSearchSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);
    const destination = formData.get("destination");

    const data = { destination: destination, date: date };
    console.log(data);
  }

  return (
    <div className="-mt-6 p-[3px] rounded-sm px-52 h-[4rem]  z-30">
      {" "}
      {/* Updated height */}
      <form
        onSubmit={handleSearchSubmit}
        id="search-form"
        className="rounded-sm bg-bg_search_bar flex items-center gap-1 p-1 h-full"
      >
        {/* Destination Input */}
        <div className="relative h-full flex-1 ring-0 bg-white flex items-center px-4 rounded-sm hover:ring-1 ring-orange-600">
          <BedSingle
            strokeWidth={1.75}
            className="mr-2 h-7 w-7 text-gray-500"
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
        <DatePickerWithRange date={date} setDate={setDate} />

        {/* Guests Input */}
        <div className="relative h-full flex-1 bg-white flex items-center px-4 rounded-sm hover:ring-1 ring-orange-600">
          <UserRound
            strokeWidth={1.75}
            className="mr-2 h-7 w-7 text-gray-500"
          />
          <Input
            type="text"
            id="guests"
            name="guests"
            placeholder="2 adults · 0 children · 1 room"
            className="w-full border-none focus:outline-none focus:ring-0 placeholder-gray-500 text-xs font-semibold"
          />
        </div>
        <div>
          {/* Search Button */}
          <Button
            type="submit"
            id="search-btn"
            className="flex-none w-24 px-4 py-3 h-full  bg-blue-500 text-white text-xl font-semibold rounded-sm hover:bg-blue-700 transition-colors"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
