import { Button } from "@/components/ui/button";
import { HotelDetails } from "@/models/Hotel.model";

interface PropsTypes {
  hotel: HotelDetails;
}

function HouseRulesComp({ hotel }: PropsTypes) {
  return (
    <section id="houseRules">
      <div className="">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl font-bold">House rules</h1>
          <Button className="bg-nav_btn_text rounded-[5px] text-sm hover:bg-blue_1">
            <a href="#info&prices">See availability</a>
          </Button>
        </div>
        <p className="text-gray-600">{`${hotel.name} takes special requests - add in the next step!`}</p>
      </div>
      <div className="mt-4 border rounded-md p-4">
        <div className="flex border-b p-4">
          <p className="font-bold w-[25%]">Check-in</p>
          <div className="">
            <p className="text-sm">From 16:00</p>
            <p className="text-sm text-gray-600">
              Guests are required to show a photo ID and credit card at
              check-in.
              <br />
              You need to let the property know what time you'll be arriving in
              advance.
            </p>
          </div>
        </div>
        <div className="flex border-b p-4">
          <p className="font-bold w-[25%]">Check-out</p>
          <div>
            <p className="text-sm">Untill 11:00</p>
          </div>
        </div>
        <div className="flex border-b p-4">
          <p className="font-bold w-[25%]">Cancellation/ prepayment</p>
          <div className="">
            <p className="text-sm">
              Cancelation and prepayment policies vary according to
              accommodation type.
              <br />
              Check what conditions apply to each option when making your
              selection.
            </p>
          </div>
        </div>
        <div className="flex border-b p-4">
          <p className="font-bold w-[25%]">Age restriction</p>
          <div>
            <p className="text-sm">The minimum age for check-in is 20</p>
          </div>
        </div>
        <div className="flex border-b p-4">
          <p className="font-bold w-[25%]">Pets</p>
          <div>
            <p className="text-sm">Pets are not allowed.</p>
          </div>
        </div>
        <div className="flex p-4">
          <p className="font-bold w-[25%]">Accepted payment methods</p>
          <div>
            <div className="flex items-center gap-4">
              <img
                src="/src/images/visa-512.webp"
                alt="visa"
                className="w-10 border rounded-sm"
              />
              <img
                src="/src/images/mastercard.svg"
                alt="master_card"
                className="w-10 border rounded-sm"
              />
              <p className="p-1 bg-green text-white rounded-sm text-[0.7rem]">
                Cash
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HouseRulesComp;
