"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import { useToast } from "@/hooks/use-toast";
import { useInteractingAiModal } from "@/context/AiInteractionContext";

const ContentCard = ({
  title,
  url,
  note,
  tags,
  timestamp,
  type,
  deleteLink,
}: any) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const { setIsInteractingAi, setAiData } = useInteractingAiModal();
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
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
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
      {isDeleteModalVisible && (
        <DeleteModal
          text={`Do you want to delete this link?`}
          setDeleteModalVisible={setDeleteModalVisible}
          onDelete={deleteLink}
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
          <div className="flex flex-wrap h-full gap-2 justify-end items-center">
            <Image
              src="/assets/icon/aiIcon.png"
              alt="ai"
              width={20}
              height={10}
              className="cursor-pointer max-md:w-15 max-md:h-auto"
              onClick={() => {
                setAiData({
                  title,
                  url,
                  note,
                  tags,
                  timestamp,
                  type,
                  deleteLink,
                });
                setIsInteractingAi(true);
              }}
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
            <Image
              src="/assets/icon/edit.svg"
              alt="add group "
              width={20}
              height={20}
              className="cursor-pointer max-md:w-15 max-md:h-auto"
            />
            <Image
              src="/assets/icon/delete.svg"
              alt="add group"
              width={20}
              height={20}
              className="cursor-pointer max-md:w-15 max-md:h-auto"
              onClick={() => {
                setDeleteModalVisible(true);
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

export default ContentCard;
