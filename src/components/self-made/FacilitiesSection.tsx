import  { useState } from "react";
import { useSearchParams } from "react-router-dom";

const facilities = [
  { label: "Toilet paper" },
  { label: "Towels" },
  { label: "Bidet" },
  { label: "Bathtub or shower" },
  { label: "Slippers" },
  { label: "Private Bathroom" },
  { label: "Toilet" },
  { label: "Free toiletries" },
  { label: "Hairdryer" },
  { label: "Bathtub" },
  { label: "Shower" },
  { label: "Wardrobe or closet" },
  { label: "Alarm clock" },
  { label: "English" },
  { label: "Japanese" },
  { label: "Korean" },
  { label: "Toilet with grab rails" },
  { label: "Wheelchair accessible" },
  { label: "Upper floors accessible by elevator" },
  { label: "Convenience store on site" },
  { label: "Designated smoking area" },
  { label: "Air conditioning" },
  { label: "Smoke-free property" },
  { label: "Wake-up service" },
  { label: "Heating" },
  { label: "Soundproof" },
  { label: "Carpeted" },
  { label: "Elevator" },
  { label: "Facilities for disabled guests" },
  { label: "Non-smoking rooms" },
  { label: "Wake-up service/Alarm clock" },
  { label: "Fire extinguishers" },
  { label: "CCTV outside property" },
  { label: "CCTV in common areas" },
  { label: "Smoke alarms" },
  { label: "Security alarm" },
  { label: "Key card access" },
  { label: "24-hour security" },
  { label: "Safe" },
  { label: "Fax/Photocopying" },
  { label: "Additional charge" },
  { label: "Daily housekeeping" },
  { label: "Suit press" },
  { label: "Ironing service" },
  { label: "Dry cleaning" },
  { label: "Laundry" },
  { label: "Invoice provided" },
  { label: "ATM on site" },
  { label: "Baggage storage" },
  { label: "Currency exchange" },
  { label: "24-hour front desk" },
  { label: "Parking garage" },
  { label: "Accessible parking" },
  { label: "Wifi is available in all areas and is free of charge." },
  { label: "Kid-friendly buffet" },
  { label: "Kids' meals" },
  { label: "Restaurant" },
  { label: "Tea/Coffee maker" },
  { label: "Streaming service (like Netflix)" },
  { label: "Flat-screen TV" },
  { label: "Telephone" },
  { label: "TV" },
  { label: "Pay-per-view channels" },
  { label: "City view" },
  { label: "View" },
  { label: "Coffee machine" },
  { label: "Electric kettle" },
  { label: "Refrigerator" },
  { label: "Socket near the bed" },
  { label: "Clothes rack" },
];

const FacilitiesSection = ({
  title = "Facilities",
  type = "facilities",
  showAll = true,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedItems = isExpanded ? facilities : facilities.slice(0, 5);

  const handleFilterChange = (label:string) => {
    const currentFilters = searchParams.get(type)?.split(",") || [];
    const updatedFilters = currentFilters.includes(label)
      ? currentFilters.filter((item) => item !== label)
      : [...currentFilters, label];

    if (updatedFilters.length > 0) {
      searchParams.set(type, updatedFilters.join(","));
    } else {
      searchParams.delete(type);
    }
    setSearchParams(searchParams);
  };

  const isChecked = (label:string) => {
    return searchParams.get(type)?.split(",").includes(label) || false;
  };

  return (
    <div className="mb-4">
      <h3 className="font-bold text-sm mb-2 text-gray-900">{title}</h3>
      {displayedItems.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2 h-4 w-4 border-gray-300 rounded"
            onChange={() => handleFilterChange(item.label)}
            checked={isChecked(item.label)}
          />
          <span className="flex-grow text-sm text-gray-700">{item.label}</span>
          {/* Note: We don't have count data, so this span is empty */}
          <span className="text-gray-500 text-sm"></span>
        </div>
      ))}
      {showAll && facilities.length > 5 && (
        <button
          className="text-blue-600 text-sm font-semibold"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : `Show all ${facilities.length}`}{" "}
          {isExpanded ? "▲" : "▼"}
        </button>
      )}
    </div>
  );
};

export default FacilitiesSection;
