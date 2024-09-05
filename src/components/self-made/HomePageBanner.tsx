import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Assume you're using ShadCN's Button component
import bannerImage from "@/images/BannerImage.png";
function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const words = [
    "apartments",
    "villas",
    "condo hotels",
    "vacation homes",
    "cottages",
    "homes",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change word every 2 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [words.length]);

  return (
    <div className="flex items-center justify-between p-6 rounded-lg shadow-lg bg-white cursor-pointer">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-start space-y-4 text-white bg-blue-600 p-8 rounded-lg w-1/2">
        <h1 className="text-2xl font-semibold">omer, find</h1>
        <h2 className="text-3xl font-bold capitalize">{words[currentIndex]}</h2>
        <h1 className="text-2xl font-semibold">for your next trip</h1>
        <Button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full hover:bg-gray-200">
          Discover homes
        </Button>
      </div>

      {/* Right Section (Image or Illustration) */}
      <div className="w-1/2">
        {/* Replace this with your SVG or image */}
        <img src={bannerImage} alt="Illustration" className="w-full" />
      </div>
    </div>
  );
}

export default Banner;
