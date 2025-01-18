"use client";
import React, { useRef } from "react";
import FeatureCard from "./FeatureCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { features } from "@/constant/constant";
const Features = () => {
  const ref = useRef(null);
  useGSAP(() => {
    gsap.to(".box", {
      opacity: 0.6,
      duration: 3,
      stagger: 1,
      repeat: -1,
      yoyo: true,
    });
  }, []);
  return (
    <div className="w-full min-h-[120vh] bg-black px-4 py-6 box flex justify-center items-center  feature">
      <div
        ref={ref}
        className="flex flex-wrap justify-center items-center gap-8"
      >
        {features.map((feature) => (
          <div className="box" key={feature.head}>
            <FeatureCard
              head={feature.head}
              description={feature.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
