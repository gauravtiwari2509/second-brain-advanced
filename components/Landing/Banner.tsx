"use client";
import gsap from "gsap";
import { Button } from "../ui/button";
import Link from "next/link";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { signIn } from "next-auth/react";
const Banner = () => {
  const titleRef = useRef(null);
  const headRef = useRef(null);
  const boxRef = useRef(null);

  useGSAP(() => {
    // const animation1 =
    gsap.from(headRef.current, {
      y: -20,
      duration: 1.5,
      delay: 1,
      scale: 2,
      color: "white",
    });

    // const animation2 =
    gsap.from(titleRef.current, {
      duration: 1,
      delay: 1,
      opacity: 0.5,
      repeat: -1,
      yoyo: true,
    });
    gsap.to(boxRef.current, {
      y: -180,
      duration: 1,
      delay: 1,
      rotate: 360,
      repeat: -1,
      yoyo: true,
      borderRadius: "50%",
      backgroundColor: "purple",
    });
  }, []);
  //learn later for cleanup

  return (
    <div className="w-full h-[100vh] bg-gray-600 flex flex-col justify-center items-center relative">
      <div ref={boxRef} className="w-24 h-24 bg-purple-200"></div>
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <span
          ref={headRef}
          className="uppercase text-5xl font-semibold md:text-8xl md:font-medium text-purple-600"
        >
          second brain
        </span>
        <span
          ref={titleRef}
          className="capitalize text-xl sm:text-2xl md:text-3xl md:font-thin"
        >
          A Link Management Platform
        </span>
      </div>
      <div className="absolute bottom-[20vh] flex gap-10">
        <Button
          asChild
          className="bg-purple-700  text-white text-xl hover:bg-purple-900 rounded-md px-4 py-6 md:text-2xl md:font-semibold"
        >
          <Link href="/signup">Register</Link>
        </Button>
        <Button
          onClick={() => signIn()}
          className="bg-purple-700 text-white text-xl hover:bg-purple-900 rounded-md px-4 py-6 md:text-2xl md:font-semibold"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Banner;
