import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HotelDetails, Review } from "@/models/Hotel.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Star,
  Home,
  Smile,
  Wifi,
  MapPin,
  DollarSign,
  Coffee,
  PenTool,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api.service";
import { useToast } from "@/hooks/use-toast";

interface PropsTypes {
  hotel: HotelDetails;
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
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
});

function AddReviewForm({ hotel, setReviews, setIsDialogOpen }: PropsTypes) {
  const { loggedInUser } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      staff: 5,
      facilities: 5,
      cleanliness: 5,
      freeWifi: 5,
      location: 5,
      valueForMoney: 5,
      comfort: 5,
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(hotel);

    const newReview: Review = {
      hotelID: hotel.hotelId || hotel.hotelID,
      staff: values.staff,
      facilities: values.facilities,
      cleanliness: values.cleanliness,
      freeWifi: values.freeWifi,
      location: values.location,
      valueForMoney: values.valueForMoney,
      comfort: values.comfort,
      text: values.text,
      userID: loggedInUser?._id as string,
      username: loggedInUser?.email.slice(0, 4) as string,
      date: new Date().toISOString().slice(0, 10),
    };

    try {
      const { data } = await api.post("/reviews", newReview);
      console.log(data);

      toast({
        description: "Your review added successfuly!",
      });

      setReviews((prev) => {
        return [...prev, newReview];
      });

      setIsDialogOpen(false);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong!",
      });
    }
  }

  return (
    <div className="">
      <DialogHeader>
        <DialogTitle className="font-bold mb-8">{`Add your review for ${hotel.name}`}</DialogTitle>
      </DialogHeader>
      <div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="staff"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Smile className="text-gray-500" />
                        Staff
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          max={10}
                          min={1}
                          className="w-full border border-gray-300 rounded-md px-4 py-2"
                          {...field}
                          value={field.value || ""}
                          onChange={(ev) =>
                            field.onChange(ev.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="facilities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Home className="text-gray-500" />
                        Facilities
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          max={10}
                          min={1}
                          className="w-full border border-gray-300 rounded-md px-4 py-2"
                          {...field}
                          value={field.value || ""}
                          onChange={(ev) =>
                            field.onChange(ev.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cleanliness"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Star className="text-gray-500" />
                        Cleanliness
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          max={10}
                          min={1}
                          className="w-full border border-gray-300 rounded-md px-4 py-2"
                          {...field}
                          value={field.value || ""}
                          onChange={(ev) =>
                            field.onChange(ev.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="freeWifi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Wifi className="text-gray-500" />
                        Free Wifi
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          max={10}
                          min={1}
                          className="w-full border border-gray-300 rounded-md px-4 py-2"
                          {...field}
                          value={field.value || ""}
                          onChange={(ev) =>
                            field.onChange(ev.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="text-gray-500" />
                        Location
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          max={10}
                          min={1}
                          className="w-full border border-gray-300 rounded-md px-4 py-2"
                          {...field}
                          value={field.value || ""}
                          onChange={(ev) =>
                            field.onChange(ev.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="valueForMoney"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <DollarSign className="text-gray-500" />
                        Value for Money
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          max={10}
                          min={1}
                          className="w-full border border-gray-300 rounded-md px-4 py-2"
                          {...field}
                          value={field.value || ""}
                          onChange={(ev) =>
                            field.onChange(ev.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="comfort"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Coffee className="text-gray-500" />
                        Comfort
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          max={10}
                          min={1}
                          className="w-full border border-gray-300 rounded-md px-4 py-2"
                          {...field}
                          value={field.value || ""}
                          onChange={(ev) =>
                            field.onChange(ev.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <PenTool className="text-gray-500" />
                      Review
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a brief review..."
                        className="border border-gray-300 rounded-md p-4 w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Publish Review
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddReviewForm;
