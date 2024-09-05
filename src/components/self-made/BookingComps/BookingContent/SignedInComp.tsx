import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/context/AuthContext";

interface PropsTypes {
  loggedInUser: User;
}

function SignedInComp({ loggedInUser }: PropsTypes) {
  return (
    <div className="border-[1px] rounded-md flex p-3 gap-2 items-center">
      <div className="flex gap-4 items-center">
        <Avatar className="w-12 h-12">
          <AvatarImage src="" />
          <AvatarFallback className="bg-green text-lg text-white font-bold border-2 border-yellow">
            {loggedInUser.email.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-between">
          <p className="text-black tex-sm font-bold">You are signed in</p>
          <p className="text-gray-500 text-sm">{loggedInUser.email}</p>
        </div>
      </div>
    </div>
  );
}

export default SignedInComp;
