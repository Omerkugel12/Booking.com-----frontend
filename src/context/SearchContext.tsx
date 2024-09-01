import { useSessionStorage } from "@uidotdev/usehooks";
import React, { createContext, useContext, ReactNode } from "react";
import { DateRange } from "react-day-picker";

export interface Options {
  adults: number;
  children: number;
  rooms: number;
}

interface RecentSearch {
  destination: string;
  startDate?: string;
  endDate?: string;
  guests: Options;
  imageUrl: string;
}

interface SearchContextType {
  destination1: string;
  setDestination1: (destination: string) => void;
  date1: DateRange | undefined;
  setDate1: (date: DateRange | undefined) => void;
  options1: Options;
  setOptions1: React.Dispatch<React.SetStateAction<Options>>;
  saveRecentSearch: (
    destination: string,
    startDate?: string,
    endDate?: string,
    guests?: Options,
    imageUrl?: string
  ) => void;
  recentSearches: RecentSearch[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [destination1, setDestination1] = useSessionStorage(
    "destination_context",
    ""
  );

  const [date1, setDate1] = useSessionStorage<DateRange | undefined>(
    "date_context",
    { from: new Date(), to: new Date() }
  );

  const [options1, setOptions1] = useSessionStorage<Options>("auth_email", {
    adults: 1,
    children: 0,
    rooms: 1,
  });

  const [recentSearches, setRecentSearches] = useSessionStorage<RecentSearch[]>(
    "recentSearches",
    []
  );

  const saveRecentSearch = (
    destination: string,
    startDate?: string,
    endDate?: string,
    guests?: Options,
    imageUrl = ""
  ) => {
    const newSearch = {
      destination,
      startDate: startDate || "",
      endDate: endDate || "",
      guests: guests || { adults: 1, children: 0, rooms: 1 },
      imageUrl,
    };

    const isDuplicate = recentSearches.some(
      (search) =>
        search.destination === newSearch.destination &&
        search.startDate === newSearch.startDate &&
        search.endDate === newSearch.endDate &&
        JSON.stringify(search.guests) === JSON.stringify(newSearch.guests)
    );

    if (!isDuplicate) {
      const updatedSearches = [newSearch, ...recentSearches].slice(0, 5);
      setRecentSearches(updatedSearches);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        destination1,
        setDestination1,
        date1,
        setDate1,
        options1,
        setOptions1,
        saveRecentSearch,
        recentSearches,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
