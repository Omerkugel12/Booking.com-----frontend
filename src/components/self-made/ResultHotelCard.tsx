import { Card, CardContent, CardHeader } from "@/components/self-made/card";
import { HotelResult } from "../../models/Hotel.model";
import { Button } from "../ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";

interface ResultHotelCardProps {
  hotel: HotelResult;
}

function ResultHotelCard({ hotel }: ResultHotelCardProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  // Function to handle navigation to the hotel details page and saving to localStorage

  const handleNavigation = () => {
    const propertyData = {
      id: hotel.id,
      imageSrc: hotel.image,
      title: hotel.name,
      location: hotel.city,
      rating: hotel.avgRating.toString(),
      reviewInfo: `${getScoreLetter(hotel.avgRating)} · ${
        hotel.reviews.length
      } reviews`,
    };

    const storedProperties = JSON.parse(
      localStorage.getItem("savedProperties") || "[]"
    );

    // Avoid duplicates by checking if the property already exists in storage
    if (
      !storedProperties.some(
        (storedProperty: any) => storedProperty.title === hotel.name
      )
    ) {
      storedProperties.push(propertyData);
      localStorage.setItem("savedProperties", JSON.stringify(storedProperties));
    }

    navigate(`/hotel/${hotel.id}?startDate=${startDate}&endDate=${endDate}`); // Assuming the URL pattern is /hotels/:id
  };

  // Function to convert numeric rating to descriptive string
  const getScoreLetter = (rating: number): string => {
    if (rating < 7) return "Pleasant";
    else if (rating >= 7 && rating < 8) return "Good";
    else if (rating >= 8 && rating <= 8.5) return "Very Good";
    else if (rating > 8.5 && rating <= 9) return "Excellent";
    else if (rating > 9 && rating <= 10) return "Wonderful";
    return "";
  };

  return (
    <Card className="flex mt-2 w-full border border-gray-300 rounded-lg shadow-md">
      <CardHeader
        className="w-1/3"
        onClick={handleNavigation}
        style={{ cursor: "pointer" }}
      >
        <img
          src={hotel.image}
          alt={`Image of ${hotel.name}`}
          className="w-full h-48 object-cover rounded-l-lg"
        />
      </CardHeader>
      <CardContent className="w-2/3 p-4">
        <div className="flex justify-between gap-8 mt-2">
          <div>
            <h1
              className="text-xl font-bold text-blue-600 cursor-pointer hover:text-black"
              onClick={handleNavigation}
            >
              {hotel.name}
            </h1>
            <div className="flex gap-2">
              <p className="text-xs text-blue-600 font-medium underline cursor-pointer">
                {hotel.city}
              </p>
              <p className="text-xs text-blue-600 font-medium cursor-pointer">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Show on map
                </a>
              </p>
            </div>
            <p className="text-xs text-black font-[400] mt-2">
              {hotel.distance} km from center
            </p>
          </div>
          <div>
            <div id="rightCon" className="flex gap-2 h-fit">
              <div className="flex space-x-2">
                <div className="flex flex-col items-end">
                  <p className="text-[16px] font-semibold text-gray-900">
                    {getScoreLetter(hotel.avgRating)}
                  </p>
                  <p className="text-xs text-gray-500 w-full text-nowrap">
                    {hotel?.reviews.length || 0} reviews
                  </p>
                </div>
              </div>

              <div
                id="acd"
                className="flex justify-center w-10 h-8 bg-blue-900 rounded"
              >
                <p className=" text-white text-[16px] font-bold">
                  {hotel.avgRating}
                </p>
              </div>
            </div>
            {hotel.location.toFixed(1) > hotel.avgRating.toFixed(1) ? (
              <p className=" text-end flex-nowrap w-fit text-sm text-green font-bold ">
                Location {hotel.location.toFixed(1)}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-xs text-black font-bold mt-2">
              {hotel.type || "Standard Room"}
            </p>
            {hotel.freeCancellation ? (
              <div className=" text-green font-bold text-sm mt-2">
                ✓ Free cancellation
              </div>
            ) : (
              ""
            )}
            {hotel.prepayment ? (
              <div className=" text-green font-bold text-sm mt-1">
                ✓ No prepayment needed - pay at the property
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-end mt-4">
            <div className="text-right">
              <p className="text-sm text-gray-500 line-through">
                ${hotel.price + 500} {/* Example of a discounted price */}
              </p>
              <p className="text-xl font-bold text-gray-900">${hotel.price}</p>
              <p className="text-xs text-gray-500">Includes taxes and fees</p>
              <Button
                className="bg-blue-600 text-white text-sm font-medium py-2 px-4 mt-2 rounded"
                onClick={handleNavigation}
              >
                See availability
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ResultHotelCard;
