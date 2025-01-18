import { Redirect } from "@/components/Redirect";
import SignUp from "@/components/Signup";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession();

  if (session?.user) {
    return <Redirect to={"/home"} />;
  }
  return <SignUp />;
};

export default page;
