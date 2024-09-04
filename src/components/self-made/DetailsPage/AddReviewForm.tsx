import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(30, "Username must be at most 30 characters long."),
  date: z.string(),
});

function AddReviewForm({ hotel }: PropsTypes) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hotelID: "" /*hotel._id*/,
      staff: 5,
      facilities: 5,
      cleanliness: 5,
      freeWifi: 5,
      location: 5,
      valueForMoney: 5,
      comfort: 5,
      text: "",
      userID: "" /*loggedInUser._id*/,
      username: "" /*loggedInUser.email.slice(0,)*/,
      date: "" /*new Date() --- format like SQL*/,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <DialogContent className="max-w-[40%]">
      <DialogHeader>
        <DialogTitle className="font-bold">{`Add your review for ${hotel.name}`}</DialogTitle>
      </DialogHeader>
      <div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="staff"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Staff</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          {/* <Textarea
          placeholder="Write a brief review..."
          className="border border-gray-300 rounded-md p-4 w-full"
        /> */}
        </div>
      </div>
    </DialogContent>
  );
}

export default AddReviewForm;
