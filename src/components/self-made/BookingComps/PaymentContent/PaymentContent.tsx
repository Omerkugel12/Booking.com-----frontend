import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PayWayComp from "./PayWayComp";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { LockKeyhole } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HotelDetails } from "@/models/Hotel.model";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { RoomSelection } from "@/context/ReservationContext";

interface PropsTypes {
  addResrvation: () => Promise<void>;
  totalPrice1: number;
  hotel: HotelDetails | null;
  date1: DateRange | undefined;
  // hotelId: string | undefined;
  // totalRooms: number;
  // totalGuests: number;
  totalDays: number | undefined;
  roomSelections: RoomSelection[];
}

const formSchema = z.object({
  cardHolderName: z
    .string()
    .min(1, { message: "Cardholder name is required." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name must only contain letters and spaces.",
    }),
  cardNumber: z.string().regex(/^4\d{15}$/, {
    message: "Card number must be 16 digits and start with a '4'.",
  }),
  expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, {
    message: "Expiration date must be in MM/YY format.",
  }),
  cvc: z
    .string()
    .length(3, { message: "CVC must be 3 digits." })
    .regex(/^\d+$/, { message: "CVC must contain only numbers." }),
});

function PaymentContent({
  addResrvation,
  totalPrice1,
  hotel,
  date1,
  // hotelId,
  // totalRooms,
  // totalGuests,
  totalDays,
  roomSelections,
}: PropsTypes) {
  const [searchParams] = useSearchParams();

  const handlePaymentSuccess = (data: any) => {
    console.log("Payment successful!", data);
  };

  const handlePaymentError = (error: any) => {
    console.error("Payment failed!", error);
  };

  useEffect(() => {
    const orderId = searchParams.get("token");

    if (orderId) {
      // Capture the payment
      const capturePayment = async () => {
        try {
          const response = await fetch("/api/paypal/capture-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderId }),
          });

          const data = await response.json();

          if (response.ok) {
            handlePaymentSuccess(data);
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          handlePaymentError(error);
        }
      };

      capturePayment();
    }
  }, [searchParams]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardHolderName: "",
      cardNumber: "",
      expirationDate: "",
      cvc: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    addResrvation();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <main className="flex flex-col gap-4">
          <div className="border-[1px] rounded-md flex flex-col px-3 py-5">
            <h2 className="font-bold text-md">You'll pay now on Booking.com</h2>
            <p className="text-sm">
              You'll pay when you complete this booking.
            </p>
          </div>
          <PayWayComp
            totalPrice1={totalPrice1}
            handlePaymentError={handlePaymentError}
            handlePaymentSuccess={handlePaymentSuccess}
            form={form}
          />
          {/*complete booking section*/}
          <section className="flex flex-col gap-3 mt-4 px-4">
            <div className="flex gap-2">
              <Checkbox />
              <p className="text-sm">
                I consent to receiving marketing emails from Booking.com,
                including promotions, personalized recommendations, rewards,
                travel experiences, and updates about Booking.com's products and
                services.
              </p>
            </div>
            <div className="flex gap-2">
              <Checkbox />
              <p className="text-sm">
                I consent to receiving marketing emails from Booking.com,
                including promotions, personalized recommendations, rewards,
                travel experiences, and updates about Booking.com Transport
                Limited's products and services.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[0.7rem]">
                By signing up, you let us tailor offers and content to your
                interests by monitoring how you use Booking.com through tracking
                technologies. Unsubscribe anytime. Read our privacy policy.
              </p>
              <p className="text-sm">
                Your booking is directly with Ramban Emerald and by completing
                this booking you agree to the booking conditions, general terms,
                privacy policy, and Wallet terms.
              </p>
            </div>
          </section>
          <div className="flex justify-end">
            <div className="flex flex-row-reverse gap-4 items-center mt-3">
              <Button
                type="submit"
                className="bg-nav_btn_text rounded-[5px] text-[16px] p-6 hover:bg-blue_1 flex gap-2"
              >
                <LockKeyhole color="#ffffff" />
                <p>Complete booking</p>
              </Button>

              <Dialog>
                <DialogTrigger>
                  <Button
                    type="button"
                    variant="ghost"
                    className="border border-nav_btn_text rounded-[5px] text-[16px] text-nav_btn_text p-6"
                  >
                    Check your booking
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0">
                  <DialogHeader className="border-b-[1px]">
                    <div className="p-5">
                      <DialogTitle className="text-xl font-bold">
                        {hotel?.name}
                      </DialogTitle>
                    </div>
                  </DialogHeader>
                  <DialogHeader className="border-b-[1px] py-2">
                    <div className="px-5">
                      <div className="flex flex-col gap-4 border-b pb-2">
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-semibold">
                            Total length of stay:
                          </p>
                          <p className="text-sm font-bold">{`${totalDays} night`}</p>
                        </div>
                        <section className="flex">
                          {/*left*/}
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold">Check-in</p>
                            <div className="border-r pr-4">
                              <p className="text-md font-bold">
                                {date1?.from &&
                                  format(date1.from, "EEE, MMM d, yyyy")}
                              </p>
                              <p className="text-sm text-gray-600">
                                From 3:00 PM
                              </p>
                            </div>
                          </div>
                          {/*right*/}
                          <div className="flex flex-col gap-1 pl-4">
                            <p className="text-sm font-semibold">Check-out</p>
                            <div className="">
                              <p className="text-md font-bold">
                                {date1?.to &&
                                  format(date1.to, "EEE, MMM d, yyyy")}
                              </p>
                              <p className="text-sm text-gray-600">
                                Until 11:00 AM
                              </p>
                            </div>
                          </div>
                        </section>
                      </div>
                      <div className="py-2 border-b flex flex-col gap-1">
                        {roomSelections.map((roomSelection) => {
                          return (
                            <p className="text-sm font-bold">
                              {`${roomSelection.quantity} x ${roomSelection.roomType}`}
                            </p>
                          );
                        })}
                      </div>
                      <div className="py-2 flex flex-col gap-2">
                        <div className="flex justify-between">
                          <p className="text-md font-bold">Price</p>
                          <p className="text-md font-bold">
                            $ {totalPrice1.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-[0.7rem] text-gray-600">
                          Note: The price shown above includes 17% VAT. If
                          you're a tourist, you may be eligible for a VAT
                          refund.
                        </p>
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="px-4 pb-4">
                    <DialogClose asChild className="p-0">
                      <Button
                        type="button"
                        variant="ghost"
                        className="bg-nav_btn_text text-white rounded-[5px] text-[16px] p-6 hover:bg-blue_1 flex gap-2"
                      >
                        <LockKeyhole color="#ffffff" />
                        <p>Looks good, complete my booking!</p>
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <p className="text-end mt-4 text-sm text-nav_btn_text font-bold underline">
            What are my booking conditions?
          </p>
        </main>
      </form>
    </Form>
  );
}

export default PaymentContent;
