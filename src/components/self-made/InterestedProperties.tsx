import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useSearch } from "@/context/SearchContext"; // Import useSearch
import { format } from "date-fns";

// Define the structure of a property
interface Property {
  imageSrc: string;
  title: string;
  location: string;
  rating: string;
  reviewInfo: string;
  id: string; // Assuming each property has a unique ID to navigate to
}

const InterestedProperties: React.FC = () => {
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const navigate = useNavigate();
  const { date1 } = useSearch(); // Destructure date1 from useSearch

  // Load saved properties from local storage on component mount
  useEffect(() => {
    const storedProperties = JSON.parse(
      localStorage.getItem("savedProperties") || "[]"
    );
    setSavedProperties(storedProperties);
  }, []);

  // Handle property card click to navigate to the details page
  const handlePropertyClick = (property: Property) => {
    const startDate = date1?.from
      ? format(new Date(date1.from), "yyyy-MM-dd")
      : undefined;
    const endDate = date1?.to
      ? format(new Date(date1.to), "yyyy-MM-dd")
      : undefined;
    console.log(property);

    navigate(`/hotel/${property.id}?startDate=${startDate}&endDate=${endDate}`);
  };

  // Handle removing a property
  // const handleRemoveProperty = (index: number) => {
  //   const updatedProperties = [...savedProperties];
  //   updatedProperties.splice(index, 1);
  //   localStorage.setItem("savedProperties", JSON.stringify(updatedProperties));
  //   setSavedProperties(updatedProperties);
  // };

  return (
    <div>
      {savedProperties.length > 0 && (
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4">
            Still interested in these properties?
          </h2>
          <Carousel>
            <div className="relative">
              <CarouselContent className="flex gap-4">
                {savedProperties.map((property, index) => (
                  <CarouselItem key={index} className="w-[300px] flex-none">
                    <div
                      className="bg-white p-4 rounded-lg shadow-lg relative cursor-pointer"
                      onClick={() => handlePropertyClick(property)}
                    >
                      <img
                        src={property.imageSrc}
                        alt={property.title}
                        className="w-full h-52 rounded-lg object-cover"
                      />
                      <div className="mt-4">
                        <h3 className="font-bold text-[16px]">
                          {property.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {property.location}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="bg-blue-900 text-white text-xs px-1 py-1 rounded-t-md rounded-r-md rounded-bl-none">
                            {property.rating}
                          </span>
                          <span className="text-xs text-gray-700">
                            {property.reviewInfo}
                          </span>
                        </div>
                      </div>
                      <button
                        className="absolute top-5 right-5 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                        // onClick={(e) => {
                        //   e.stopPropagation(); // Prevent click from navigating
                        //   handleRemoveProperty(index);
                        // }}
                      >
                        <Heart className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {savedProperties.length > 3 && (
                <>
                  <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-white shadow"
                    >
                      ←
                    </Button>
                  </CarouselPrevious>
                  <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-white shadow"
                    >
                      →
                    </Button>
                  </CarouselNext>
                </>
              )}
            </div>
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default InterestedProperties;
