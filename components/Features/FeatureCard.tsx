"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const FeatureCard: React.FC<FeatureCardProps> = ({ head, description }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rY = mouseX / width - HALF_ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        boxShadow: "-15px 20px 50px rgb(126 34 206)",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      className="relative rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 
      h-[50vh] w-[80vw] sm:h-[40vh] sm:w-[45vw] md:h-[40vh] md:w-[30vw] lg:w-[26vw]
      "
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-2 flex flex-col items-center justify-evenly rounded-xl bg-gray-600 shadow-lg p-2"
      >
        <span className="text-3xl font-semibold text-blue-200 text-center">
          {head}
        </span>
        <span className="text-lg text-blue-200 text-center">{description}</span>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
