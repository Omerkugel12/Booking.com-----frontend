import { HotelDetails } from "@/models/Hotel.model";

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
    <div id="faciliteis" className="grid grid-cols-3 gap-6 mt-8">
      {Object.keys(groupedFacilities).map((category) => (
        <div key={category}>
          <h3 className="font-bold text-lg mb-2">{category}</h3>
          <ul className="list-none">
            {groupedFacilities[category].map((item, index) => (
              <li key={index} className="flex items-center mb-2">
                <span className="mr-2">✓</span>{" "}
                {/* This can be replaced with an icon if needed */}
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RenderFacilities;
