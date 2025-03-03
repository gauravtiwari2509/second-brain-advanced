"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ChatBox from "./ChatBox";

const SharedContentCard = ({
  title,
  url,
  note,
  tags,
  timestamp,
  type,
}: any) => {
  const [aiInteraction, setAiInteraction] = useState(false);
  const { toast } = useToast();

  function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  }

  const renderEmbed = (url: string, type: string) => {
    if (
      (type === "video" && url.includes("youtube.com")) ||
      url.includes("youtu.be")
    ) {
      let videoId;

      if (url.includes("youtu.be")) {
        videoId = url.split("/").pop()?.split("?")[0];
      } else if (url.includes("youtube.com")) {
        videoId = url.split("v=")[1]?.split("&")[0];
      }

      if (videoId) {
        return (
          <div className="iframe-container">
            <iframe
              className="aspect-video w-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player "
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      }
    }

    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Open Link
      </Link>
    );
  };

  return (
    <>
      {aiInteraction && (
        <ChatBox
          closeModal={() => setAiInteraction(false)}
          groups="none"
          links={JSON.stringify({
            title,
            url,
            note,
            tags,
            timestamp,
            type,
          })}
        />
      )}
      <div className="child w-[80vw] sm:w-[37vw] md:w-[35vw] lg:w-[24vw] min-h-[25vh] m-1 overflow-hidden flex flex-col gap-3 text-gray-200 bg-gray-600 rounded-lg border border-purple-950 shadow-sm duration-300 hover:shadow-md hover:shadow-purple-00 shadow-purple-600 hover:bg-gray-puple-600 px-2 relative">
        <div className="flex items-center gap-1 justify-between py-2">
          <div className="flex gap-2 justify-center items-center  max-w-[60%]">
            <Image
              src={`/assets/icon/${type}.svg`}
              alt="add group"
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <span className="capitalize font-semibold text-purple-100 text-sm">
              {title}
            </span>
          </div>
          <div className="flex h-full gap-2">
            <Image
              src="/assets/icon/aiIcon.png"
              alt="add group"
              width={20}
              height={10}
              className="cursor-pointer max-md:w-15 max-md:h-auto"
              onClick={() => setAiInteraction(true)}
            />
            <Image
              src="/assets/icon/copy.svg"
              alt="add group"
              width={20}
              height={20}
              className="cursor-pointer max-md:w-15 max-md:h-auto"
              onClick={() => {
                navigator.clipboard
                  .writeText(url) // "over http this navigator.clipboard is not supported"
                  .then(() => {
                    toast({
                      title: "URL copied successfully!",
                    });
                  })
                  .catch((error) => {
                    console.error("Error copying text: ", error);
                    toast({
                      title: "Failed to copy URL",
                    });
                  });
              }}
            />
          </div>
        </div>
        <p className="px-2 w-full break-words text-justify italic">{note}</p>
        <div className="px-2 w-full">{renderEmbed(url, type)}</div>
        <div className="flex flex-wrap gap-2 px-2">
          {tags.map((tag: any) => {
            return (
              <span
                key={tag._id}
                className="text-sm text-blue-500 hover:underline"
              >
                #{tag.title}
              </span>
            );
          })}
        </div>
        <span className="font-mono px-2 ">
          Added on {formatTimestamp(timestamp)}
        </span>
      </div>
    </>
  );
};

export default SharedContentCard;
