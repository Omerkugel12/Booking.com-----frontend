import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api.service";
import Header from "@/components/self-made/Header";

function AuthPage({
  setEmail,
}: {
  email: string;
  setEmail: (email: string) => void;
}) {
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      setEmail(values.email);
      const res = await api.post("auth/check-email", values);

      res.data.exists === true
        ? navigate("/auth/login")
        : navigate("/auth/register");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header type="auth" />
      <main className="flex justify-center pt-2">
        <div className="max-w-96 w-full flex flex-col">
          <h1 className="text-xl font-extrabold mb-10">
            Sign in or create an account
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-0">
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        className="focus:border-2 focus:border-nav_btn_text"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-nav_btn_text rounded-[5px] text-[16px] py-6 hover:bg-blue_1"
              >
                Continue with email
              </Button>
            </form>
          </Form>
          <p className="text-center mt-4 text-sm">
            or use one of these options
          </p>
          <div className="flex justify-evenly py-8 border-y-[1px]">
            <div className="border w-16 h-16 rounded-sm flex justify-center items-center cursor-pointer hover:border-nav_btn_text">
              <div className="w-6">
                <img src="/src/images/facebook.svg" alt="" className="" />
              </div>
            </div>
            <div className="border w-16 h-16 rounded-sm flex justify-center items-center cursor-pointer hover:border-nav_btn_text">
              <div className="w-12">
                <img src="/src/images/images.png" alt="" className="" />
              </div>
            </div>
            <div className="border w-16 h-16 rounded-sm flex justify-center items-center cursor-pointer hover:border-nav_btn_text">
              <div className="w-6">
                <img src="/src/images/apple-logo.svg" alt="" className="" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center text-[0.7rem] py-6">
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
      </main>
    </>
  );
}

export default AuthPage;
