import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HotelDetails } from "@/models/Hotel.model";
import { getScoreLetter } from "@/pages/HotelDetailsPage";
import {
  Accessibility,
  Baby,
  Bath,
  BedSingle,
  CheckCircle,
  CigaretteOff,
  CircleCheck,
  CircleParking,
  Coffee,
  Flower,
  Heart,
  LampDesk,
  MapPin,
  Share,
  Tag,
  Tv,
  Users,
  Wifi,
} from "lucide-react";
import goldLike from "@/images/goldLike.svg";
import map from "@/images/ShowOnMap.webp";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PropsTypes {
  hotel: HotelDetails;
  scrollToMyDiv: () => void;
}

const FeatureItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex items-center p-3 border border-gray-300 rounded-lg">
    {icon}
    <span className="ml-2 font-semibold text-gray-700">{label}</span>
  </div>
);

function OverviewSection({ hotel, scrollToMyDiv }: PropsTypes) {
  return (
    <section className="flex gap-8 pb-7 border-b-[1px]" id="overview">
      <div className="flex flex-col ">
        <div className="flex justify-between items-center">
          {/*hotel*/}
          <div className="mb-5">
            <div className="flex items-center">
              <span className="bg-white text-yellow font-bold py-1 rounded-sm mr-2">
                {hotel.starsRating && "★".repeat(hotel.starsRating)}
              </span>

              <img src={goldLike} alt="Booking Logo" className="h-6" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{hotel.name}</h1>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-blue-600 mr-1" />
              <span>{hotel.address}</span>
              <span className="mx-2">-</span>
              <a href={hotel.hotelLink} className="text-blue-600 font-bold">
                {getScoreLetter(hotel.location)} location - show map
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <div className="flex gap-4 items-center">
              <Heart className="text-blue-600 cursor-pointer" />
              <Share className="text-blue-600 cursor-pointer" />
              <Button
                className="bg-blue-600 text-white"
                onClick={scrollToMyDiv}
              >
                Reserve
              </Button>
            </div>
            <div>
              <a
                href="#info&prices"
                className="flex items-center gap-2 text-blue-600 text-sm font-semibold"
              >
                <Tag size={"16px"} />
                We Price Match
              </a>
            </div>
          </div>
        </div>

        <div className="flex mb-6">
          <div className="max-w-[75%] w-full">
            {/*images*/}
            <div className="grid grid-cols-3 grid-rows-2 gap-2 w-full h-[450px]">
              {/* Main large image */}
              <div className="">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full"
                />
              </div>

              {/* Smaller images */}
              <div className="col-span-1">
                <img
                  src={hotel.imageURLs[1]}
                  alt="Additional view"
                  className="w-full h-full"
                />
              </div>
              <div className="col-span-1">
                <img
                  src={hotel.imageURLs[2]}
                  alt="Additional view"
                  className="w-full h-full"
                />
              </div>
              <div className="col-span-1">
                <img
                  src={hotel.imageURLs[3]}
                  alt="Additional view"
                  className="w-full h-full"
                />
              </div>
              <div className="col-span-1">
                <img
                  src={hotel.imageURLs[4]}
                  alt="Additional view"
                  className="w-full h-full"
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="col-span-1 relative cursor-pointer">
                    <img
                      src={hotel.imageURLs[5]}
                      alt="Additional view"
                      className="w-full h-full brightness-50 object-cover"
                    />
                    <p className="absolute inset-0 flex items-center justify-center text-lg text-white font-bold">{`+${
                      hotel.imageURLs.length - 5
                    } photos`}</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-[80%] max-h-[80%] w-full h-full flex items-center justify-center bg-transparent border-none">
                  <Carousel className="w-full h-full flex justify-center items-center">
                    <CarouselContent className="w-full h-full flex items-center justify-center">
                      {hotel.imageURLs.map((imageURL: string) => (
                        <CarouselItem
                          key={imageURL}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            <img
                              src={imageURL}
                              alt={hotel.name}
                              className="w-3/5"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="max-w-[25%] w-full pl-3 h-[450px] flex flex-col justify-between">
            <div className="border">
              <div className="flex items-center justify-end gap-2 p-3">
                <div className="flex flex-col items-center">
                  <span className="ml-2 text-md font-semibold">
                    {getScoreLetter(hotel.avgRating)}
                  </span>
                  <p className="text-[0.7rem] text-gray-600">{`${hotel.reviews.length} reviews`}</p>
                </div>
                <div className="bg-blue_1 p-1 rounded-tl-md rounded-tr-md rounded-br-md">
                  <p className="text-md font-semibold text-white">
                    {hotel?.avgRating.toFixed(1)}
                  </p>
                </div>
              </div>

              <div className="border-y p-3 flex flex-col gap-2 relative">
                {/* Make this div relative to allow absolute positioning of arrows */}
                <p className="font-semibold text-[0.7rem]">
                  Guests who stayed here loved
                </p>

                {/* Carousel */}
                <div className="w-56">
                  <Carousel className="relative">
                    {/* Carousel content */}
                    <CarouselContent className="">
                      {hotel.reviews.slice(0, 10).map((review, index) => {
                        return (
                          <CarouselItem key={index} className="">
                            <div className="flex flex-col gap-5">
                              <div className="flex items-start mb-2">
                                <p className="text-sm text-gray-600">
                                  {review.text}
                                </p>
                              </div>
                              <div className="flex items-center text-sm">
                                <span className="font-semibold">
                                  <Avatar className="size-6">
                                    <AvatarImage
                                      className=""
                                      src="https://github.com/shadcn.png"
                                      alt="@shadcn"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>
                                </span>
                                <span className="text-[0.7rem] ml-2">
                                  Susan
                                </span>
                                <span className="ml-2 text-gray-500 text-[0.7rem]">
                                  Israel
                                </span>
                              </div>
                            </div>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>

                    {/* Carousel Previous Arrow */}
                    <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none">
                      &lt;
                    </CarouselPrevious>

                    {/* Carousel Next Arrow */}
                    <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent p-2 border-none">
                      &gt;
                    </CarouselNext>
                  </Carousel>
                </div>
              </div>

              <div className="border-b p-3 flex justify-between">
                <p className="text-lg font-bold">
                  Location: {getScoreLetter(hotel?.location)}
                </p>
                <div className="bg-blue_1 p-1 rounded-tl-md rounded-tr-md rounded-br-md">
                  <p className="text-md font-semibold text-white">
                    {hotel?.location.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

            <div className="">
              <img className="" src={map} alt="Map" />
            </div>
          </div>
        </div>

        {/*features*/}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <FeatureItem
            icon={<BedSingle className="w-6 h-6 text-gray-700" />}
            label="Apartments"
          />
          <FeatureItem
            icon={<Wifi className="w-6 h-6 text-gray-700" />}
            label="Free Wifi"
          />
          <FeatureItem
            icon={<Coffee className="w-6 h-6 text-gray-700" />}
            label="Kitchen"
          />
          <FeatureItem
            icon={<Bath className="w-6 h-6 text-gray-700" />}
            label="Private Bathroom"
          />
          <FeatureItem
            icon={<Tv className="w-6 h-6 text-gray-700" />}
            label="Flat-screen TV"
          />
          <FeatureItem
            icon={<Users className="w-6 h-6 text-gray-700" />}
            label="Family Rooms"
          />
          <FeatureItem
            icon={<CheckCircle className="w-6 h-6 text-gray-700" />}
            label="Key card access"
          />
          <FeatureItem
            icon={<CigaretteOff className="w-6 h-6 text-gray-700" />}
            label="Non-smoking rooms"
          />
        </div>

        <div className="flex justify-between">
          <div className="max-w-[65%]">
            <p className="text-gray-800 text-sm">{hotel.description}</p>
            <p className="mt-4 text-gray-500 text-sm">
              Distance in property description is calculated using ©
              OpenStreetMap
            </p>
            <div className="flex flex-col gap-3 my-3">
              <p className="text-md font-bold">Most popular facilities</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex gap-3 text-sm items-center">
                  <CigaretteOff color="#098111" size={"18px"} />
                  <p>Non-smoking rooms</p>
                </div>
                <div className="flex gap-3 text-sm items-center">
                  <Accessibility color="#098111" size={"18px"} />
                  <p>Facilities for disabled guests</p>
                </div>
                <div className="flex gap-3 text-sm items-center">
                  <Wifi color="#098111" size={"18px"} />
                  <p>Free Wifi</p>
                </div>
                <div className="flex gap-3 text-sm items-center">
                  <Baby color="#098111" size={"18px"} />
                  <p>Family rooms</p>
                </div>
                <div className="flex gap-3 text-sm items-center">
                  <LampDesk color="#098111" size={"18px"} />
                  <p>24-hour front desk</p>
                </div>
                <div className="flex gap-3 text-sm items-center">
                  <CigaretteOff color="#098111" size={"18px"} />
                  <p>Elevator</p>
                </div>
                <div className="flex gap-3 text-sm items-center">
                  <CircleParking color="#098111" size={"18px"} />
                  <p>Free parking</p>
                </div>
                <div className="flex gap-3 text-sm items-center">
                  <Flower color="#098111" size={"18px"} />
                  <p>Garden</p>
                </div>
              </div>
            </div>
          </div>

          {/* Genius */}
          <div className="max-w-[28%] w-full">
            <div className="border-[1px] rounded-md p-3">
              <div className="border-b pb-3">
                <h2 className="text-md font-bold">
                  Genius benefits available on select options:
                </h2>
                <div className="flex gap-2 items-center">
                  <CircleCheck
                    size={"16px"}
                    fill="#febb02"
                    className="text-white"
                  />

                  <p className="text-sm">10% discount</p>
                </div>
                <p className="px-7 text-[0.7rem]">
                  Applied to the price before taxes and fees
                </p>
              </div>
              <div className="pt-3 flex justify-between items-center">
                <p className="text-[0.7rem] text-gray-600">
                  Booking.com's loyalty program
                </p>
                <img
                  src="/src/images//genius-booking-logo-e1593011246996.png"
                  alt=""
                  className="h-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OverviewSection;
