const RatingsOverview: React.FC<{ hotel: any }> = ({ hotel }) => {
  const renderRatingBar = (label: string, value: number) => {
    const ratingColor = value > 9 ? "bg-green" : "bg-blue-900";

    return (
      <div className="mb-4">
        <div className="flex justify-between pb-2">
          <p className="font-semibold">{label}</p>
          <p className="text-sm text-gray-500 mt-1">{value.toFixed(1)}</p>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div
            className={`absolute top-0 left-0 h-2 rounded-full ${ratingColor}`}
            style={{ width: `${value * 10}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      {renderRatingBar("Staff", hotel.staff)}
      {renderRatingBar("Cleanliness", hotel.cleanliness)}
      {renderRatingBar("Comfort", hotel.comfort)}
      {renderRatingBar("Free Wifi", hotel.freeWifi)}
      {renderRatingBar("Location", hotel.location)}
      {renderRatingBar("Value for money", hotel.valueForMoney)}
    </div>
  );
};

export default RatingsOverview;
