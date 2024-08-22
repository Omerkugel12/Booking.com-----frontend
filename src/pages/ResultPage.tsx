import DropDownSort from "@/components/self-made/DropDownSort";
import SearchBar from "@/components/self-made/SearchBar"
import { Button } from "@/components/ui/button";
import { Hotel } from "@/models/Hotel.model";



function ResultPage() {
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
      < div className=" h-[100vh]">
        <div className=" absolute top-[107px] left-[110px]">
          <SearchBar />
        </div>
        <div className=" mt-24 ml-10 ">
          <h2 className=" font-bold text-lg">
            {hotel1?.city ? hotel1.city : ""}: {Response.length || 3} properties
            found
                </h2>
                <DropDownSort/>
        </div>
      </div>
    );
}

export default ResultPage