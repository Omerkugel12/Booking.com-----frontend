import { UserRound } from "lucide-react";
import { Link } from "react-router-dom";

function SignedOutComp() {
  return (
    <div className="border-[1px] rounded-md flex p-3 gap-2 items-center">
      <UserRound strokeWidth={1.1} className="text-nav_btn_text" size="26px" />
      <p className="text-sm">
        <Link to={"/auth/login"} className="text-nav_btn_text">
          Sign in
        </Link>{" "}
        to book with your saved details or{" "}
        <Link to={"/auth/register"} className="text-nav_btn_text">
          register
        </Link>{" "}
        to manage your bookings on the go!
      </p>
    </div>
  );
}

export default SignedOutComp;
