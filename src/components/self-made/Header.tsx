import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { Bell, ShieldQuestion } from "lucide-react";
import stays from "@/images/stays.svg";
import flights from "@/images/flights.svg";
import carRental from "@/images/carRental.svg";
import attractions from "@/images/arrtactions.svg";
import airportTaxies from "@/images/airportTaxies.svg";
import {
  CreditCard,
  Keyboard,
  Plus,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import bookingLogo from "@/images/bookingLogo.svg";
import { useState } from "react";

interface PropType {
  type: "results" | "auth" | "deafult" | "bookingPage";
}

function Header({ type }: PropType) {
  const { loggedInUser, logout } = useAuth();
  const [activeButton, setActiveButton] = useState("stays");

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  return (
    <main className="bg-blue_1">
      <nav
        className={
          type !== "results"
            ? "bg-blue_1 max-w-[1050px] w-full mx-auto py-4 "
            : "bg-blue_1 max-w-[1050px] w-full mx-auto py-4 pb-10"
        }
      >
        <div className="flex justify-between items-center">
          <Link to={"/"} className="w-36">
            <img src={bookingLogo} alt="Booking Logo" />
          </Link>
          {type !== "auth" && (
            <div className="flex flex-row-reverse items-center justify-between gap-9">
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
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-inherit hover:bg-hover px-0">
                      <div className="flex gap-1 items-center">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-green text-lg font-bold border-2 border-yellow">
                            {loggedInUser.email.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-bold">
                            {loggedInUser.email.slice(0, 4)}
                          </p>
                          <p className="text-yellow text-[0.7rem]">
                            Genius Level 1
                          </p>
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Manage account</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <Link to={"/MyTrips"}>
                          <span>Bookings & Trips</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Genius loyalty program</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Keyboard className="mr-2 h-4 w-4" />
                        <span>Rewards & Wallet</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Reviews</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Saved</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout}>
                        <Plus className="mr-2 h-4 w-4 cursor-pointer" />
                        <span>Sign out</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <Button className="bg-blue_1 rounded-sm hover:bg-hover font-semibold text-md px-0">
                List your property
              </Button>
              {loggedInUser && (
                <Button className="bg-blue_1 rounded-sm hover:bg-hover px-0">
                  <Bell strokeWidth={1.75} />
                </Button>
              )}
              <Button className="bg-blue_1 rounded-sm hover:bg-hover px-0">
                <div className="absolute">
                  <p className="">
                    <ShieldQuestion strokeWidth={1.3} />
                  </p>
                </div>
              </Button>
              <Button className="bg-blue_1 rounded-sm hover:bg-hover px-0">
                <div className="flex justify-center size-6 rounded-full overflow-hidden">
                  <img src="/src/images/US.png" alt="" />
                </div>
              </Button>
              <Button className="bg-blue_1 rounded-sm hover:bg-hover text-md px-0">
                ILS
              </Button>
            </div>
          )}
          {type === "auth" && (
            <div className="flex flex-row-reverse gap-8">
              <Button className="bg-blue_1 rounded-sm hover:bg-hover px-0">
                <div className="absolute">
                  <p className="">
                    <ShieldQuestion strokeWidth={1.3} />
                  </p>
                </div>
              </Button>
              <Button className="bg-blue_1 rounded-sm hover:bg-hover px-0">
                <div className="flex justify-center size-6 rounded-full overflow-hidden">
                  <img src="/src/images/US.png" alt="" />
                </div>
              </Button>
            </div>
          )}
        </div>

        {type !== "auth" && type !== "bookingPage" && (
          <div className="flex gap-0 mt-4">
            <Link to={"/"}>
              <Button
                onClick={() => handleButtonClick("stays")}
                className={`bg-blue-1 rounded-l-full rounded-r-full p-4 flex items-center gap-2 text-base font-thin ${
                  activeButton === "stays"
                    ? "border-[1px] border-white hover:bg-hover bg-hover"
                    : "bg-blue_1 hover:bg-hover text-white"
                }`}
              >
                <img
                  src={stays}
                  alt="Stays"
                  className="h-5 filter invert-0"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <p className="text-sm font-normal">Stays</p>
              </Button>
            </Link>
            <Link to="/flights">
              <Button
                onClick={() => handleButtonClick("flights")}
                className={`bg-blue-1 rounded-l-full rounded-r-full p-4 flex items-center gap-2 text-base font-thin ${
                  activeButton === "flights"
                    ? "border-[1px] border-white hover:bg-hover bg-hover"
                    : "bg-blue-1 hover:bg-hover text-white"
                }`}
              >
                <img
                  src={flights}
                  alt="Flights"
                  className="h-5 filter invert-0"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <p className="text-sm font-normal">Flights</p>
              </Button>
            </Link>
            <Link to="/car_rentals">
              <Button
                onClick={() => handleButtonClick("carRentals")}
                className={`bg-blue-1 rounded-l-full rounded-r-full p-4 flex items-center gap-2 text-base font-thin ${
                  activeButton === "carRentals"
                    ? "border-[1px] border-white hover:bg-hover bg-hover"
                    : "bg-blue-1 hover:bg-hover text-white"
                }`}
              >
                <img
                  src={carRental}
                  alt="Car Rentals"
                  className="h-5 filter invert-0"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <p className="text-sm font-normal">Car Rentals</p>
              </Button>
            </Link>
            <Link to="/attractions">
              <Button
                onClick={() => handleButtonClick("attractions")}
                className={`bg-blue-1 rounded-l-full rounded-r-full p-4 flex items-center gap-2 text-base font-thin ${
                  activeButton === "attractions"
                    ? "border-[1px] border-white hover:bg-hover bg-hover"
                    : "bg-blue-1 hover:bg-hover text-white"
                }`}
              >
                <img
                  src={attractions}
                  alt="Attractions"
                  className="h-5 filter invert-0"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <p className="text-sm font-normal">Attractions</p>
              </Button>
            </Link>
            <Link to="/taxi">
              <Button
                onClick={() => handleButtonClick("airportTaxis")}
                className={`bg-blue-1 rounded-l-full rounded-r-full p-4 flex items-center gap-2 text-base font-thin ${
                  activeButton === "airportTaxis"
                    ? "border-[1px] border-white hover:bg-hover bg-hover"
                    : "bg-blue-1 hover:bg-hover text-white"
                }`}
              >
                <img
                  src={airportTaxies}
                  alt="Airport Taxis"
                  className="h-5 filter invert-0"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <p className="text-sm font-normal">Airport Taxis</p>
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </main>
  );
}

export default Header;
