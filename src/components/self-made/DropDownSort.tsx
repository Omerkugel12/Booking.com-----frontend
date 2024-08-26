import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownUp, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

function DropDownSort() {
  const [currentSort, setCurrentSort] = useState("Our top picks");

  function sortUi(value: string) {
    setCurrentSort(value);
  }

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
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer text-sm font-medium flex items-center gap-2 rounded-full py-[7px] border border-gray-400  px-3 hover:bg-gray-100 w-fit">
        <ArrowDownUp size={20} strokeWidth={1.25} /> Sort by: {currentSort}{" "}
        <ChevronsUpDown size={20} strokeWidth={1.25} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 shadow-lg bg-white border border-gray-300 rounded-md">
        {sortOptions.map((option, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => {
              sortUi(option);
            }}
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
