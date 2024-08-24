import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/self-made/card";
import { Hotel } from "../../models/Hotel.model";
import { Button } from "../ui/button";

interface ResultHotelCardProps {
  hotel: Hotel;
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
          src={hotel.photos[0]}
          alt={`Image of ${hotel.name}`}
          className="w-60 h-48 object-cover rounded-l-lg"
        />
      </CardHeader>
      <CardContent className="w-2/3 flex flex-col justify-between p-4">
        <div>
          <CardTitle className="text-lg font-semibold text-blue-900">
            {hotel.title}
          </CardTitle>
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-sm text-blue-700 font-medium underline">
              {hotel.city}
            </p>
            <p className="text-sm text-blue-700 font-medium">
              <a href="#" className="underline">
                Show on map
              </a>
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-2 border border-blue-300 rounded w-fit p-0.5">
            Recommended for your group
          </p>
          <p className="text-sm text-gray-700 mt-2">
            {hotel.room ? hotel.room.desc : "Room description not available"}
          </p>
          {hotel.freeCancelation && (
            <div className="text-green-600 text-sm mt-2">
              ✓ Free cancellation
            </div>
          )}
          {hotel.prepayment && (
            <div className="text-green-600 text-sm mt-1">
              ✓ No prepayment needed - pay at the property
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="w-2/3 flex flex-col items-end  p-4">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <div className=" flex flex-col items-end">
              <p className="text-lg font-bold text-gray-900">
                {ratingToText(hotel.rating)}
              </p>
              <p className="text-xs text-gray-500">
                {hotel.reviews?.length || 0} reviews
              </p>
            </div>
            <div>
              <p className="bg-blue-900 text-white text-lg font-bold py-1 px-2 rounded">
                {hotel.rating}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-end mt-4">
          <div className="text-right">
            <p className="text-xs text-gray-500">
              {hotel?.reservation?.nights || 0} nights,{" "}
              {hotel?.reservation?.people || 0} adults
            </p>
            <p className="text-xl font-bold text-gray-900">
              ₪{hotel.cheapestPrice}
            </p>
            <p className="text-xs text-gray-500">
              Additional charges may apply
            </p>
            <Button className="bg-blue-600 text-white text-sm font-medium py-2 px-4 mt-2 rounded">
              See availability
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ResultHotelCard;
