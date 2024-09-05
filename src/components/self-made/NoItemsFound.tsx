import { Search } from "lucide-react";
import { Button } from "../ui/button";

function NoItemsFound() {
  return (
    <div className=" text-center items-center flex flex-col justify-center gap-4 ">
      <div>
        <Search size={50} />
      </div>
      <div className=" flex flex-col gap-3">
        <h2 className=" text-2xl font-bold">No properties found in New York</h2>
        <p className=" my-1">
          There are no matching properties for your search criteria. Try
          updating your search.
        </p>
        <div>
          <Button className=" bg-blue-500 py-6 px-5 text-md">
            Update search
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NoItemsFound;
