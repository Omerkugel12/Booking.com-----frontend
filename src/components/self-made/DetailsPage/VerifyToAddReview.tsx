import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface PropsTypes {
  verify: boolean;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
  reservationNumber: z.string().min(1, "Reservation number is required"),
});

function VerifyToAddReview({  setVerify }: PropsTypes) {
  
  const { loggedInUser } = useAuth();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reservationNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const reservationToCheck = {
      userID: loggedInUser?._id,
      reservationID: Number(values.reservationNumber),
    };
    console.log(reservationToCheck);

    try {
      const { data } = await api.post(
        "/reservations/checkReservation",
        reservationToCheck
      );
      console.log(data);
      if (data) {
        setVerify(true);
      } else {
        toast({
          variant: "destructive",
          description:
            "Only visitors that already visited the hotel can add a review.",
        });
      }
    } catch (error: any) {
      console.log(error);
      if (error.code === 400) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `There is no reservation with with reservation number: ${reservationToCheck.reservationID}!`,
        });
      }
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="text-3xl font-bold">Enter your Reservation details</h1>
          <p>
            Check your Reservation confirmation email to find your Reservation
            number
          </p>
          <FormField
            control={form.control}
            name="reservationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resrvation number:</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Reservation number..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Publish Review
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default VerifyToAddReview;
