import { Redirect } from "@/components/Redirect";
import SignIn from "@/components/Signin";
import { getServerSession } from "next-auth";
import React from "react";

const SigninPage = async () => {
  const session = await getServerSession();

  if (session?.user) {
    return <Redirect to={"/home"} />;
  }
  return <SignIn />;
};

export default SigninPage;
