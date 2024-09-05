import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ReservationDropdownProps {
  isCompleted: boolean;
  onBookAgain: () => void;
  onCancelBooking: () => void;
  onRemoveBooking: () => void;
}

const ReservationDropdown: React.FC<ReservationDropdownProps> = ({
  isCompleted,
  onBookAgain,
  onCancelBooking,
  onRemoveBooking,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="ml-2 cursor-pointer">
          <EllipsisVertical />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isCompleted ? (
            <>
              <DropdownMenuItem onClick={onBookAgain}>
                Book Again
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onRemoveBooking}>
                Remove Booking
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={onCancelBooking}>
                Cancel Booking
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReservationDropdown;
