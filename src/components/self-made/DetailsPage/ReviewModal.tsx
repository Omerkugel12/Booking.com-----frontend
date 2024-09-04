import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HotelDetails } from "@/models/Hotel.model";
import { getScoreLetter } from "@/pages/HotelDetailsPage";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddReviewForm from "./AddReviewForm";

interface PropsTypes {
  hotel: HotelDetails;
}

function ReviewModal({ hotel }: PropsTypes) {
  function getRandomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  }

  function getNameByFirstLetter(letter: string) {
    const namesByAlphabet: Record<string, string> = {
      A: "Alice",
      B: "Brian",
      C: "Charlotte",
      D: "David",
      E: "Emma",
      F: "Frank",
      G: "Grace",
      H: "Henry",
      I: "Isabella",
      J: "James",
      K: "Katherine",
      L: "Liam",
      M: "Megan",
      N: "Nathan",
      O: "Olivia",
      P: "Paul",
      Q: "Quinn",
      R: "Rachel",
      S: "Samuel",
      T: "Thomas",
      U: "Ursula",
      V: "Victor",
      W: "William",
      X: "Xander",
      Y: "Yasmine",
      Z: "Zachary",
    };

    const firstLetter = letter.toUpperCase();

    if (namesByAlphabet[firstLetter]) {
      return namesByAlphabet[firstLetter];
    } else {
      return getNameByFirstLetter(getRandomLetter());
    }
  }

  function getRandomDateFormatted() {
    const currentDate = new Date();
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(currentDate.getFullYear() - 2);
    const randomTimestamp = Math.floor(
      Math.random() * (currentDate.getTime() - twoYearsAgo.getTime()) +
        twoYearsAgo.getTime()
    );
    const randomDate = new Date(randomTimestamp);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = randomDate.getDate();
    const month = monthNames[randomDate.getMonth()];
    const year = randomDate.getFullYear();
    return `${month} ${day}, ${year}`;
  }
  return (
    <div className="relative">
      <h1 className="text-xl font-bold">{`Guest reviews for ${hotel.name}`}</h1>
      <div className="mt-4">
        <div className="flex justify-between border-b py-6">
          <div className="flex gap-2 items-center">
            <div className="bg-blue_1 p-1 rounded-tl-md rounded-tr-md rounded-br-md flex items-center justify-center">
              <p className="text-md font-semibold text-white">
                {hotel?.avgRating.toFixed(1)}
              </p>
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-sm font-semibold">
                {getScoreLetter(hotel.avgRating)}
              </p>
              <p className="text-[0.7rem]">{hotel.reviews.length} reviews</p>
            </div>
            <p className="ml-3 text-sm text-green">
              We aim for 100% real reviews
            </p>
          </div>

          <Dialog>
            <DialogTrigger>
              <Button
                variant="ghost"
                className="border border-nav_btn_text text-nav_btn_text rounded-sm"
              >
                Write a review
              </Button>
            </DialogTrigger>
            <AddReviewForm hotel={hotel} />
          </Dialog>
        </div>
        <div className="flex justify-between border-b py-6">
          <div className="w-full">
            <h4 className="text-md font-bold mb-3">Categories:</h4>
            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
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
                    style={{
                      width: `${hotel.cleanliness * 10}%`,
                    }}
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
                    style={{
                      width: `${hotel.cleanliness * 10}%`,
                    }}
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
                    style={{
                      width: `${hotel.valueForMoney * 10}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-6">
          <h4 className="text-md font-bold">Guest reviews</h4>
          {hotel.reviews.map((review, i) => {
            const userFirstLetter = getRandomLetter();
            const userName = getNameByFirstLetter(userFirstLetter);
            const reviwedDate = getRandomDateFormatted();
            return (
              <div
                key={i}
                className="py-4 border-b flex justify-between items-start"
              >
                <div className="flex gap-4">
                  <div className="flex gap-2">
                    <Avatar>
                      <AvatarFallback className="bg-green text-white text-sm font-bold">
                        {userFirstLetter.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-bold">
                        <p>{userName}</p>
                      </p>
                      <p className="text-gray-600 text-[0.7rem]">Israel</p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[0.7rem] text-gray-500">{`Reviewd: ${reviwedDate}`}</p>
                    <p className="text-sm">{review.text}</p>
                  </div>
                </div>
                <div className="bg-blue_1 p-1 rounded-tl-md rounded-tr-md rounded-br-md flex items-center justify-center">
                  <p className="text-md font-semibold text-white">
                    {hotel?.avgRating.toFixed(1)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
