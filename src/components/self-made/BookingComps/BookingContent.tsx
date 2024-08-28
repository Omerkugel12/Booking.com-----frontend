import {
  AlertCircle,
  Building2,
  Check,
  ChevronRight,
  CigaretteOff,
  CircleCheck,
  Coffee,
  CoffeeIcon,
  ConciergeBell,
  Monitor,
  ShowerHead,
  Snowflake,
  Sparkles,
  Tag,
  UserRound,
  Users,
  Utensils,
  Volume,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { format } from "date-fns";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import airportTaxies from "@/images/airportTaxies.svg";
import carRental from "@/images/carRental.svg";
import { User } from "@/context/AuthContext";
import { Options } from "@/context/SearchContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
  wantRenrCar: z.boolean().optional(),
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
      wantRenrCar: false,
      message: "",
      // timeArrival:0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values: ", values);
    setNextStep(true);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="flex flex-col gap-4">
          {/* Sign-in validation */}
          {!loggedInUser ? (
            <div className="border-[1px] rounded-md flex p-3 gap-2 items-center">
              <UserRound
                strokeWidth={1.1}
                className="text-nav_btn_text"
                size="26px"
              />
              <p className="text-sm">
                <Link to={"/auth/login"} className="text-nav_btn_text">
                  Sign in
                </Link>{" "}
                to book with your saved details or{" "}
                <Link to={"/auth/register"} className="text-nav_btn_text">
                  register
                </Link>{" "}
                to manage your bookings on the go!
              </p>
            </div>
          ) : (
            <div className="border-[1px] rounded-md flex p-3 gap-2 items-center">
              <div className="flex gap-4 items-center">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-green text-lg text-white font-bold border-2 border-yellow">
                    {loggedInUser.email.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-between">
                  <p className="text-black tex-sm font-bold">
                    You are signed in
                  </p>
                  <p className="text-gray-500 text-sm">{loggedInUser.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Details form */}
          <div className="border-[1px] rounded-md p-3">
            <div className="flex flex-col gap-5">
              <h2 className="font-bold text-xl">Enter your details</h2>
              <Alert className="bg-gray_1 border-[1px] border-gray-500">
                <div className="flex items-center gap-3 h-5">
                  <AlertCircle className="text-sm text-gray-700" />
                  <AlertDescription className="text-sm text-gray-700">
                    Almost done! Just fill in the{" "}
                    <span className="text-red-700 font-bold">*</span> required
                    info
                  </AlertDescription>
                </div>
              </Alert>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between gap-4">
                  {/*firstName*/}
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-1/2 flex flex-col gap-1">
                        <FormLabel className="font-bold">
                          First Name{" "}
                          <span className="font-bold text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border-[1px] border-gray-400"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {/*lastName*/}
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-1/2 flex flex-col gap-1">
                        <FormLabel className="font-bold">
                          Last Name{" "}
                          <span className="font-bold text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border-[1px] border-gray-400"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                {/*email*/}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel>
                        Email Address{" "}
                        <span className="font-bold text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-1/2 border-[1px] border-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Confirmation email sent to this address
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/*country*/}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Country/Region{" "}
                        <span className="font-bold text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/*phone*/}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telephone (mobile number preferred)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Needed by the property to validate your booking
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Good to know */}
          <div className="border-[1px] rounded-md flex flex-col p-3 gap-2">
            <h2 className="font-bold text-xl">Good to know:</h2>
            <div className="flex gap-4">
              <CircleCheck className="text-green" strokeWidth={1.8} />
              <p>
                Stay flexible: You can cancel for free before{" "}
                <span>
                  {dateSevenDaysBefore
                    ? format(dateSevenDaysBefore, "MMMM d, yyyy")
                    : "N/A"}{" "}
                </span>{" "}
                - lock in this great price today.
              </p>
            </div>
          </div>
          {/* Standard Room */}
          <div className="border-[1px] rounded-md flex flex-col p-3 gap-2">
            <h2 className="font-bold text-xl">Standard Room</h2>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Coffee color="#227733" strokeWidth={1} size={"20px"} />
                <div>
                  <p className="text-green text-sm font-bold">
                    Breakfast included in the price
                  </p>
                  <p className="text-[0.7rem] text-gray-600 font-normal">
                    8.2 Very Good ~{" "}
                    <span className="text-[0.7rem] ">105 reviews</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Check color="#227733" strokeWidth={1} size={"20px"} />
                <p className="text-green text-sm font-bold">
                  Free cancellation before{" "}
                  <span>
                    {dateSevenDaysBefore
                      ? format(dateSevenDaysBefore, "MMMM d, yyyy")
                      : "N/A"}{" "}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <Users strokeWidth={1} size={"20px"} />
                <p className="font-bold text-sm">
                  <span className="text-sm">Guests:</span> {options1.adults}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles strokeWidth={1} size={"20px"} />
                  <p className="text-sm text-slate-500">
                    Sparkly clean rooms - 9.0
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CigaretteOff strokeWidth={1} size={"20px"} />
                  <p className="text-sm text-slate-500">No smoking</p>
                </div>
              </div>
              <div className="flex gap-1 flex-wrap">
                <span className="flex items-center border-[1px] border-black rounded-sm px-1 gap-1">
                  <Building2 color="#000000" strokeWidth={1} size={"16px"} />
                  <p className="text-[0.75rem]">City view</p>
                </span>
                <span className="flex items-center border-[1px] border-black rounded-sm px-1 gap-1">
                  <Snowflake color="#000000" strokeWidth={1} size={"16px"} />
                  <p className="text-[0.75rem]">Air conditioning</p>
                </span>
                <span className="flex items-center border-[1px] border-black rounded-sm px-1 gap-1">
                  <ShowerHead color="#000000" strokeWidth={1} size={"16px"} />
                  <p className="text-[0.75rem]">Private Bathroom</p>
                </span>
                <span className="flex items-center border-[1px] border-black rounded-sm px-1 gap-1">
                  <Monitor color="#000000" strokeWidth={1} size={"16px"} />
                  <p className="text-[0.75rem]">Flat-screen TV</p>
                </span>
                <span className="flex items-center border-[1px] border-black rounded-sm px-1 gap-1">
                  <Volume color="#000000" strokeWidth={1} size={"16px"} />
                  <p className="text-[0.75rem]">Soundproof</p>
                </span>
                <span className="flex items-center border-[1px] border-black rounded-sm px-1 gap-1">
                  <CoffeeIcon color="#000000" strokeWidth={1} size={"16px"} />
                  <p className="text-[0.75rem]">Coffee machine</p>
                </span>
                <span className="flex items-center border-[1px] border-black rounded-sm px-1 gap-1">
                  <Utensils color="#000000" strokeWidth={1} size={"16px"} />
                  <p className="text-[0.75rem]">Minibar</p>
                </span>
              </div>
              <div>
                <label htmlFor="Full_Guest_Name" className="text-sm font-bold">
                  Full Guest Name
                </label>
                <Input
                  id="Full_Guest_Name"
                  placeholder="First name, Last name"
                  className="w-1/2"
                />
              </div>
            </div>
          </div>
          {/* Add to your stay */}
          <div className="border-[1px] rounded-md flex flex-col p-3 gap-2">
            <h2 className="font-bold text-xl">Add to your stay</h2>
            <main>
              <section className="flex border-b py-3 justify-between">
                <div className="flex items-start gap-2">
                  <Checkbox />
                  <div className="">
                    <p className="text-sm">
                      I'm interested in booking an airport taxi with 10% off
                    </p>
                    <p className="text-[0.7rem] text-gray-700">
                      Save 10% on all airport taxis when you book with us –
                      we'll add taxi options to your booking confirmation.
                    </p>
                  </div>
                </div>
                <img src={airportTaxies} alt="Airport Taxis" />
              </section>
              <section className="flex pt-3 justify-between">
                <div className="flex items-start gap-2">
                  <Checkbox />
                  <div className="">
                    <p className="text-sm">I'm interested in renting a car</p>
                    <p className="text-[0.7rem] text-gray-700">
                      Make the most of your trip - check out car rental options
                      in your booking confirmation.
                    </p>
                  </div>
                </div>
                <img src={carRental} alt="Car Rentals" />
              </section>
            </main>
          </div>
          {/* Special requests */}
          <div className="border-[1px] rounded-md flex flex-col p-3 gap-5">
            <h2 className="font-bold text-xl">Special requests</h2>
            <p className="text-sm">
              Special requests can't be guaranteed, but the property will do its
              best to meet your needs. You can always make a special request
              after your booking is complete.
            </p>
            <div>
              <label htmlFor="special_requests" className="text-sm font-bold">
                Please write your requests in English or Hebrew.{" "}
                <span className="text-[0.7rem] font-normal text-gray-600">
                  (optional)
                </span>
              </label>
              <Textarea name="special_request" id="special_requests" />
            </div>
          </div>
          {/* Your arrival time */}
          <div className="border-[1px] rounded-md flex flex-col p-3 gap-4">
            <h2 className="font-bold text-xl">Your arrival time</h2>
            <div className="flex gap-2 items-center">
              <CircleCheck
                className="text-green"
                strokeWidth={1.5}
                size={"32px"}
              />
              <p className="text-sm">
                Your room will be ready for check-in at 3:00 PM
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <ConciergeBell color="#227733" strokeWidth={1.5} size={"32px"} />
              <p className="text-sm">
                24-hour front desk – help whenever you need it!
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-bold">
                Add your estimated arrival time{" "}
                <span className="text-rose-700">*</span>
              </Label>
              <Select>
                <SelectTrigger className="w-1/2">
                  <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Please select</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-600">
                Time is for Tel Aviv time zone
              </p>
            </div>
          </div>
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
