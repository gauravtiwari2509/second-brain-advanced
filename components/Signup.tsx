"use client";
import { signUpSchema } from "@/schemas/signUpSchema"; // New sign-up schema
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";
import { useLoading } from "@/context/loadingContext";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const SignUp = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoading, setLoading } = useLoading();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    setLoading(true);

    try {
      const { username, password } = data;
      const res = await axios.post("/api/signup", {
        username,
        password,
      });

      toast({
        title: "Sign Up Successful!",
        description: `Welcome, ${data.username}!`,
      });

      // Redirect to home or login page
      router.push("/signin");
    } catch (error: any) {
      toast({
        title: error.response.data.error as string | "Sign Up Failed",
        description: "An error occurred while signing up.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-gray-600">
        {isLoading && <Loader />}
        <div className="w-fit h-fit py-10 px-10 md:px-16 flex flex-col gap-5 justify-center items-center border border-purple-950 rounded-2xl bg-gray-purple-600 shadow-xl duration-300 hover:shadow-2xl hover:shadow-purple-800 shadow-purple-800 ">
          <span className="capitalize text-2xl font-bold text-purple-400">
            Create an Account
          </span>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <Input {...field} />
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" {...field} />
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type="password" {...field} />
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Sign Up
              </Button>
            </form>

            <Separator />

            <span>
              Already have an account?{" "}
              <Link href="/signin" className="text-purple-300 underline">
                Sign In
              </Link>
            </span>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
