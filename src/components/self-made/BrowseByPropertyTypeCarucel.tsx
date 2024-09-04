import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const propertyTypes = [
  {
    image:
      "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=",
    title: "Hotels",
    dates: "Sep 1-Sep 6, 2 adults",
    available: "50 available",
  },
  {
    image:
      "https://r-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=",
    title: "Apartments",
    dates: "Sep 1-Sep 6, 2 adults",
    available: "2 available",
  },
  {
    image:
      "https://r-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=",
    title: "Vilas",
    dates: "Unavailable for your dates",
    available: "1 available",
  },
  {
    image:
      "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450113.jpeg?k=76b3780a0e4aacb9d02ac3569b05b3c5e85e0fd875287e9ac334e3b569f320c7&o=",
    title: "Vacation Homes",
    dates: "Sep 1-Sep 6, 2 adults",
    available: "4 available",
  },
  {
    image:
      "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450073.jpeg?k=795a94c30433de1858ea52375e8190a962b302376be2e68aa08be345d936557d&o=",
    title: "Guest Houses",
    dates: "Sep 1-Sep 6, 2 adults",
    available: "18 available",
  },
  {
    image:
      "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450082.jpeg?k=beb101b827a729065964523184f4db6cac42900c2415d71d516999af40beb7aa&o=",
    title: "Hostels",
    dates: "Sep 1-Sep 6, 2 adults",
    available: "9 available",
  },
  {
    image:
      "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450093.jpeg?k=aa5cc7703f3866af8ffd6de346c21161804a26c3d0a508d3999c11c337506ae1&o=",
    title: "Motels",
    dates: "Sep 1-Sep 6, 2 adults",
    available: "2 available",
  },
];

function PropertyTypeCarousel() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">
        Browse by property type in Eilat
      </h2>
      <Carousel>
        <CarouselContent className="flex gap-4 h-[300px]">
          {propertyTypes.map((property, index) => (
            <CarouselItem key={index} className="w-[300px] flex-none">
              <a href="#" className="block">
                <div className="rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4 bg-white">
                    <h3 className="text-lg font-semibold">{property.title}</h3>
                    <p className="text-sm text-gray-500">{property.dates}</p>
                    {property.available && (
                      <span className="text-sm text-gray-700">
                        {property.available}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2">
          <Button variant="outline" size="icon" className="bg-white shadow">
            ←
          </Button>
        </CarouselPrevious>
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <Button variant="outline" size="icon" className="bg-white shadow">
            →
          </Button>
        </CarouselNext>
      </Carousel>
    </div>
  );
}

export default PropertyTypeCarousel;
