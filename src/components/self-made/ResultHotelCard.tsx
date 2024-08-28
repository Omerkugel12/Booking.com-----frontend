import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/self-made/card";
import { HotelResult } from "../../models/Hotel.model";
import { Button } from "../ui/button";

interface ResultHotelCardProps {
  hotel: HotelResult;
}

function ResultHotelCard({ hotel }: ResultHotelCardProps) {
  function ratingToText(rating: number): string {
    if (rating === 10) {
      return "Excellent";
    } else if (rating >= 8 && rating < 10) {
      return "Very Good";
    } else if (rating >= 6 && rating < 8) {
      return "Good";
    } else if (rating >= 4 && rating < 6) {
      return "Average";
    } else if (rating >= 2 && rating < 4) {
      return "Poor";
    } else {
      return "Very Poor";
    }
  }

  return (
    <Card className="flex mt-2 w-full border border-gray-300 rounded-lg shadow-md">
      <CardHeader className="w-1/3">
        <img
          src={hotel.image}
          alt={`Image of ${hotel.name}`}
          className="w-full h-48 object-cover rounded-l-lg"
        />
      </CardHeader>
      <CardContent className="w-2/3 p-4">
        <div className="flex justify-between items-center mt-2">
          <div>
            <h1 className="text-xl font-bold text-blue-600 cursor-pointer hover:text-black">
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

          <div className="flex gap-2">
            <div className="flex items-center space-x-2">
              <div className="flex flex-col items-end">
                <p className="text-lg font-bold text-gray-900">
                  {ratingToText(hotel.avgRating)}
                </p>
                <p className="text-xs text-gray-500">
                  {hotel.reviews?.length || 0} reviews
                </p>
                <p>Location 9.6</p>
              </div>
            </div>
            <div>
              <p className="bg-blue-900 text-white text-lg font-bold py-1 px-2 rounded">
                {hotel.avgRating}
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-black font-bold mt-2">
          {hotel.type || "Standard Room"}
        </p>
        {hotel.freeCancellation && (
          <div className="text-green-600 text-sm mt-2">✓ Free cancellation</div>
        )}
        {hotel.prepayment && (
          <div className="text-green-600 text-sm mt-1">
            ✓ No prepayment needed - pay at the property
          </div>
        )}

        <div className="flex items-end mt-4">
          <div className="text-right">
            <p className="text-sm text-gray-500 line-through">
              ₪{hotel.totalPrice + 500} {/* Example of a discounted price */}
            </p>
            <p className="text-xl font-bold text-gray-900">
              ₪{hotel.totalPrice}
            </p>
            <p className="text-xs text-gray-500">Includes taxes and fees</p>
            <Button className="bg-blue-600 text-white text-sm font-medium py-2 px-4 mt-2 rounded">
              See availability
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ResultHotelCard;
