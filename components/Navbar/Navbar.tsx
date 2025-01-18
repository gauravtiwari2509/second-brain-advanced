"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAddContentModal } from "@/context/AddContentContext";
import { useContent } from "@/context/ContentContext"; // Import useContent hook

const Navbar = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const { setAddingContent } = useAddContentModal();
  const { setSelectedContent } = useContent(); // Access setSelectedContent from context
  const [isFilterVisible, setIsFilterVisible] = useState(false); // State for showing filter options

  const filterRef = useRef<HTMLDivElement | null>(null); // Ref for the filter modal

  const handleSearchIconClick = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleFilterIconClick = () => {
    setIsFilterVisible(!isFilterVisible); // Toggle the filter options visibility
  };

  // Content types for the filter
  const contentTypes: any = [
    "All Content",
    "image",
    "video",
    "article",
    "audio",
    "document",
    "social-media",
    "web",
    "other",
  ];

  // Close the filter modal when clicking outside
  useEffect(() => {
    // Handler for clicks outside the modal
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterVisible(false); // Close filter if clicked outside
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-[50vw] h-fit py-2 rounded-full bg-gray-600 px-10 flex justify-center items-center gap-5 ">
      <Image
        src="/assets/icon/aiIcon.png"
        alt="add group"
        width={30}
        height={25}
        className="cursor-pointer"
      />
      <Button className="bg-gray-600">
        <Image
          src="/assets/icon/filterIcon.svg"
          width={30}
          height={30}
          alt="filter icon"
          className="cursor-pointer"
          onClick={handleFilterIconClick}
        />
      </Button>

      {isInputVisible && (
        <Input
          autoFocus
          className="w-1/2  text-sm text-gray-100  rounded-full border-none bg-black transition-all ease-in-out "
          placeholder="Search..."
        />
      )}

      {!isInputVisible ? (
        <Image
          src="/assets/icon/searchIcon.svg"
          width={30}
          height={30}
          alt="search icon"
          className="cursor-pointer"
          onClick={handleSearchIconClick}
        />
      ) : (
        <Image
          src="/assets/icon/crossIcon.svg"
          width={30}
          height={30}
          alt="search icon"
          className="cursor-pointer"
          onClick={handleSearchIconClick}
        />
      )}
      <Image
        src="/assets/icon/addIcon.svg"
        width={30}
        height={30}
        alt="add content"
        className="cursor-pointer"
        onClick={() => {
          setAddingContent(true);
        }}
      />
      <Image
        src="/assets/icon/shareIcon.svg"
        width={30}
        height={30}
        alt="share icon"
        className="cursor-pointer"
      />

      {isFilterVisible && (
        <div
          ref={filterRef} // Set the reference for the filter modal
          className="absolute top-16 bg-gray-600 rounded-lg shadow-lg w-48 py-2 z-50"
        >
          {contentTypes.map((type: any) => (
            <div
              key={type}
              className="px-4 py-1 text-white cursor-pointer hover:bg-gray-500"
              onClick={() => {
                setSelectedContent(type);
                setIsFilterVisible(false);
              }}
            >
              {type}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
