const PropertyTypes = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Browse by property type in Eilat
      </h2>
      <div className="grid grid-cols-4 gap-4">
        <PropertyTypeCard
          imageSrc="https://example.com/apartment.jpg"
          type="Apartments"
        />
        {/* Add more PropertyTypeCard components as needed */}
      </div>
    </div>
  );
};

// PropertyTypeCard Component
const PropertyTypeCard = ({
  imageSrc,
  type,
}: {
  imageSrc: string;
  type: string;
}) => (
  <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
    <img
      src={imageSrc}
      alt={type}
      className="w-full h-32 object-cover rounded-lg mb-2"
    />
    <p className="font-semibold">{type}</p>
  </div>
);

export default PropertyTypes;
