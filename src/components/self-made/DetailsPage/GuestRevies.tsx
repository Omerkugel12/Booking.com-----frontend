import { HotelDetails } from "@/models/Hotel.model";

interface PropsTypes {
  hotel: HotelDetails;
}

function GuestRevies({ hotel }: PropsTypes) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-4">Guest reviews</h3>

      <div className="flex items-center gap-2 mb-4">
        <span className="bg-blue-900 text-white font-bold px-2 py-1 rounded-sm text-lg">
          {hotel.avgRating.toFixed(1)}
        </span>
        <span className="text-lg font-semibold text-gray-600">
          <span className="text-black">Very Good </span>· {hotel.reviews.length}{" "}
          reviews
        </span>
        <a href="#" className="text-blue-600 underline ml-4">
          Read all reviews
        </a>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <div className="flex justify-between pb-2">
            <p className="font-semibold">Staff</p>{" "}
            <p className="text-sm text-gray-500 mt-1">
              {hotel.cleanliness.toFixed(1)}
            </p>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-2 bg-blue-900 rounded-full"
              style={{ width: `${hotel.cleanliness * 10}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between pb-2">
            <p className="font-semibold">Cleanliness</p>{" "}
            <p className="text-sm text-gray-500 mt-1">
              {hotel.cleanliness.toFixed(1)}
            </p>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-2 bg-blue-900 rounded-full"
              style={{ width: `${hotel.cleanliness * 10}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between pb-2">
            <p className="font-semibold">Comfort</p>
            <p className="text-sm text-gray-500 mt-1">
              {hotel.comfort.toFixed(1)}
            </p>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-2 bg-blue-900 rounded-full"
              style={{ width: `${hotel.comfort * 10}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between pb-2">
            <p className="font-semibold">Free Wifi</p>
            <p className="text-sm text-gray-500 mt-1">
              {hotel.freeWifi.toFixed(1)}
            </p>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-2 bg-blue-900 rounded-full"
              style={{ width: `${hotel.freeWifi * 10}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between pb-2">
            <p className="font-semibold">Location</p>{" "}
            <p className="text-sm text-gray-500 mt-1">
              {hotel.location.toFixed(1)}
            </p>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-2 bg-blue-900 rounded-full"
              style={{ width: `${hotel.location * 10}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between pb-2">
            <p className="font-semibold">Value for money</p>
            <p className="text-sm text-gray-500 mt-1">
              {hotel.valueForMoney.toFixed(1)}
            </p>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-2 bg-blue-900 rounded-full"
              style={{ width: `${hotel.valueForMoney * 10}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-[16px] pt-4">
          Select topics to read reviews:
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Location", "Room", "Clean", "Kitchen", "Bed"].map(
            (topic, index) => (
              <button
                key={index}
                className="border border-gray-300 rounded-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-200"
              >
                + {topic}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default GuestRevies;
