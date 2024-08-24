import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ShieldQuestion } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const formSchema = z
  .object({
    password: z
      .string({ message: "Password is required" })
      .min(10, { message: "Password must be at least 10 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must include at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must include at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must include at least one number" }),
    confirmPassword: z.string({ message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function RegisterPage({ email }: { email: string }) {
  const { register } = useAuth();
  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function handleRegisterSubmit(values: z.infer<typeof formSchema>) {
    const data = { email, password: values.password };
    register(data);
  }

  return (
    <>
      <nav className="flex justify-between items-center bg-blue_1 px-40 ">
        <Link to={"/"} className="w-40">
          <img src="/src/images/Booking_Com_Logotype_Aug2020_White_Blue-BG.png" />
        </Link>
        <div className="flex flex-row-reverse items-center">
          <div className="flex flex-row-reverse gap-3">
            <Button className="bg-blue_1 rounded-sm hover:bg-hover">
              <div className="absolute">
                <p className="">
                  <ShieldQuestion strokeWidth={1.3} />
                </p>
              </div>
            </Button>
            <Button className="bg-blue_1 rounded-sm hover:bg-hover">
              <div className=" flex justify-center size-6 rounded-full overflow-hidden ">
                <img src="/src/images/US.png" alt="" />
              </div>
            </Button>
          </div>
        </div>
      </nav>
      <main className="flex justify-center pt-2">
        <div className="max-w-[375px] w-full flex flex-col space-y-5 mt-14">
          <h1 className="text-xl font-extrabold">Create password</h1>
          <div>
            <p className="text-sm">
              Use a minimum of 10 characters, including uppercase letters,
              lowercase letters, and numbers.
            </p>
          </div>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegisterSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-0">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-4 relative">
                        <Input
                          className="focus:border-2 focus:border-nav_btn_text"
                          type={showPassword2 ? "text" : "password"}
                          placeholder="Enter a password"
                          {...field}
                        />
                        <div
                          onClick={() => setShowPassword2(!showPassword2)}
                          className="absolute right-2 top-3"
                        >
                          {showPassword2 ? (
                            <Eye className="size-5 text-gray-500" />
                          ) : (
                            <EyeOff className="size-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-0">
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-4 relative">
                        <Input
                          className="focus:border-2 focus:border-nav_btn_text"
                          type={showPassword1 ? "text" : "password"}
                          placeholder="Confirm your password"
                          {...field}
                        />
                        <div
                          onClick={() => setShowPassword1(!showPassword1)}
                          className="absolute right-2 top-3"
                        >
                          {showPassword1 ? (
                            <Eye className="size-5 text-gray-500" />
                          ) : (
                            <EyeOff className="size-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-nav_btn_text rounded-[5px] text-[16px] py-6 hover:bg-blue_1"
              >
                Create account
              </Button>
            </form>
          </FormProvider>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center text-[0.7rem] border-t-[1px] py-6">
              <p>
                By signing in or creating an account, you agree with our Terms &
              </p>
              <p>Conditions and Privacy Statement</p>
            </div>
            <div className="flex flex-col items-center text-[0.7rem]">
              <p>All rights reserved.</p>
              <p>Copyright (2006-2024) - Booking.com™</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default RegisterPage;
