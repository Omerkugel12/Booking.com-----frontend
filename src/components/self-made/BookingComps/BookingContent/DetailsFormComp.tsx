import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle } from "lucide-react";
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

function DetailsFormComp({ form }: PropsTypes) {
  return (
    <div className="border-[1px] rounded-md p-3">
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-xl">Enter your details</h2>
        <Alert className="bg-gray_1 border-[1px] border-gray-500">
          <div className="flex items-center gap-3 h-5">
            <AlertCircle className="text-sm text-gray-700" />
            <AlertDescription className="text-sm text-gray-700">
              Almost done! Just fill in the{" "}
              <span className="text-red-700 font-bold">*</span> required info
            </AlertDescription>
          </div>
        </Alert>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4">
            {/*firstName*/}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-1/2 flex flex-col gap-1">
                  <FormLabel className="font-bold">
                    First Name <span className="font-bold text-red-600">*</span>
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
                    Last Name <span className="font-bold text-red-600">*</span>
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
                <FormLabel className="text-sm font-bold">
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
              </FormItem>
            )}
          />
          {/*country*/}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold">
                  Country/Region{" "}
                  <span className="font-bold text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-1/2 border-[1px] border-gray-400"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/*phone*/}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold">
                  Telephone (mobile number preferred){" "}
                  <span className="font-bold text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-1/2 border-[1px] border-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Needed by the property to validate your booking
                </FormDescription>
              </FormItem>
            )}
          />
          <div>
            <div className="flex flex-col gap-3 pb-4 border-b-[1px]">
              <FormField
                control={form.control}
                name="wantFreePaperlessConfirmation"
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
                          Yes, I want free paperless confirmation (recommended)
                        </p>

                        <FormDescription className="text-[0.7rem]">
                          We'll text you a link to download our app
                        </FormDescription>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="wantUpdate"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                      </FormControl>
                      <FormLabel className="font-normal flex flex-col gap-2">
                        Update my account to include these new details
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="bookingFor"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-4">
                    <FormLabel className="font-bold">
                      Who are you booking for?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="me" id="me" />
                          <Label htmlFor="me" className="font-normal">
                            I'm the main guest
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="another" id="another" />
                          <Label htmlFor="another" className="font-normal">
                            I'm booking for someone else
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isWorkTravel"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 pb-5">
                    <FormLabel className="font-bold">
                      Are you traveling for work?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="yes" />
                          <Label htmlFor="">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="no" />
                          <Label htmlFor="no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsFormComp;
