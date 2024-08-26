import React, { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import BudgetSlider from "../ui/budgetSlider";

// Simulated backend function
const fetchItemCount = (itemLabel) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate some items not having a count
      if (Math.random() > 0.8) {
        resolve(null);
      } else {
        resolve(Math.floor(Math.random() * 50) + 1);
      }
    }, 100); // Simulate network delay
  });
};

const FilterSection = ({ title, items, showAll, expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [itemsWithCount, setItemsWithCount] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      const updatedItems = await Promise.all(
        items.map(async (item) => {
          const count = await fetchItemCount(item.label);
          return { ...item, count: count === null ? "null" : count };
        })
      );
      setItemsWithCount(updatedItems);
    };

    fetchCounts();
  }, [items]);

  // Generate dummy items for expansion
  const generateDummyItems = (count) => {
    return Array.from({ length: count }, (_, index) => ({
      label: `Dummy ${title} ${index + 1}`,
      count: "null",
    }));
  };

  const allItems = showAll
    ? [
        ...itemsWithCount,
        ...generateDummyItems(showAll - itemsWithCount.length),
      ]
    : itemsWithCount;

  const displayedItems = isExpanded ? allItems : allItems.slice(0, 5);

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
      {showAll && allItems.length > 5 && (
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
        <BudgetSlider />
      </div>

      <FilterSection
        title="Popular filters"
        items={[
          { label: "Hotels" },
          { label: "Very good: 8+" },
          { label: "Breakfast included" },
          { label: "Free cancellation" },
          { label: "Swimming Pool" },
          { label: "Beachfront" },
          { label: "Parking" },
          { label: "No prepayment" },
        ]}
      />

      <FilterSection
        title="Meals"
        items={[
          { label: "Self catering" },
          { label: "Breakfast included" },
          { label: "All meals included" },
          { label: "All-inclusive" },
          { label: "Breakfast & dinner included" },
        ]}
      />

      <FilterSection
        title="Facilities"
        items={[
          { label: "Parking" },
          { label: "Free WiFi" },
          { label: "Restaurant" },
          { label: "Pets allowed" },
          { label: "Room service" },
        ]}
        showAll={14}
      />

      <FilterSection
        title="Property type"
        items={[
          { label: "Entire homes & apartments" },
          { label: "Apartments" },
          { label: "Hotels" },
          { label: "Lodges" },
          { label: "Guest houses" },
        ]}
        showAll={8}
      />

      <FilterSection
        title="Guest review score"
        items={[
          { label: "Superb: 9+" },
          { label: "Very good: 8+" },
          { label: "Good: 7+" },
          { label: "Pleasant: 6+" },
        ]}
      />

      <FilterSection
        title="Room facilities"
        items={[
          { label: "Air conditioning" },
          { label: "Private bathroom" },
          { label: "Private pool" },
          { label: "Sea view" },
          { label: "Balcony" },
        ]}
        showAll={25}
      />

      <FilterSection
        title="Property rating"
        items={[
          { label: "3 stars" },
          { label: "4 stars" },
          { label: "5 stars" },
        ]}
      />

      <FilterSection title="Beach access" items={[{ label: "Beachfront" }]} />

      <FilterSection
        title="Reservation policy"
        items={[{ label: "Free cancellation" }, { label: "No prepayment" }]}
      />

      <FilterSection
        title="Fun things to do"
        items={[
          { label: "Beach" },
          { label: "Massage" },
          { label: "Hiking" },
          { label: "Spa and wellness centre" },
          { label: "Children's playground" },
        ]}
        showAll={25}
      />

      <FilterSection
        title="Bed preference"
        items={[{ label: "Twin beds" }, { label: "Double bed" }]}
      />

      <FilterSection
        title="City"
        items={[
          { label: "Neve Zohar" },
          { label: "Ein Bokek" },
          { label: "Ein Gedi" },
          { label: "Ovnat" },
          { label: "Ne'ot HaKikar" },
        ]}
        showAll={7}
      />

      <div className="mb-4">
        <h3 className="font-bold text-sm mb-2 text-gray-900">
          Bedrooms and bathrooms
        </h3>
        <CounterInput label="Bedrooms" />
        <CounterInput label="Bathrooms" />
      </div>

      <FilterSection
        title="Online payment"
        items={[{ label: "Accepts online payments" }]}
      />

      <FilterSection
        title="Brands"
        items={[
          { label: "Fattal Hotels" },
          { label: "Isrotel Hotels & Resorts" },
          { label: "Prima Hotels Israel" },
          { label: "The Setai, Herbert Samuel & Orchid Hotels" },
          { label: "AFI Hotels" },
        ]}
      />

      <FilterSection
        title="Property accessibility"
        items={[
          { label: "Toilet with grab rails" },
          { label: "Higher level toilet" },
          { label: "Lower bathroom sink" },
          { label: "Visual aids: Braille" },
          { label: "Visual aids: Tactile signs" },
          { label: "Auditory guidance" },
        ]}
      />

      <FilterSection
        title="Room accessibility"
        items={[
          { label: "Entire unit located on ground floor" },
          { label: "Upper floors accessible by elevator" },
          { label: "Entire unit wheelchair accessible" },
          { label: "Toilet with grab rails" },
          { label: "Adapted bath" },
          { label: "Roll-in shower" },
          { label: "Raised toilet" },
        ]}
        showAll={15}
      />

      <FilterSection
        title="Sustainability initiatives"
        items={[
          {
            label:
              "Linens, towels and laundry washed in accordance with local guidelines",
          },
          { label: "Water cooler/dispenser" },
          { label: "Food waste policy" },
          { label: "Recycling policy" },
          { label: "No plastic" },
        ]}
        showAll={10}
      />
    </div>
  );
};

export default BookingSidebarFilter;
