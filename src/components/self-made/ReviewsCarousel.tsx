import { FC, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface Review {
  text: string;
  userId: string;
}

interface ReviewsCarouselProps {
  reviews: Review[];
}

const ReviewsCarousel: FC<ReviewsCarouselProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, reviews.length - 3) : prevIndex - 3
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= reviews.length ? 0 : prevIndex + 3
    );
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="relative flex items-center">
        <button onClick={handlePrev} className="p-2">
          <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
        <div className="flex space-x-4">
          {reviews
            .slice(currentIndex, currentIndex + 3)
            .map((review, index) => (
              <div
                key={index}
                className="w-80 p-4 bg-white shadow-md rounded-md"
              >
                <div className="mb-2">
                  <p className="text-gray-700">{review.text}</p>
                </div>
                <a href="#" className="text-blue-500 mt-2 block">
                  Read more
                </a>
              </div>
            ))}
        </div>
        <button onClick={handleNext} className="p-2">
          <ChevronRightIcon className="w-6 h-6 text-gray-700" />
        </button>
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
        Read all reviews
      </button>
    </div>
  );
};

export default ReviewsCarousel;
