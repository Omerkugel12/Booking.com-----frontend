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
import { ShieldQuestion } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import { z } from "zod";
import { Form, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  password: z.string(),
});

function LoginPage({ email }: { email: string }) {
  const { login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  function handleLoginSubmit(values: z.infer<typeof formSchema>) {
    const data = { email, password: values.password };
    console.log(data);
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
        <div className="max-w-96 w-full flex flex-col">
          <h1 className="text-xl font-extrabold mb-6">Enter your password</h1>
          <p>Please enter your Booking.com password for</p>
          <p className="font-bold">{email}</p>

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
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
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
        </div>
      </main>
    </>
  );
}

export default LoginPage;
