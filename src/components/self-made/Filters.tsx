import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Slider } from "../ui/slider";

const FilterSection = ({ title, items, showAll, expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const displayedItems = isExpanded ? items : items.slice(0, 5);

  return (
    <div className="mb-4">
      <h3 className="font-bold text-sm mb-2 text-gray-900">{title}</h3>
      {displayedItems.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2 h-4 w-4 border-gray-300 rounded"
          />
          <span className="flex-grow text-sm text-gray-700">{item.label}</span>
          <span className="text-gray-500 text-sm">{item.count}</span>
        </div>
      ))}
      {showAll && items.length > 5 && (
        <button
          className="text-blue-600 text-sm font-semibold"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : `Show all ${showAll}`}{" "}
          {isExpanded ? "▲" : "▼"}
        </button>
      )}
    </div>
  );
};

const CounterInput = ({ label }) => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-gray-700">{label}</span>
      <div className="flex items-center border rounded">
        <button
          className="px-2 py-1 text-blue-600"
          onClick={() => setCount(Math.max(0, count - 1))}
        >
          <Minus size={16} />
        </button>
        <span className="px-3 py-1 border-l border-r text-sm">{count}</span>
        <button
          className="px-2 py-1 text-blue-600"
          onClick={() => setCount(count + 1)}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

const BookingSidebarFilter = () => {
  return (
    <div className="w-64 p-4 bg-white shadow-md">
      <h2 className="font-bold text-lg mb-4 text-gray-900">Filter by:</h2>

      <div className="mb-4">
        <h3 className="font-bold text-sm mb-2 text-gray-900">
          Your budget (per night)
        </h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-700">₪ 150</span>
          <span className="text-sm text-gray-700">₪ 2,000+</span>
        </div>
        <Slider className="w-full" />
      </div>

      <div className="mb-4">
        <h3 className="font-bold text-sm mb-2 text-gray-900">
          Bedrooms and bathrooms
        </h3>
        <CounterInput label="Bedrooms" />
        <CounterInput label="Bathrooms" />
      </div>

      <FilterSection
        title="Popular filters"
        items={[
          { label: "Hotels", count: 11 },
          { label: "Very good: 8+", count: 30 },
          { label: "Breakfast included", count: 10 },
          { label: "Free cancellation", count: 12 },
          { label: "Swimming Pool", count: 15 },
          { label: "Beachfront", count: 19 },
          { label: "Parking", count: 37 },
          { label: "No prepayment", count: 14 },
        ]}
      />

      <FilterSection
        title="Online payment"
        items={[{ label: "Accepts online payments", count: 23 }]}
      />

      <FilterSection
        title="Brands"
        items={[
          { label: "Fattal Hotels", count: 3 },
          { label: "Isrotel Hotels & Resorts", count: 2 },
          { label: "Prima Hotels Israel", count: 1 },
          { label: "The Setai, Herbert Samuel & Orchid Hotels", count: 1 },
          { label: "AFI Hotels", count: 1 },
        ]}
      />

      <FilterSection
        title="Property accessibility"
        items={[
          { label: "Toilet with grab rails", count: 2 },
          { label: "Higher level toilet", count: 2 },
          { label: "Visual aids: Tactile signs", count: 2 },
          { label: "Auditory guidance", count: 2 },
        ]}
      />

      <FilterSection
        title="Room accessibility"
        items={[
          { label: "Entire unit located on ground floor", count: 13 },
          { label: "Upper floors accessible by elevator", count: 2 },
          { label: "Entire unit wheelchair accessible", count: 2 },
          { label: "Toilet with grab rails", count: 1 },
          { label: "Adapted bath", count: 1 },
          { label: "Roll-in shower", count: 2 },
          { label: "Walk-in shower", count: 5 },
          { label: "Raised toilet", count: 1 },
        ]}
      />

      <FilterSection
        title="Meals"
        items={[
          { label: "Self catering", count: 28 },
          { label: "Breakfast included", count: 10 },
          { label: "All meals included", count: 2 },
          { label: "All-inclusive", count: 1 },
          { label: "Breakfast & dinner included", count: 8 },
        ]}
      />

      <FilterSection
        title="Facilities"
        items={[
          { label: "Parking", count: 37 },
          { label: "Free WiFi", count: 37 },
          { label: "Restaurant", count: 13 },
          { label: "Pets allowed", count: 9 },
          { label: "Room service", count: 11 },
        ]}
        showAll={14}
      />

      <FilterSection
        title="Property type"
        items={[
          { label: "Entire homes & apartments", count: 19 },
          { label: "Apartments", count: 18 },
          { label: "Hotels", count: 11 },
          { label: "Lodges", count: 6 },
          { label: "Guest houses", count: 4 },
        ]}
        showAll={8}
      />

      <FilterSection
        title="Guest review score"
        items={[
          { label: "Superb: 9+", count: 9 },
          { label: "Very good: 8+", count: 30 },
          { label: "Good: 7+", count: 36 },
          { label: "Pleasant: 6+", count: 39 },
        ]}
      />

      <FilterSection
        title="Room facilities"
        items={[
          { label: "Air conditioning", count: 38 },
          { label: "Private bathroom", count: 33 },
          { label: "Private pool", count: 3 },
          { label: "Sea view", count: 21 },
          { label: "Balcony", count: 30 },
        ]}
        showAll={25}
      />

      <FilterSection
        title="Property rating"
        items={[
          { label: "3 stars", count: 21 },
          { label: "4 stars", count: 1 },
          { label: "5 stars", count: 1 },
        ]}
      />

      <FilterSection
        title="Beach access"
        items={[{ label: "Beachfront", count: 19 }]}
      />

      <FilterSection
        title="Reservation policy"
        items={[
          { label: "Free cancellation", count: 12 },
          { label: "No prepayment", count: 14 },
        ]}
      />

      <FilterSection
        title="Fun things to do"
        items={[
          { label: "Beach", count: 22 },
          { label: "Massage", count: 18 },
          { label: "Hiking", count: 13 },
          { label: "Spa and wellness centre", count: 11 },
          { label: "Children's playground", count: 11 },
        ]}
        showAll={25}
      />

      <FilterSection
        title="Bed preference"
        items={[
          { label: "Twin beds", count: 16 },
          { label: "Double bed", count: 38 },
        ]}
      />

      <FilterSection
        title="City"
        items={[
          { label: "Neve Zohar", count: 19 },
          { label: "Ein Bokek", count: 8 },
          { label: "Ein Gedi", count: 4 },
          { label: "Ovnat", count: 4 },
          { label: "Ne'ot HaKikar", count: 2 },
        ]}
        showAll={7}
      />
    </div>
  );
};

export default BookingSidebarFilter;
