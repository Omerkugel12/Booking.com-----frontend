import React, { useState } from "react";
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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddReviewForm from "../self-made/DetailsPage/AddReviewForm"; // Assuming you have the review form component

interface ReservationDropdownProps {
  isCompleted: boolean;
  onBookAgain: () => void;
  onCancelBooking: () => void;
  onRemoveBooking: () => void;
  hotel: any; // Assuming hotel information is passed down for the review form
  setReviews: (reviews: any) => void; // Assuming this function updates the reviews
}

const ReservationDropdown: React.FC<ReservationDropdownProps> = ({
  isCompleted,
  onBookAgain,
  onCancelBooking,
  onRemoveBooking,
  hotel,
  setReviews,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
              {/* Wrap 'Add A Review' with Dialog */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault(); // Prevent dropdown from closing
                      setIsDialogOpen(true);
                    }}
                  >
                    Add A Review
                  </DropdownMenuItem>
                </DialogTrigger>
                <AddReviewForm
                  hotel={hotel}
                  setReviews={setReviews}
                  setIsDialogOpen={setIsDialogOpen}
                />
              </Dialog>
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
