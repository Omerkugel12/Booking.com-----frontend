import React from "react";
import {
  BedSingle,
  Wifi,
  Coffee,
  Bath,
  Tv,
  Users,
  CheckCircle,
  CigaretteOff,
} from "lucide-react";

const HotelFeatures: React.FC = () => {
  const features = [
    {
      icon: <BedSingle className="w-6 h-6 text-gray-700" />,
      label: "Apartments",
    },
    { icon: <Wifi className="w-6 h-6 text-gray-700" />, label: "Free Wifi" },
    { icon: <Coffee className="w-6 h-6 text-gray-700" />, label: "Kitchen" },
    {
      icon: <Bath className="w-6 h-6 text-gray-700" />,
      label: "Private Bathroom",
    },
    { icon: <Tv className="w-6 h-6 text-gray-700" />, label: "Flat-screen TV" },
    {
      icon: <Users className="w-6 h-6 text-gray-700" />,
      label: "Family Rooms",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-gray-700" />,
      label: "Key card access",
    },
    {
      icon: <CigaretteOff className="w-6 h-6 text-gray-700" />,
      label: "Non-smoking rooms",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex items-center p-3 border border-gray-300 rounded-lg"
        >
          {feature.icon}
          <span className="ml-2 font-semibold text-gray-700">
            {feature.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default HotelFeatures;
