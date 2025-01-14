"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const PrimaryButton = () => {
  return <Button onClick={() => signOut()}>signout</Button>;
};

export default PrimaryButton;
