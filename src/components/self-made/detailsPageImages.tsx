import { useState } from "react";
import { X } from "lucide-react";

interface HotelImageGridProps {
  imageURLs: string[]; // Define the type of imageURLs as an array of strings
}

const HotelImageGrid: React.FC<HotelImageGridProps> = ({ imageURLs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateImage = (direction: "prev" | "next") => {
    setSelectedImageIndex((prevIndex) => {
      if (direction === "prev") {
        return prevIndex > 0 ? prevIndex - 1 : imageURLs.length - 1;
      } else {
        return prevIndex < imageURLs.length - 1 ? prevIndex + 1 : 0;
      }
    });
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-4 gap-1 h-96">
        <img
          src={imageURLs[0]}
          alt="Hotel 1"
          className="col-span-2 row-span-2 w-full h-full object-cover cursor-pointer"
          onClick={() => openModal(0)}
        />
        <img
          src={imageURLs[1]}
          alt="Hotel 2"
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => openModal(1)}
        />
        <img
          src={imageURLs[2]}
          alt="Hotel 3"
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => openModal(2)}
        />
        <img
          src={imageURLs[3]}
          alt="Hotel 4"
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => openModal(3)}
        />
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={() => openModal(4)}
        >
          <img
            src={imageURLs[4]}
            alt="Hotel 5"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              +{imageURLs.length - 5} photos
            </span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="max-w-4xl w-full">
            <img
              src={imageURLs[selectedImageIndex]}
              alt={`Hotel ${selectedImageIndex + 1}`}
              className="w-full h-auto"
            />
            <div className="absolute top-4 right-4">
              <button onClick={closeModal} className="text-white">
                <X size={24} />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
              <button
                onClick={() => navigateImage("prev")}
                className="bg-white text-black px-4 py-2 rounded"
              >
                Previous
              </button>
              <button
                onClick={() => navigateImage("next")}
                className="bg-white text-black px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelImageGrid;
