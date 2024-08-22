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
        <Link to={"/"} className="w-48">
          <img src="/src/Booking_Com_Logotype_Aug2020_White_Blue-BG.png" />
        </Link>
        {/* <Link to={"/"}>
          <h1 className="text-3xl text-white font-extrabold">Booking.com</h1>
        </Link> */}
        <div className="flex flex-row-reverse gap-4">
          {!loggedInUser ? (
            <>
              <Button className="bg-white text-blue_1 rounded-sm hover:bg-blue_2 ">
                <Link to={"/auth/login"}>Sign in</Link>
              </Button>
              <Button className="bg-white text-blue_1 rounded-sm hover:bg-blue_2">
                <Link to="/auth/register">Register</Link>
              </Button>
            </>
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

          <Button className="bg-blue_1 rounded-sm hover:bg-hover">
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
                <ShieldQuestion strokeWidth={1.75} />
              </p>
              {/* <Circle /> */}
            </div>
          </Button>
          <Button className="bg-blue_1 rounded-sm hover:bg-hover">
            <div className=" flex justify-center size-7 rounded-full overflow-hidden ">
              <img src="/src/US.png" alt="" />
            </div>
          </Button>
          <Button className="bg-blue_1 rounded-sm hover:bg-hover">ILS</Button>
        </div>
      </div>
      <div className="flex gap-2">
        <Button className="bg-blue-1 rounded-l-full rounded-r-full hover:bg-hover p-6 text-base flex gap-1 font-thin">
          <p>
            <BedSingle strokeWidth={1.75} />
          </p>
          <p>stays</p>
        </Button>
        <Button className="bg-blue-1 rounded-l-full rounded-r-full hover:bg-hover p-6 text-base flex gap-1 font-thin">
          <p>
            <Plane strokeWidth={1.75} />
          </p>
          <p>Flights</p>
        </Button>
        <Button className="bg-blue-1 rounded-l-full rounded-r-full hover:bg-hover p-6 text-base flex gap-1 font-thin">
          <p>
            <CarFront strokeWidth={1.75} />
          </p>
          <p>Car rentals</p>
        </Button>
        <Button className="bg-blue-1 rounded-l-full rounded-r-full hover:bg-hover p-6 text-base flex gap-1 font-thin">
          <p>
            <FerrisWheel strokeWidth={1.75} />
          </p>
          <p>Attractions</p>
        </Button>
        <Button className="bg-blue-1 rounded-l-full rounded-r-full hover:bg-hover p-6 text-base flex gap-1 font-thin">
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
