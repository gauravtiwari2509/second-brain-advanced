"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAddContentModal } from "@/context/AddContentContext";
import { useContent } from "@/context/ContentContext";
import ChatBox from "../ChatBox";
import { useGroups } from "@/context/GroupContext";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const { setAddingContent } = useAddContentModal();
  const { setSelectedContent, copyContent } = useContent();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [aiChat, setAiChat] = useState(false);
  const [sharedLink, setSharedLink] = useState<string | null>(null);
  const { groups } = useGroups();

  const filterRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  const handleSearchIconClick = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleFilterIconClick = () => {
    setIsFilterVisible(!isFilterVisible);
  };

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  async function generateLink() {
    try {
      const res = await axios.post("/api/link");
      if (res.status === 200) {
        await getLink();
        toast({
          title: "your sharable link created successfully",
        });
      }
    } catch (error) {
      toast({
        title: "error whilte  generating link",
      });
    }
  }
  useEffect(() => {
    getLink();
  }, []);
  async function getLink() {
    try {
      const res = await axios.get("/api/link");
      const baseurl = "https://second-brain-advanced.vercel.app/";
      const finalLink = `${baseurl}brain/${res.data.hash}`;
      if (res.status == 200) {
        setSharedLink(finalLink);
      }
      // console.log(sharedLink);
    } catch (error) {
      console.log(error);
      toast({
        title: "error while fetching link",
      });
    }
  }
  const deleteSharedLink = async () => {
    try {
      const res = await axios.delete("/api/link");
      if (res.status === 200) {
        setSharedLink(null);
        toast({
          title: "link deleted successfully",
        });
      }
    } catch (error) {}
  };
  return (
    <>
      {aiChat && (
        <ChatBox
          closeModal={() => setAiChat(false)}
          groups={JSON.stringify(groups)}
          links={JSON.stringify(copyContent)}
        />
      )}
      <div
        className={`w-[50vw] max-sm:w-[95vw] h-fit py-2 rounded-full bg-gray-600 px-10 flex justify-center items-center gap-5  max-sm:gap-4`}
      >
        <Image
          src="/assets/icon/aiIcon.png"
          alt="add group"
          width={30}
          height={25}
          className="cursor-pointer max-sm:w-[20px] max-sm:h-[auto]"
          onClick={() => setAiChat(true)}
        />

        <Image
          src="/assets/icon/filterIcon.svg"
          width={30}
          height={30}
          alt="filter icon"
          className="cursor-pointer max-sm:w-[20px] max-sm:h-[auto]"
          onClick={handleFilterIconClick}
        />

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
            className="cursor-pointer max-sm:w-[20px] max-sm:h-[auto]"
            onClick={handleSearchIconClick}
          />
        ) : (
          <Image
            src="/assets/icon/crossIcon.svg"
            width={30}
            height={30}
            alt="search icon"
            className="cursor-pointer max-sm:w-[20px] max-sm:h-[auto]"
            onClick={handleSearchIconClick}
          />
        )}
        <Image
          src="/assets/icon/addIcon.svg"
          width={30}
          height={30}
          alt="add content"
          className="cursor-pointer max-sm:w-[20px] max-sm:h-[auto]"
          onClick={() => {
            setAddingContent(true);
          }}
        />
        {!sharedLink ? (
          <Image
            src="/assets/icon/shareIcon.svg"
            width={30}
            height={30}
            alt="share icon"
            className="cursor-pointer max-sm:w-[20px] max-sm:h-[auto]"
            onClick={generateLink}
          />
        ) : (
          <span className="flex justify-center items-center gap-2 bg-gray-500 py-1 px-2   rounded-2xl">
            <Image
              src="/assets/icon/copy.svg"
              width={28}
              height={28}
              alt="share icon"
              className="cursor-pointer max-sm:w-[20px] max-sm:h-[auto]"
              onClick={() => {
                navigator.clipboard.writeText(sharedLink);
                toast({
                  title: "sharedLink copied successfully!",
                });
              }}
            />
            <Image
              src="/assets/icon/delete.svg"
              width={28}
              height={28}
              alt="delete icon"
              className="cursor-pointer max-sm:w-[20px] max-sm:h-[auto]"
              onClick={deleteSharedLink}
            />
          </span>
        )}

        {isFilterVisible && (
          <div
            ref={filterRef}
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
    </>
  );
};

export default Navbar;
