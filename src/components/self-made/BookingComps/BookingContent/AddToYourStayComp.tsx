import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import airportTaxies from "@/images/airportTaxies.svg";
import carRental from "@/images/carRental.svg";
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

function AddToYourStayComp({ form }: PropsTypes) {
  return (
    <div className="border-[1px] rounded-md flex flex-col p-3 gap-2">
      <h2 className="font-bold text-xl">Add to your stay</h2>
      <main>
        <section className="flex border-b py-3 justify-between">
          <FormField
            control={form.control}
            name="wantTaxi"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
                  <FormLabel className="font-normal flex flex-col gap-2">
                    <p>
                      I'm interested in booking an airport taxi with 10% off
                    </p>

                    <FormDescription className="text-[0.7rem]">
                      Save 10% on all airport taxis when you book with us -
                      we'll add taxi options to your booking confirmation
                    </FormDescription>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <img src={airportTaxies} alt="Airport Taxis" />
        </section>
        <section className="flex pt-3 justify-between">
          <FormField
            control={form.control}
            name="wantRentCar"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
                  <FormLabel className="font-normal flex flex-col gap-2">
                    <p>I'm interested in renting a car off</p>

                    <FormDescription className="text-[0.7rem]">
                      Make the most of your trip - check out car rental options
                      in your booking confirmation.
                    </FormDescription>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <img src={carRental} alt="Car Rentals" />
        </section>
      </main>
    </div>
  );
}

export default AddToYourStayComp;
