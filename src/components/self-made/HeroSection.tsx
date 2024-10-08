import { Button } from "@/components/ui/button";
import homeImage from "@/images/Homepage.jpeg";

const HeroSection = () => {
  return (
    <div
      className=" h-[300px] bg-cover bg-center -mx-52"
      style={{ backgroundImage: `url(${homeImage})` }}
    >
      {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
      <div className="relative py-12 text-white max-w-[1050px] mx-auto w-full">
        <h1 className="text-5xl font-bold my-4">
          A place to call home on your next adventure
        </h1>
        <p className="text-2xl mb-6">
          Experience the joy of an entire place to yourself
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 transition duration-300">
          Book a vacation rental
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
