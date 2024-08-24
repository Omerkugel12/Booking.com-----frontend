const RecentSearches = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your recent searches</h2>
      <div className="flex space-x-4">
        <SearchCard
          imageSrc="https://example.com/eilat.jpg"
          location="Eilat"
          dateInfo="Sep 1-Sep 6, 2 people"
        />
        <SearchCard
          imageSrc="https://example.com/tokyo.jpg"
          location="Tokyo"
          dateInfo="Sep 1-Sep 10, 2 people"
        />
      </div>
    </div>
  );
};

// SearchCard Component
const SearchCard = ({
  imageSrc,
  location,
  dateInfo,
}: {
  imageSrc: string;
  location: string;
  dateInfo: string;
}) => (
  <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg w-40">
    <img
      src={imageSrc}
      alt={location}
      className="w-full h-24 rounded-lg mb-2"
    />
    <p className="font-semibold">{location}</p>
    <p className="text-sm text-gray-500">{dateInfo}</p>
  </div>
);

export default RecentSearches;
