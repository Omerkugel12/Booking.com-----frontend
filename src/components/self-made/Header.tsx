import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-[#003580] h-[50px] flex justify-center">
      <div className="w-full max-w-[1024px] text-white flex items-center justify-between">
        <Link to="/" className="text-inherit no-underline">
          <span className="font-medium">lamabooking</span>
        </Link>
        {user ? (
          <span>{user.username}</span>
        ) : (
          <div className="flex">
            <button className="ml-[20px] border-none bg-inherit px-[10px] py-[5px] cursor-pointer text-[#003580]">
              Register
            </button>
            <button className="ml-[20px] border-none bg-inherit px-[10px] py-[5px] cursor-pointer text-[#003580]">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
