// src/contexts/SearchContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { DateRange } from "react-day-picker";

interface Options {
  adults: number;
  children: number;
  rooms: number;
}

interface SearchContextType {
  destination1: string;
  setDestination1: (destination: string) => void;
  date1: DateRange | undefined;
  setDate1: (date: DateRange | undefined) => void;
  options1: Options;
  setOptions1: React.Dispatch<React.SetStateAction<Options>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [destination1, setDestination1] = useState("");
  const [date1, setDate1] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const [options1, setOptions1] = useState<Options>({
    adults: 1,
    children: 0,
    rooms: 1,
  });

  return (
    <SearchContext.Provider
      value={{
        destination1,
        setDestination1,
        date1,
        setDate1,
        options1,
        setOptions1,
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
