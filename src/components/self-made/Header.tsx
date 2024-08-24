import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { Bell, ShieldQuestion } from "lucide-react";
import stays from "@/images/stays.svg";
import flights from "@/images/flights.svg";
import carRental from "@/images/carRental.svg";
import attractions from "@/images/arrtactions.svg";
import airportTaxies from "@/images/airportTaxies.svg";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
<<<<<<< HEAD
import bookingLogo from "@/images/bookingLogo.svg";
import { SetStateAction, useState } from "react";

function Header() {
  const { loggedInUser } = useAuth();
  const [activeButton, setActiveButton] = useState("stays");

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  return (
    <nav className="bg-blue_1 px-60 py-4">
=======
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const { loggedInUser, logout } = useAuth();
  return (
    <nav className="bg-blue_1 px-40 pb-7">
>>>>>>> 29942d570bcc292044f6904572779abfda08c28c
      <div className="flex justify-between items-center">
        <Link to={"/"} className="w-36">
          <img src={bookingLogo} alt="Booking Logo" />
        </Link>
        <div className="flex flex-row-reverse items-center">
          {!loggedInUser ? (
            <div className="flex flex-row-reverse gap-2">
              <Link
                to={"/auth"}
                className="text-nav_btn_text bg-blue_2 rounded-[3px] px-2 py-2 text-sm font-semibold border border-nav_btn_text"
              >
                Sign in
              </Link>
              <Link
                to="/auth"
                className="text-nav_btn_text bg-blue_2 rounded-[3px] px-4 py-2 text-sm font-semibold border border-nav_btn_text"
              >
                Register
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex gap-2 items-center">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-yellow font-bold">
                      {loggedInUser.email.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-bold">
                      {loggedInUser.username}
                    </p>
                    <p className="text-yellow">Genius Level 1</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Manage account</DropdownMenuItem>
                <DropdownMenuItem>Bookings & Trips</DropdownMenuItem>
                <DropdownMenuItem>Genius loyalty program</DropdownMenuItem>
                <DropdownMenuItem>Rewards & Wallet</DropdownMenuItem>
                <DropdownMenuItem>Reviews</DropdownMenuItem>
                <DropdownMenuItem>Saved</DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <div className="flex flex-row-reverse gap-3">
            <Button className="bg-blue_1 rounded-sm hover:bg-hover font-semibold text-md">
              List your property
            </Button>
            {loggedInUser && (
              <Button className="bg-blue_1 rounded-sm hover:bg-hover">
                <Bell strokeWidth={1.75} />
              </Button>
            )}
            <Button className="bg-blue_1 rounded-sm hover:bg-hover">
              <div className="absolute">
                <p className="">
                  <ShieldQuestion strokeWidth={1.3} />
                </p>
              </div>
            </Button>
            <Button className="bg-blue_1 rounded-sm hover:bg-hover">
              <div className="flex justify-center size-6 rounded-full overflow-hidden">
                <img src="/src/images/US.png" alt="" />
              </div>
            </Button>
            <Button className="bg-blue_1 rounded-sm hover:bg-hover text-md">
              ILS
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-0 mt-4">
        <Button
          onClick={() => handleButtonClick("stays")}
          className={`bg-blue-1 rounded-l-full rounded-r-full p-4 flex items-center gap-2 text-base font-thin ${
            activeButton === "stays"
              ? "border-[1px] border-white hover:bg-blue-1"
              : "bg-blue-1  text-white"
          }`}
        >
          <img
            src={stays}
            alt="Stays"
            className="h-5 filter invert-0"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p>Stays</p>
        </Button>
        <Button
          onClick={() => handleButtonClick("flights")}
          className={`bg-blue-1 rounded-l-full rounded-r-full p-4 flex items-center gap-2 text-base font-thin ${
            activeButton === "flights"
              ? "border-[1px] border-white hover:bg-blue-1"
              : "bg-blue-1 hover:bg-hover text-white"
          }`}
        >
          <img
            src={flights}
            alt="Flights"
            className="h-5 filter invert-0"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p>Flights</p>
        </Button>
        <Button
          onClick={() => handleButtonClick("carRentals")}
          className={`bg-blue-1 rounded-l-full rounded-r-full p-4 flex items-center gap-2 text-base font-thin ${
            activeButton === "carRentals"
              ? "border-[1px] border-white hover:bg-blue-1"
              : "bg-blue-1 hover:bg-hover text-white"
          }`}
        >
          <img
            src={carRental}
            alt="Car Rentals"
            className="h-5 filter invert-0"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p>Car Rentals</p>
        </Button>
        <Button
          onClick={() => handleButtonClick("attractions")}
          className={`bg-blue-1 rounded-l-full rounded-r-full p-4 flex items-center gap-2 text-base font-thin ${
            activeButton === "attractions"
              ? "border-[1px] border-white hover:bg-blue-1"
              : "bg-blue-1 hover:bg-hover text-white"
          }`}
        >
          <img
            src={attractions}
            alt="Attractions"
            className="h-5 filter invert-0"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p>Attractions</p>
        </Button>
        <Button
          onClick={() => handleButtonClick("airportTaxis")}
          className={`bg-blue-1 rounded-l-full rounded-r-full p-4 flex items-center gap-2 text-base font-thin ${
            activeButton === "airportTaxis"
              ? "border-[1px] border-white hover:bg-blue-1"
              : "bg-blue-1 hover:bg-hover text-white"
          }`}
        >
          <img
            src={airportTaxies}
            alt="Airport Taxis"
            className="h-5 filter invert-0"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p>Airport Taxis</p>
        </Button>
      </div>
    </nav>
  );
}

export default Header;
