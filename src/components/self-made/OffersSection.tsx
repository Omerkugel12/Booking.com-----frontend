import { Button } from "@/components/ui/button";
import homeImagesec from "@/images/HomePageSec.jpeg";

const OffersSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Offers</h2>
      <div className="rounded-lg shadow-lg">
        <div
          className="relative bg-cover bg-center text-white p-4 rounded-sm"
          style={{ backgroundImage: `url(${homeImagesec})` }}
        >
          <h3 className="text-xl font-bold">Seize the moment!</h3>
          <p className="text-sm mt-1">
            Save 15% or more when you book and stay before October 1, 2024
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 transition duration-300 mt-2">
            Find Getaway Deals
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OffersSection;
