import { ChevronRight, Tag } from "lucide-react";
import { Button } from "../../../ui/button";
import { User } from "@/context/AuthContext";
import { Options } from "@/context/SearchContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import SignedInComp from "./SignedInComp";
import SignedOutComp from "./SignedOutComp";
import DetailsFormComp from "./DetailsFormComp";
import GoodToKnowComp from "./GoodToKnowComp";
import RoomComp from "./RoomComp";
import AddToYourStayComp from "./AddToYourStayComp";
import SpecialRequestsComp from "./SpecialRequestsComp";
import YourArrivalComp from "./YourArrivalComp";

interface PropsTypes {
  loggedInUser: User | null | undefined;
  dateSevenDaysBefore: Date | null;
  options1: Options;
  setNextStep: React.Dispatch<React.SetStateAction<boolean>>;
}

const REGEX_DIGITS = /^[0-9]+$/;

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email({ message: "Invalid email address" }),
  country: z.string(),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be 10 digits long")
    .regex(REGEX_DIGITS, { message: "Telephone must contain only digits" }),
  wantFreePaperlessConfirmation: z.boolean().optional(),
  wantUpdate: z.boolean().optional(),
  bookingFor: z.enum(["me", "another"]),
  isWorkTravel: z.enum(["yes", "no"]),
  fullGuestName: z.string().optional(),
  wantTaxi: z.boolean().optional(),
  wantRentCar: z.boolean().optional(),
  message: z.string().optional(),
  // timeArrival: z.number().optional(),
});

function BookingContent({
  loggedInUser,
  dateSevenDaysBefore,
  options1,
  setNextStep,
}: PropsTypes) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: loggedInUser?.username || "",
      lastName: "",
      email: loggedInUser?.email || "",
      country: loggedInUser?.country || "",
      phoneNumber: loggedInUser?.phone || "",
      wantFreePaperlessConfirmation: false,
      wantUpdate: false,
      bookingFor: "me",
      isWorkTravel: "no",
      fullGuestName: "",
      wantTaxi: false,
      wantRentCar: false,
      message: "",
      // timeArrival:0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values: ", values);
    setNextStep(true);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="flex flex-col gap-4">
          {/* Sign-in validation */}
          {!loggedInUser ? (
            <SignedOutComp />
          ) : (
            <SignedInComp loggedInUser={loggedInUser} />
          )}

          {/* Details form */}
          <DetailsFormComp form={form} />

          {/* Good to know */}
          <GoodToKnowComp dateSevenDaysBefore={dateSevenDaysBefore} />

          {/* Standard Room */}
          <RoomComp
            form={form}
            dateSevenDaysBefore={dateSevenDaysBefore}
            options1={options1}
          />
          {/* Add to your stay */}
          <AddToYourStayComp form={form} />

          {/* Special requests */}
          <SpecialRequestsComp form={form} />

          {/* Your arrival time */}
          <YourArrivalComp />

          {/* button */}
          <div className="flex justify-end">
            <div className="flex flex-row-reverse gap-4 items-center mt-3">
              <Button
                type="submit"
                // onClick={() => setNextStep(true)}
                className="bg-nav_btn_text rounded-[5px] text-[16px] py-6 hover:bg-blue_1"
              >
                Next: Final details
                <ChevronRight />
              </Button>
              <div className="flex gap-2 items-center">
                <Tag
                  className="text-nav_btn_text"
                  size={"16px"}
                  strokeWidth={1.5}
                />
                <p className="text-nav_btn_text text-sm font-semibold">
                  We Price Match
                </p>
              </div>
            </div>
          </div>
          <p className="text-end mt-4 text-sm font-bold underline">
            What are my booking conditions?
          </p>
        </div>
      </form>
    </Form>
  );
}

export default BookingContent;
