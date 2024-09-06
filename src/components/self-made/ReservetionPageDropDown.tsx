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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AddReviewForm from "../self-made/DetailsPage/AddReviewForm";
import { useState } from "react";

interface ReservationDropdownProps {
  isCompleted: boolean;
  onBookAgain: () => void;
  onCancelBooking: () => void;
  onRemoveBooking: () => void;
  hotel: any;
  setReviews: (reviews: any) => void;
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
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  return (
    <>
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
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    setIsDialogOpen(true);
                  }}
                >
                  Add A Review
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault(); // Prevent the dropdown from closing
                    onBookAgain(); // Call the book again function
                  }}
                >
                  Book Again
                </DropdownMenuItem>
                {/* Remove Booking with AlertDialog */}
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault(); // Prevent the dropdown from closing
                    setIsRemoveDialogOpen(true); // Open the Remove dialog
                  }}
                >
                  Remove Booking
                </DropdownMenuItem>
              </>
            ) : (
              <>
                {/* Cancel Booking with AlertDialog */}
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault(); // Prevent the dropdown from closing
                    setIsCancelDialogOpen(true); // Open the Cancel dialog
                  }}
                >
                  Cancel Booking
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog for Add Review */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <AddReviewForm
            hotel={hotel}
            setReviews={setReviews}
            setIsDialogOpen={setIsDialogOpen}
          />
        </DialogContent>
      </Dialog>

      {/* Cancel Booking AlertDialog */}
      <AlertDialog
        open={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to cancel this booking?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will cancel your booking.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsCancelDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onCancelBooking();
                setIsCancelDialogOpen(false);
              }}
            >
              Cancel Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove Booking AlertDialog */}
      <AlertDialog
        open={isRemoveDialogOpen}
        onOpenChange={setIsRemoveDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to remove this booking?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The booking will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsRemoveDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onRemoveBooking();
                setIsRemoveDialogOpen(false);
              }}
            >
              Remove Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ReservationDropdown;
