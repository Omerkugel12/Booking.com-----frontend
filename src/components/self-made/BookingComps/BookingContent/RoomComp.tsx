import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Options } from "@/context/SearchContext";
import { format } from "date-fns";
import {
  Building2,
  Check,
  CigaretteOff,
  Coffee,
  CoffeeIcon,
  Monitor,
  ShowerHead,
  Snowflake,
  Sparkles,
  Users,
  Utensils,
  Volume,
} from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface PropsTypes {
  form: UseFormReturn<
    {
      firstName: string;
      lastName: string;
      email: string;
      country: string;
      phoneNumber: string;
      bookingFor: "me" | "another";
      isWorkTravel: "yes" | "no";
      message?: string | undefined;
      wantFreePaperlessConfirmation?: boolean | undefined;
      wantUpdate?: boolean | undefined;
      fullGuestName?: string | undefined;
      wantTaxi?: boolean | undefined;
      wantRentCar?: boolean | undefined;
    },
    any,
    undefined
  >;
  dateSevenDaysBefore: Date | null;
  options1: Options;
}

function RoomComp({ form, dateSevenDaysBefore, options1 }: PropsTypes) {
  return (
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
            <p className="text-sm text-slate-500">Sparkly clean rooms - 9.0</p>
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
          <FormField
            control={form.control}
            name="fullGuestName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Guest Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First name, Last name"
                    className="w-1/2 border-[1px] border-gray-400"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default RoomComp;
