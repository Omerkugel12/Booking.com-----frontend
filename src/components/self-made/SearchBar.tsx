import { BedSingle, Minus, Plus, UserRound } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DatePickerWithRange } from "./DateRangePicker";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, parseISO } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { useSearch } from "@/context/SearchContext";

interface Options {
  adults: number;
  children: number;
  rooms: number;
}

function SearchBar() {
  const { setDestination1, setDate1, setOptions1 } = useSearch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialStartDate = searchParams.get("startDate");
  const initialEndDate = searchParams.get("endDate");

  // Convert parsed dates to Date objects if they exist
  const parsedStartDate = initialStartDate
    ? parseISO(initialStartDate)
    : new Date();
  const parsedEndDate = initialEndDate
    ? parseISO(initialEndDate)
    : addDays(new Date(), 5);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: parsedStartDate,
    to: parsedEndDate,
  });

  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );

  const [options, setOptions] = useState<Options>({
    adults: Number(searchParams.get("adults")) || 1,
    children: Number(searchParams.get("children")) || 0,
    rooms: Number(searchParams.get("rooms")) || 1,
  });

  const handleOption = (name: keyof Options, operation: string) => {
    setOptions((prev) => {
      const newValue =
        operation === "i" ? options[name] + 1 : options[name] - 1;
      return {
        ...prev,
        [name]: newValue,
      };
    });
  };

  function handleSearchSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);
    const destination = formData.get("destination") as string;
    setDestination1(destination);

    const data = {
      destination: destination,
      startDate: date?.from ? format(date.from, "yyyy-MM-dd") : undefined, // Format date to YYYY-MM-DD
      endDate: date?.to ? format(date.to, "yyyy-MM-dd") : undefined,
      guests: {
        adults: options.adults,
        children: options.children,
        rooms: options.rooms,
      },
    };

    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    if (destination) updatedSearchParams.set("destination", destination);
    if (data.startDate) updatedSearchParams.set("startDate", data.startDate);
    if (data.endDate) updatedSearchParams.set("endDate", data.endDate);
    updatedSearchParams.set("adults", options.adults.toString());
    updatedSearchParams.set("children", options.children.toString());
    updatedSearchParams.set("rooms", options.rooms.toString());

    setSearchParams(updatedSearchParams);
    setDate1(date);
    setOptions1(options);

    navigate(`/results?${updatedSearchParams}`);
  }

  function handleDestinationChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setDestination(ev.target.value);
  }

  return (
    <div className="-mt-8 p-[3px] rounded-sm h-[70px] z-30">
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
            value={destination}
            onChange={handleDestinationChange}
            placeholder="Where are you going?"
            required
            className="w-full border-none outline-0 placeholder-gray-500 text-xs font-semibold"
          />
        </div>

        {/* Date Input */}
        <DatePickerWithRange date={date} setDate={setDate} />

        {/* Guests Input */}
        <Popover>
          <PopoverTrigger className="h-full w-[30%]">
            <div className="relative h-full flex-1 bg-white flex justify-start items-center px-4 rounded-sm hover:ring-1 ring-orange-600">
              <UserRound
                strokeWidth={1.75}
                className="mr-2 h-7 w-7 text-gray-500"
              />
              <span
                id="guests"
                className="w-full border-none focus:outline-none focus:ring-0 placeholder-gray-500 text-xs font-semibold"
              >
                {`${options.adults} adult ~ ${options.children} children ~ ${options.rooms} rooms`}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="border-b">
              <div className="space-y-2 pb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Adults</span>
                  <div className="border border-black rounded-sm p-2 flex gap-6">
                    <button
                      type="button"
                      disabled={options.adults <= 1}
                      onClick={() => handleOption("adults", "d")}
                    >
                      <Minus className="w-4 text-nav_btn_text" />
                    </button>
                    <span className="text-kg">{options.adults}</span>
                    <button
                      type="button"
                      onClick={() => handleOption("adults", "i")}
                    >
                      <Plus className="w-4 text-nav_btn_text" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Children</span>
                  <div className="border border-black rounded-sm p-2 flex gap-6">
                    <button
                      type="button"
                      disabled={options.children <= 0}
                      onClick={() => handleOption("children", "d")}
                    >
                      <Minus className="w-4 text-nav_btn_text" />
                    </button>
                    <span className="text-kg">{options.children}</span>
                    <button
                      type="button"
                      onClick={() => handleOption("children", "i")}
                    >
                      <Plus className="w-4 text-nav_btn_text" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Rooms</span>
                  <div className="border border-black rounded-sm p-2 flex gap-6">
                    <button
                      type="button"
                      disabled={options.rooms <= 1}
                      onClick={() => handleOption("rooms", "d")}
                    >
                      <Minus className="w-4 text-nav_btn_text" />
                    </button>
                    <span className="text-kg">{options.rooms}</span>
                    <button
                      type="button"
                      onClick={() => handleOption("rooms", "i")}
                    >
                      <Plus className="w-4 text-nav_btn_text" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 flex justify-between items-center">
              <span className="text-sm">Traveling with pets?</span>
              <Switch />
            </div>
            <Button
              variant={"ghost"}
              className="w-full text-nav_btn_text border border-nav_btn_text mt-4"
            >
              Done
            </Button>
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <Button
          type="submit"
          id="search-btn"
          className="flex-none w-24 px-4 py-3 h-full bg-nav_btn_text text-white text-xl font-semibold rounded-sm hover:bg-blue-700 transition-colors"
        >
          Search
        </Button>
      </form>
    </div>
  );
}

export default SearchBar;
