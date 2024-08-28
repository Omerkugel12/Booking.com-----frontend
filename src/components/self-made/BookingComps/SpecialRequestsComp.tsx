import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
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
}

function SpecialRequestsComp({ form }: PropsTypes) {
  return (
    <div className="border-[1px] rounded-md flex flex-col p-3 gap-5">
      <h2 className="font-bold text-xl">Special requests</h2>
      <p className="text-sm">
        Special requests can't be guaranteed, but the property will do its best
        to meet your needs. You can always make a special request after your
        booking is complete.
      </p>
      <div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold">
                Please write your requests in English or Hebrew.{" "}
                <span className="text-[0.7rem] font-normal text-gray-600">
                  (optional)
                </span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none border-[1px] border-black"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default SpecialRequestsComp;
