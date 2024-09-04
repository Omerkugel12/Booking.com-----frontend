import { HotelDetails } from "@/models/Hotel.model";
import { getScoreLetter } from "@/pages/HotelDetailsPage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameByFirstLetter, getRandomLetter } from "./ReviewModal";

interface PropsTypes {
  hotel: HotelDetails;
}

function GuestRevies({ hotel }: PropsTypes) {
  return (
    <div className="">
      <h3 className="text-2xl font-bold mb-4">Guest reviews</h3>

      <div className="flex items-center gap-2 my-6">
        <div className="bg-blue_1 p-1 rounded-tl-md rounded-tr-md rounded-br-md">
          <p className="text-md font-bold text-white">
            {hotel?.avgRating.toFixed(1)}
          </p>
        </div>
        <span className="text-md font-semibold text-gray-600">
          <span className="text-black">{getScoreLetter(hotel.avgRating)}</span>·{" "}
          {hotel.reviews.length} reviews
        </span>
        <a href="#" className="text-blue-600 text-sm ml-4">
          Read all reviews
        </a>
      </div>

      <div>
        <h4 className="text-md font-bold mb-3">Categories:</h4>
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

      <div>
        <h1 className="text-md font-bold mt-6">Guests who stayed here loved</h1>
        <Carousel className="w-full">
          <CarouselContent className="">
            {hotel.reviews.map((review, i) => {
              const firstLetter = getRandomLetter().toUpperCase();
              const username = getNameByFirstLetter(firstLetter);

              return (
                <CarouselItem key={i} className=" md:basis-1/2 lg:basis-1/3">
                  <div className="p-5 border rounded-lg">
                    <div className="flex items-center text-sm mb-4">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-green text-white text-sm font-bold">
                          {review.username !== null
                            ? review.username.charAt(0)
                            : firstLetter}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <span className="text-sm font-bold ml-2">
                          {review.username !== null
                            ? review.username
                            : username}
                        </span>
                        <span className="ml-2 text-gray-500 text-[0.7rem]">
                          Israel
                        </span>
                      </div>
                    </div>
                    <p className="text-[0.8rem]">"{review.text}"</p>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}

export default GuestRevies;
