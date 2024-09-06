import React, { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import BudgetSlider from "../ui/budgetSlider";
import { useSearchParams } from "react-router-dom";

// Define types
type Item = {
  label: string;
  count?: number | string;
};

type FilterSectionProps = {
  title: string;
  items: Item[];
  showAll?: number;
  expanded?: boolean;
  type?: string;
};

// Simulated backend function for fetching item count
const fetchItemCount = (): Promise<number | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (Math.random() > 0.8) {
        resolve(null);
      } else {
        resolve(Math.floor(Math.random() * 50) + 1);
      }
    }, 100);
  });
};

// FilterSection component
const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  items,
  showAll,
  expanded = false,
  type,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [itemsWithCount, setItemsWithCount] = useState<Item[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchCounts = async () => {
      const updatedItems = await Promise.all(
        items.map(async (item) => {
          const count = await fetchItemCount();
          return { ...item, count: count === null ? "0" : count };
        })
      );
      setItemsWithCount(updatedItems);
    };

    fetchCounts();
  }, [items]);

  const handleFilterChange = (label: string, type?: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    // Handling filter logic based on type
    if (type === "meals") {
      const existingMeals = currentParams.get("meals");
      const newMeal = label;

      if (existingMeals) {
        const mealsArray = existingMeals.split(",");
        if (mealsArray.includes(newMeal)) {
          const updatedMeals = mealsArray.filter((meal) => meal !== newMeal);
          if (updatedMeals.length > 0) {
            currentParams.set("meals", updatedMeals.join(","));
          } else {
            currentParams.delete("meals");
          }
        } else {
          currentParams.set("meals", [...mealsArray, newMeal].join(","));
        }
      } else {
        currentParams.set("meals", newMeal);
      }
    } else if (type === "stars") {
      const existingRatings = currentParams.get("starRating");
      const newRating = label.replace(" stars", "");

      if (existingRatings) {
        const ratingsArray = existingRatings.split(",");
        if (ratingsArray.includes(newRating)) {
          const updatedRatings = ratingsArray.filter(
            (rating) => rating !== newRating
          );
          if (updatedRatings.length > 0) {
            currentParams.set("starRating", updatedRatings.join(","));
          } else {
            currentParams.delete("starRating");
          }
        } else {
          currentParams.set(
            "starRating",
            [...ratingsArray, newRating].join(",")
          );
        }
      } else {
        currentParams.set("starRating", newRating);
      }
    } else if (type === "facilities") {
      const existingFacilities = currentParams.get("facilities");
      const newFacility = label;

      if (existingFacilities) {
        const facilitiesArray = existingFacilities.split(",");
        if (facilitiesArray.includes(newFacility)) {
          const updatedFacilities = facilitiesArray.filter(
            (facility) => facility !== newFacility
          );
          if (updatedFacilities.length > 0) {
            currentParams.set("facilities", updatedFacilities.join(","));
          } else {
            currentParams.delete("facilities");
          }
        } else {
          currentParams.set(
            "facilities",
            [...facilitiesArray, newFacility].join(",")
          );
        }
      } else {
        currentParams.set("facilities", newFacility);
      }
    } else {
      const isActive = searchParams.get(label.replace(" ", "")) === "true";
      if (isActive) {
        currentParams.delete(label.replace(" ", ""));
      } else {
        currentParams.set(label.replace(" ", ""), "true");
      }
    }

    setSearchParams(currentParams);
  };

  const generateDummyItems = (count: number): Item[] => {
    return Array.from({ length: count }, (_, i) => ({
      label: `Item ${i + 1}`,
      count: Math.floor(Math.random() * 50) + 1,
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
            onChange={() => handleFilterChange(item.label, type)}
            checked={
              type === "stars"
                ? searchParams
                    .get("starRating")
                    ?.split(",")
                    .includes(item.label.replace(" stars", ""))
                : type === "meals"
                ? searchParams.get("meals")?.split(",").includes(item.label)
                : type === "facilities"
                ? searchParams
                    .get("facilities")
                    ?.split(",")
                    .includes(item.label)
                : searchParams.get(item.label.replace(" ", "")) === "true"
            }
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

// CounterInput component
const CounterInput: React.FC<{ label: string }> = ({ label }) => {
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(label, count.toString());
    setSearchParams(params);
  }, [count, label, searchParams, setSearchParams]);

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

// BookingSidebarFilter component
function BookingSidebarFilter () {
  return (
    <div className="p-4 bg-white rounded shadow sticky">
      <BudgetSlider />
      <FilterSection
        title="Popular filters"
        items={[
          { label: "Free cancellation" },
          { label: "No prepayment" },
          { label: "Breakfast included" },
          { label: "Pet friendly" },
          { label: "Spa facilities" },
          { label: "Family-friendly" },
        ]}
        expanded
      />

      <FilterSection
        title="Star rating"
        items={[
          { label: "1 star" },
          { label: "2 stars" },
          { label: "3 stars" },
          { label: "4 stars" },
          { label: "5 stars" },
        ]}
        type="stars"
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
        type="meals"
      />

      <FilterSection
        title="Guest rating"
        items={[
          { label: "Wonderful: 9+" },
          { label: "Very good: 8+" },
          { label: "Good: 7+" },
          { label: "Pleasant: 6+" },
        ]}
        type="guestRating"
      />

      <FilterSection
        title="Facilities"
        items={[
          { label: "Free WiFi" },
          { label: "Swimming pool" },
          { label: "Parking" },
          { label: "Fitness center" },
        ]}
        type="facilities"
      />

      <CounterInput label="Adults" />
      <CounterInput label="Children" />
      <CounterInput label="Rooms"/>
    </div>
  );
};

export default BookingSidebarFilter;
