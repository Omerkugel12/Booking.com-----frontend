import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  BedSingle,
  Bell,
  CarFront,
  CarTaxiFront,
  FerrisWheel,
  Plane,
  ShieldQuestion,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function Header() {
  const { loggedInUser } = useAuth();
  return (
    // <div className="bg-blue_1">
    <nav className="bg-blue_1 px-40 pb-4">
      <div className="flex justify-between items-center">
        <Link to={"/"} className="w-40">
          <img src="/src/images/Booking_Com_Logotype_Aug2020_White_Blue-BG.png" />
        </Link>
        {/* <Link to={"/"}>
          <h1 className="text-3xl text-white font-extrabold">Booking.com</h1>
        </Link> */}
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
                to="/auth/register"
                className="text-nav_btn_text bg-blue_2 rounded-[3px] px-4 py-2 text-sm font-semibold border border-nav_btn_text"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-yellow font-bold">
                  {loggedInUser.username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-bold">{loggedInUser.username}</p>
                <p className="text-yellow">Genius Level 1</p>
              </div>
            </div>
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
              <div className=" flex justify-center size-6 rounded-full overflow-hidden ">
                <img src="/src/images/US.png" alt="" />
              </div>
            </Button>
            <Button className="bg-blue_1 rounded-sm hover:bg-hover text-md">
              ILS
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-0">
        <Button className="bg-blue-1 rounded-l-full rounded-r-full hover:bg-hover p-4 text-base flex gap-1 font-thin">
          <p>
            <BedSingle strokeWidth={1.75} />
          </p>
          <p>stays</p>
        </Button>
        <Button className="bg-blue-1 rounded-l-full rounded-r-full hover:bg-hover p-4 text-base flex gap-1 font-thin">
          <p>
            <Plane strokeWidth={1.75} />
          </p>
          <p>Flights</p>
        </Button>
        <Button className="bg-blue-1 rounded-l-full rounded-r-full hover:bg-hover p-4 text-base flex gap-1 font-thin">
          <p>
            <CarFront strokeWidth={1.75} />
          </p>
          <p>Car rentals</p>
        </Button>
        <Button className="bg-blue-1 rounded-l-full rounded-r-full hover:bg-hover p-4 text-base flex gap-1 font-thin">
          <p>
            <FerrisWheel strokeWidth={1.75} />
          </p>
          <p>Attractions</p>
        </Button>
        <Button className="bg-blue-1 rounded-l-full rounded-r-full hover:bg-hover p-4 text-base flex gap-1 font-thin">
          <p>
            <CarTaxiFront strokeWidth={1.75} />
          </p>
          <p>Airport taxis</p>
        </Button>
      </div>
    </nav>
    // </div>
  );
}

export default Header;
