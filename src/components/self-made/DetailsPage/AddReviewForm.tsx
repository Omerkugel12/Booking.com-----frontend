import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { HotelDetails } from "@/models/Hotel.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface PropsTypes {
  hotel: HotelDetails;
}

const formSchema = z.object({
  hotelID: z.string(),
  staff: z
    .number()
    .min(1, "Staff rating must be at least 1.")
    .max(10, "Staff rating must be at most 10."), // Rating scale of 1-10
  facilities: z
    .number()
    .min(1, "Facilities rating must be at least 1.")
    .max(10, "Facilities rating must be at most 10."), // Rating scale of 1-10
  cleanliness: z
    .number()
    .min(1, "Cleanliness rating must be at least 1.")
    .max(10, "Cleanliness rating must be at most 10."), // Rating scale of 1-10
  freeWifi: z
    .number()
    .min(1, "Free Wifi rating must be at least 1.")
    .max(10, "Free Wifi rating must be at most 10."), // Rating scale of 1-10
  location: z
    .number()
    .min(1, "Location rating must be at least 1.")
    .max(10, "Location rating must be at most 10."), // Rating scale of 1-10
  valueForMoney: z
    .number()
    .min(1, "Value for money rating must be at least 1.")
    .max(10, "Value for money rating must be at most 10."), // Rating scale of 1-10
  comfort: z
    .number()
    .min(1, "Comfort rating must be at least 1.")
    .max(10, "Comfort rating must be at most 10."), // Rating scale of 1-10
  text: z
    .string()
    .min(10, "Review text must be at least 10 characters long.")
    .max(500, "Review text must be at most 500 characters long."),
  userID: z.string(),
});

function AddReviewForm({ hotel }: PropsTypes) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  return (
    <DialogContent className="max-w-[40%]">
      <DialogHeader>
        <DialogTitle className="font-bold">{`Add your review for ${hotel.name}`}</DialogTitle>
      </DialogHeader>
      <div>
        <Textarea
          placeholder="Write a brief review..."
          className="border border-gray-300 rounded-md p-4 w-full"
        />
      </div>
    </DialogContent>
  );
}

export default AddReviewForm;
