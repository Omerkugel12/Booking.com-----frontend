import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HotelDetails, Review } from "@/models/Hotel.model";
import { getScoreLetter } from "@/pages/HotelDetailsPage";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddReviewForm from "./AddReviewForm";
import { useState } from "react";

interface PropsTypes {
  hotel: HotelDetails;
}

export function getRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}

export function getNameByFirstLetter(letter: string) {
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
function ReviewModal({ hotel }: PropsTypes) {
  const [reviews, setReviews] = useState<Review[]>(hotel.reviews);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

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

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <Button
                variant="ghost"
                className="border border-nav_btn_text text-nav_btn_text rounded-sm"
              >
                Write a review
              </Button>
            </DialogTrigger>
            <AddReviewForm
              hotel={hotel}
              setReviews={setReviews}
              setIsDialogOpen={setIsDialogOpen}
            />
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
          {reviews.map((review, i) => {
            const firstLetter = getRandomLetter().toUpperCase();
            const username = getNameByFirstLetter(firstLetter);

            const avgRatingPerReview =
              (review.cleanliness +
                review.comfort +
                review.facilities +
                review.freeWifi +
                review.location +
                review.staff +
                review.valueForMoney) /
              7;

            return (
              <div
                key={i}
                className="py-4 border-b flex justify-between items-start"
              >
                <div className="flex gap-10">
                  <div className="flex gap-2">
                    <Avatar>
                      <AvatarFallback className="bg-green text-white text-sm font-bold">
                        {review.username !== null
                          ? review.username.charAt(0).toUpperCase()
                          : firstLetter.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-bold">
                        <p>
                          {review.username !== null
                            ? review.username
                            : username}
                        </p>
                      </p>
                      <p className="text-gray-600 text-[0.7rem]">Israel</p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[0.7rem] text-gray-500">{`Reviewd: ${review.date}`}</p>
                    <p className="text-sm">{review.text}</p>
                  </div>
                </div>
                <div className="bg-blue_1 p-1 rounded-tl-md rounded-tr-md rounded-br-md flex items-center justify-center">
                  <p className="text-md font-semibold text-white">
                    {avgRatingPerReview.toFixed(1)}
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
