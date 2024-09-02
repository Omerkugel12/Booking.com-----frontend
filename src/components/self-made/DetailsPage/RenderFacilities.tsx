import { Button } from "@/components/ui/button";
import { HotelDetails } from "@/models/Hotel.model";
import { getScoreLetter } from "@/pages/HotelDetailsPage";
import {
  ParkingCircle,
  Wifi,
  Utensils,
  Tv,
  Eye,
  Refrigerator,
  Bed,
  Globe,
  Home,
  Shield,
  Accessibility,
  Bath,
  CigaretteOff,
  Baby,
  LampDesk,
  CircleParking,
  Flower,
} from "lucide-react"; // Import the necessary icons from Lucide

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Bathroom":
      return <Bath className="mr-2 text-sm" size={"18px"} />;
    case "Parking":
      return <ParkingCircle className="mr-2 text-sm" size={"18px"} />;
    case "Internet":
      return <Wifi className="mr-2 text-sm" size={"18px"} />;
    case "Food & Drink":
      return <Utensils className="mr-2 text-sm" size={"18px"} />;
    case "Media & Technology":
      return <Tv className="mr-2 text-sm" size={"18px"} />;
    case "View":
      return <Eye className="mr-2 text-sm" />;
    case "Kitchen":
      return <Refrigerator className="mr-2 text-sm" size={"18px"} />;
    case "Room Amenities":
      return <Home className="mr-2 text-sm" size={"18px"} />;
    case "Bedroom":
      return <Bed className="mr-2 text-sm" size={"18px"} />;
    case "Languages Spoken":
      return <Globe className="mr-2 text-sm" size={"18px"} />;
    case "Accessibility":
      return <Accessibility className="mr-2 text-sm" size={"18px"} />;
    case "General":
      return <Home className="mr-2 text-sm" size={"18px"} />;
    case "Safety & security":
      return <Shield className="mr-2 text-sm" size={"18px"} />;
    default:
      return <span className="mr-2 text-sm">✓</span>; // Default icon if no match
  }
};

interface PropsTypes {
  hotel: HotelDetails;
}

const RenderFacilities = ({ hotel }: PropsTypes) => {
  // Group facilities by category
  const groupedFacilities = hotel.facilities.reduce((acc, facility) => {
    if (!acc[facility.category]) {
      acc[facility.category] = [];
    }
    acc[facility.category].push(...facility.name.split("\n"));
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div id="faciliteis" className="my-10">
      <div className="mb-8">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl font-bold">House rules</h1>
          <Button className="bg-nav_btn_text rounded-[5px] text-sm hover:bg-blue_1">
            <a href="#info&prices">See availability</a>
          </Button>
        </div>
        <p className="text-gray-600">{`${getScoreLetter(
          hotel.avgRating
        )} facilities! Review score, ${hotel.avgRating.toFixed(1)}`}</p>
      </div>
      <div className="flex flex-col gap-3 mb-8">
        <p className="text-md font-bold">Most popular facilities</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-3 text-sm items-center">
            <CigaretteOff color="#098111" size={"18px"} />
            <p>Non-smoking rooms</p>
          </div>
          <div className="flex gap-3 text-sm items-center">
            <Accessibility color="#098111" size={"18px"} />
            <p>Facilities for disabled guests</p>
          </div>
          <div className="flex gap-3 text-sm items-center">
            <Wifi color="#098111" size={"18px"} />
            <p>Free Wifi</p>
          </div>
          <div className="flex gap-3 text-sm items-center">
            <Baby color="#098111" size={"18px"} />
            <p>Family rooms</p>
          </div>
          <div className="flex gap-3 text-sm items-center">
            <LampDesk color="#098111" size={"18px"} />
            <p>24-hour front desk</p>
          </div>
          <div className="flex gap-3 text-sm items-center">
            <CigaretteOff color="#098111" size={"18px"} />
            <p>Elevator</p>
          </div>
          <div className="flex gap-3 text-sm items-center">
            <CircleParking color="#098111" size={"18px"} />
            <p>Free parking</p>
          </div>
          <div className="flex gap-3 text-sm items-center">
            <Flower color="#098111" size={"18px"} />
            <p>Garden</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-wrap gap-2 max-h-[900px]">
        {Object.keys(groupedFacilities).map((category) => (
          <div key={category}>
            <h3 className="font-bold text-md mb-2 flex items-center">
              {getCategoryIcon(category)}
              <p>{category}</p>
            </h3>
            <ul className="list-none">
              {groupedFacilities[category].map((item, index) => (
                <li key={index} className="flex items-center mb-2 text-sm">
                  <span className="mr-2 text-sm">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderFacilities;
