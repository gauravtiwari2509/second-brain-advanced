"use client";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { signInSchema } from "@/schemas/signInSchema";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";
import { useLoading } from "@/context/loadingContext";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastAction } from "@/components/ui/toast";

const SignIn = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoading, setLoading } = useLoading();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast({
          title: "Login Failed",
          description: `Incorrect ${data.username} or password`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }
    setLoading(false);
    if (result?.ok && result.url) {
      router.push("/home");
    }
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-gray-600">
        {isLoading && <Loader />}
        <div className="w-fit h-fit py-10 px-10 md:px-16 flex flex-col gap-5 justify-center items-center border border-purple-950 rounded-2xl bg-gray-purple-600 shadow-xl duration-300 hover:shadow-2xl hover:shadow-purple-800 shadow-purple-800">
          <span className="capitalize text-2xl font-bold  text-purple-400">
            welcome back
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
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Sign In
              </Button>
            </form>
            <Separator />
            <span>
              not registered yet?{" "}
              <Link href="/signup" className="text-purple-300 underline">
                register
              </Link>
            </span>
          </Form>
        </div>
      </div>{" "}
    </>
  );
};

export default SignIn;
