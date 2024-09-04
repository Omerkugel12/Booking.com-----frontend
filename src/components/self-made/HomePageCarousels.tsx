import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import genius from "@/images/genius.svg";
import percentage from "@/images/percentage.svg";
import car from "@/images/carRental.svg";
import breakfasts from "@/images/breakfasts.svg";
import bad from "@/images/bad.svg";
import prioritySupport from "@/images/prioritySupport.svg";

export function HomePageCarousels() {
  return (
    <div className="space-y-12">
      {/* First Carousel - Travel More, Spend Less */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Travel more, spend less</h2>
          <p>
            <a href="" className="text-blue-600 text-sm">
              Learn more about your rewards
            </a>
          </p>
        </div>
        <Carousel className="w-full max-w-full">
          <CarouselContent className="-ml-4">
            <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/4">
              <Card className="bg-blue-900 h-[100px] w-64 text-white p-4 ">
                <CardContent className="p-0 cursor-pointer">
                  <img
                    src={genius}
                    alt="Stays"
                    className="h-4 filter invert-0"
                  />
                  <p className="text-sm pt-2">
                    You're at <b>Genius Level 1</b> in our loyalty program
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/4">
              <Card className="p-4 h-[100px] w-64 border-[1px] border-blue-900">
                <CardContent className="p-0 flex flex-col gap-2 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold">
                      10–20% discounts on stays
                    </h3>
                    <img
                      src={percentage}
                      alt="Stays"
                      className="h-5 filter invert-0"
                      style={{
                        filter:
                          "invert(14%) sepia(88%) saturate(2444%) hue-rotate(205deg) brightness(94%) contrast(89%)",
                      }}
                    />
                  </div>

                  <p className="text-sm">
                    Enjoy discounts at participating properties worldwide
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/4">
              <Card className="p-4 h-[100px] w-64 border-[1px] border-blue-900">
                <CardContent className="p-0 flex flex-col gap-2 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold">10% off rental cars</h3>
                    <img
                      src={car}
                      alt="Stays"
                      className="h-5 filter invert-0 "
                      style={{
                        filter:
                          "invert(14%) sepia(88%) saturate(2444%) hue-rotate(205deg) brightness(94%) contrast(89%)",
                      }}
                    />
                  </div>
                  <p className="text-sm">Save on select rental cars</p>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/4">
              <Card className="p-4 h-[100px] w-64 border-[1px] border-blue-900">
                <CardContent className="p-0 flex flex-col gap-2 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold">Free breakfasts</h3>
                    <img
                      src={breakfasts}
                      alt="Stays"
                      className="h-5 filter invert-0 "
                      style={{
                        filter:
                          "invert(14%) sepia(88%) saturate(2444%) hue-rotate(205deg) brightness(94%) contrast(89%)",
                      }}
                    />
                  </div>
                  <p className="text-sm">
                    Start your day with free breakfast at select options
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/4">
              <Card className="p-4 h-[100px] w-64 border-[1px] border-blue-900">
                <CardContent className="p-0 flex flex-col gap-2 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold">Free room upgrades</h3>
                    <img
                      src={bad}
                      alt="Stays"
                      className="h-5 filter invert-0 "
                      style={{
                        filter:
                          "invert(14%) sepia(88%) saturate(2444%) hue-rotate(205deg) brightness(94%) contrast(89%)",
                      }}
                    />
                  </div>
                  <p className="text-sm">
                    Upgrade your stay with a better room at no extra cost{" "}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>{" "}
            <CarouselItem className="pl-4 md:basis-1/3 lg:basis-1/4">
              <Card className="p-4 h-[100px] w-64 border-[1px] border-blue-900">
                <CardContent className="p-0 flex flex-col gap-2 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold">
                      Priority support on stays
                    </h3>
                    <img
                      src={prioritySupport}
                      alt="Stays"
                      className="h-5 filter invert-0 "
                      style={{
                        filter:
                          "invert(14%) sepia(88%) saturate(2444%) hue-rotate(205deg) brightness(94%) contrast(89%)",
                      }}
                    />
                  </div>
                  <p className="text-sm">
                    Get direct access to a live agent when contacting Customer
                    Service
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
