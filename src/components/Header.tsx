import { Button } from "./ui/button";

function Header() {
  return (
    <nav className="bg-blue_1 ">
      <div className="flex justify-between items-center">
        <div className="size-56">
          <img src="/src/Booking_Com_Logotype_Aug2020_White_Blue-BG.png" />
        </div>
        <div className="flex flex-row-reverse">
          <Button>Sign in</Button>
          <Button>Register</Button>
          <Button>List your property</Button>
          <Button>?</Button>
          <Button className="bg-blue_1">
            <div className=" flex justify-center size-7 rounded-full overflow-hidden ">
              <img src="/src/US.png" alt="" />
            </div>
          </Button>
          <Button></Button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
