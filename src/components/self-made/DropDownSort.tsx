import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownUp, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function DropDownSort() {
  const [currentSort, setCurrentSort] = useState("Our top picks");
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOptions = [
    "Our top picks",
    "Homes & apartments first",
    "Price (lowest first)",
    "Price (highest first)",
    "Best reviewed and lowest price",
    "Property rating (high to low)",
    "Property rating (low to high)",
    "Property rating and price",
    "Top reviewed",
    "Genius discounts first",
    "Distance (low to high)",
    "Distance (high to low)",
  ];

  const handleSortChange = (option: string) => {
    let paramValue = "";
    switch (option) {
      case "Price (lowest first)":
        paramValue = "price";
        break;
      case "Price (highest first)":
        paramValue = "price_desc";
        break;
      case "Property rating (high to low)":
        paramValue = "rating";
        break;
      case "Property rating (low to high)":
        paramValue = "rating_desc";
        break;
      case "Distance (low to high)":
        paramValue = "distance";
        break;
      case "Distance (high to low)":
        paramValue = "distance_desc";
        break;
      default:
        paramValue = option;
        break;
    }
    const newParams = new URLSearchParams(searchParams.toString());
    if (paramValue) {
      newParams.set("sortBy", paramValue);
    } else {
      newParams.delete("sortBy");
    }
    setSearchParams(newParams);
    setCurrentSort(option);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer text-sm font-medium flex items-center gap-2 rounded-full py-[7px] border border-gray-400 px-3 hover:bg-gray-100 w-fit">
        <ArrowDownUp size={20} strokeWidth={1.25} /> Sort by: {currentSort}{" "}
        <ChevronsUpDown size={20} strokeWidth={1.25} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 shadow-lg bg-white border border-gray-300 rounded-md">
        {sortOptions.map((option, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => handleSortChange(option)}
            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
              currentSort === option ? "font-semibold bg-blue-50" : ""
            }`}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDownSort;
