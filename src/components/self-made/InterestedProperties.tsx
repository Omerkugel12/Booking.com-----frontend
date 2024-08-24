const InterestedProperties = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Still interested in these properties?
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <PropertyCard
          imageSrc="https://example.com/hotel1.jpg"
          title="Notting Hill House"
          location="London, United Kingdom"
          rating="8.2"
          reviewInfo="Very Good · 271 reviews"
        />
        <PropertyCard
          imageSrc="https://example.com/hotel2.jpg"
          title="The Royal Park Canvas Ginza Corridor"
          location="Tokyo, Japan"
          rating="8.5"
          reviewInfo="Very Good · 1,708 reviews"
        />
      </div>
    </div>
  );
};

// PropertyCard Component
const PropertyCard = ({
  imageSrc,
  title,
  location,
  rating,
  reviewInfo,
}: {
  imageSrc: string;
  title: string;
  location: string;
  rating: string;
  reviewInfo: string;
}) => (
  <div className="bg-white p-4 rounded-lg shadow-lg flex">
    <img
      src={imageSrc}
      alt={title}
      className="w-40 h-40 rounded-lg object-cover"
    />
    <div className="ml-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{location}</p>
      <div className="flex items-center space-x-2 mt-2">
        <span className="text-blue-600 font-bold">{rating}</span>
        <span className="text-sm text-gray-500">{reviewInfo}</span>
      </div>
    </div>
  </div>
);

export default InterestedProperties;
