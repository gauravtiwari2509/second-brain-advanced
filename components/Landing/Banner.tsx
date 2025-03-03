"use client";
import gsap from "gsap";
import { Button } from "../ui/button";
import Link from "next/link";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
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
      backgroundColor: "purple",
    });
  }, []);
  //learn later for cleanup

  return (
    <div
      className="w-full h-[100vh] bg-black flex flex-col justify-center items-center relative max-sm:pb-16  overflow-hidden z-40
    banner
    "
    >
      <Image
        src="/assets/Gradient.svg"
        width={0}
        height={0}
        alt="image"
        className="w-[100vw] h-full pointer-events-none absolute bottom-[-45vh]"
      />
      <div ref={boxRef} className="w-24 h-24 bg-purple-200 rounded-full "></div>
      <div></div>
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <span
          ref={headRef}
          className="uppercase text-5xl font-semibold md:text-8xl md:font-medium text-purple-600"
        >
          second <span className="text-white">brain</span>
        </span>
        <span
          ref={titleRef}
          className="capitalize text-purple-50 text-xl sm:text-2xl md:text-3xl md:font-light"
        >
          A Link Management Platform
        </span>
      </div>
      <div className="absolute bottom-[20vh] flex gap-10 max-sm:bottom-[25vh]">
        <Button
          asChild
          className="bg-purple-700  text-white text-xl hover:bg-purple-900 rounded-md px-4 py-6 md:text-2xl md:font-medium"
        >
          <Link href="/signup">Register</Link>
        </Button>
        <Button
          onClick={() => signIn()}
          className="bg-purple-700 text-white text-xl hover:bg-purple-900 rounded-md px-4 py-6 md:text-2xl md:font-medium"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Banner;
