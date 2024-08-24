import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ShieldQuestion } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import { z } from "zod";
import { Form, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const formSchema = z.object({
  password: z.string(),
});

function LoginPage({ email }: { email: string }) {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  function handleLoginSubmit(values: z.infer<typeof formSchema>) {
    const data = { email, password: values.password };
    login(data);
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
        <div className="max-w-96 w-full flex flex-col space-y-5">
          <h1 className="text-xl font-extrabold">Enter your password</h1>
          <div>
            <p>Please enter your Booking.com password for</p>
            <p className="font-bold">{email}</p>
          </div>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleLoginSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-0">
                    <FormLabel>Password</FormLabel>
                    <FormControl className="">
                      <div className="relative">
                        <Input
                          className="focus:border-2 focus:border-nav_btn_text"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <div
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-3"
                        >
                          {showPassword ? (
                            <EyeOff className="size-5 text-gray-500" />
                          ) : (
                            <Eye className="size-5 text-gray-500" />
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
                Sign-in
              </Button>
            </form>
          </FormProvider>
          <p className="text-center">or</p>
          <div className="flex flex-col space-y-6 py-8 border-y-[1px]">
            <Button className="bg-transparent border border-nav_btn_text text-nav_btn_text rounded-[5px] text-[16px] py-6 hover:bg-blue_2">
              Sign in with verification link
            </Button>
            <p className="text-nav_btn_text font-semibold text-center text-sm cursor-pointer">
              Forgotten your password?
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center text-[0.7rem] ">
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

export default LoginPage;
