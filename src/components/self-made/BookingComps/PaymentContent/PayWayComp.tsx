import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import PayPalButton from "./PayPalButton";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type PayWay = "card" | "google" | "paypal";

interface PropsTypes {
  totalPrice1: number;
  handlePaymentSuccess: (data: any) => void;
  handlePaymentError: (error: any) => void;
  form: UseFormReturn<
    {
      cardHolderName: string;
      cardNumber: string;
      expirationDate: string;
      cvc: string;
    },
    any,
    undefined
  >;
}

function PayWayComp({
  totalPrice1,
  handlePaymentSuccess,
  handlePaymentError,
  form,
}: PropsTypes) {
  const [payWay, setPayway] = useState<PayWay>("card");

  return (
    <div className="border-[1px] rounded-md flex flex-col px-4 py-5">
      <h2 className="font-bold text-xl mb-12">How do you want to pay?</h2>
      <div className="flex gap-6">
        <div>
          <div
            className={`relative border rounded-md w-36 h-24 flex justify-center items-center shadow-lg cursor-pointer ${
              payWay === "card" && "border-nav_btn_text border-2"
            }`}
            onClick={() => setPayway("card")}
          >
            <input
              type="checkbox"
              className="absolute w-8 h-4 top-2 left-0"
              checked={payWay === "card" ? true : false}
            />
            <div className="w-20">
              <img src="/src/images/Credit_Card-02-512.webp" alt="" />
            </div>
          </div>
          <p className="text-sm text-center mt-2">New card</p>
        </div>
        <div>
          <div
            className={`relative border rounded-md w-36 h-24 flex justify-center items-center shadow-lg cursor-pointer ${
              payWay === "google" && "border-nav_btn_text border-2"
            }`}
            onClick={() => setPayway("google")}
          >
            <input
              type="checkbox"
              className="absolute w-8 h-4 top-2 left-0"
              checked={payWay === "google" ? true : false}
            />
            <div className="w-20">
              <img src="/src/images/gpay.png" alt="" />
            </div>
          </div>
          <p className="text-sm text-center mt-2">Google Pay</p>
        </div>
        <div>
          <div
            className={`relative border rounded-md w-36 h-24 flex justify-center items-center shadow-lg cursor-pointer ${
              payWay === "paypal" && "border-nav_btn_text border-2"
            }`}
            onClick={() => setPayway("paypal")}
          >
            <input
              type="checkbox"
              className="absolute w-8 h-4 top-2 left-0"
              checked={payWay === "paypal" ? true : false}
            />
            <div className="w-20">
              <img src="/src/images/paypal.png" alt="" />
            </div>
          </div>
          <p className="text-sm text-center mt-2">PayPal</p>
        </div>
      </div>

      {/*new card*/}
      {payWay === "card" && (
        <div className="mt-5 flex flex-col gap-4">
          <p className="font-bold">New card</p>

          <FormField
            control={form.control}
            name="cardHolderName"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 flex flex-col gap-1">
                <FormLabel className="font-bold">
                  Cardholder's name{" "}
                  <span className="font-bold text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-[1px] border-gray-400 p-2"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2 flex flex-col gap-1">
                <FormLabel className="font-bold">
                  Card number <span className="font-bold text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="border-[1px] border-gray-400 p-2"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-4 w-full md:w-1/2">
            <FormField
              control={form.control}
              name="expirationDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 flex flex-col gap-1">
                  <FormLabel className="font-bold">
                    Expiration date{" "}
                    <span className="font-bold text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="MM/YY"
                      className="border-[1px] border-gray-400 p-2"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvc"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 flex flex-col gap-1">
                  <FormLabel className="font-bold">
                    CVC <span className="font-bold text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="border-[1px] border-gray-400 p-2"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="mb-7">
            <div className="flex items-center gap-2">
              <Switch className="" />
              <p className="text-sm">Save card for future purchases</p>
            </div>
          </div>
        </div>
      )}
      {/*google pay*/}
      {payWay === "google" && (
        <div className="mt-5 flex flex-col gap-4">
          <p className=" font-bold">Google Pay</p>
          <p className="text-sm">
            Click the Google Pay button to log in to your account - stay on
            Google Pay's page until we direct you back to review and complete
            your booking.
          </p>
          <div>
            <Button className="bg-black px-8">
              <div className="w-12">
                <img
                  src="/src/images/a6e57a36a76f1b5da10c3eaed61fc58f.jpg"
                  alt=""
                />
              </div>
              <Separator
                orientation="vertical"
                className="bg-gray-600 w-[2px]"
              />
              <p className="ml-2">Pay now or later</p>
            </Button>
          </div>
        </div>
      )}
      {/*paypal pay*/}
      {payWay === "paypal" && (
        <div className="mt-5 flex flex-col gap-4">
          <p className=" font-bold">Paypal</p>
          <div className="flex items-center gap-2">
            <Switch className="" />
            <p className="text-sm">
              Save your PayPal account for faster payment next time
            </p>
          </div>
          <p className="text-sm">
            Click the PayPal button to log in to your account - stay on PayPal's
            page until we direct you back to review and complete your booking.
          </p>
          <div>
            <PayPalButton
              totalAmount={totalPrice1}
              currency="USD"
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PayWayComp;
