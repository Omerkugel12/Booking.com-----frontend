import ResultHotelCard from "./components/self-made/ResultHotelCard";
import { Button } from "./components/ui/button";
import { Hotel } from "./models/Hotel.model";

function App() {
  const hotel1: Hotel = {
    _id: "1",
    name: "Hotel 1",
    type: "hotel",
    city: "New York",
    address: "456 Elm St",
    distance: "2KM",
    photos: ["https://example.com/hotel1.jpg"],
    title: "Hotel 1",
    desc: "This is a great hotel located in the heart of the city.",
    rating: 4.8,
    rooms: ["Room 1", "Room 2", "Room 3"],
    cheapestPrice: 100,
    featured: true,
  };

  return (
    <>
      <p>Hi</p>
      <Button className="bg-blue-500">Hi</Button>
      <ResultHotelCard hotel={hotel1} />
    </>
  );
}

export default App;
