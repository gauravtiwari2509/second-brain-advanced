"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import { useToast } from "@/hooks/use-toast";
const ContentCard = ({
  id,
  title,
  url,
  note,
  tags,
  timestamp,
  type,
  deleteLink,
}: any) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
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

  return (
    <>
      {isDeleteModalVisible && (
        <DeleteModal
          text={`do you want to delete this link?`}
          setDeleteModalVisible={setDeleteModalVisible}
          onDelete={deleteLink}
        />
      )}
      <div className="child md:w-[24vw] min-h-[25vh] flex flex-col gap-3 text-gray-200 bg-gray-600 rounded-lg border border-purple-950 shadow-sm duration-300 hover:shadow-md hover:shadow-purple-00 shadow-purple-600 hover:bg-gray-puple-600 px-2 relative">
        <div className="flex items-center justify-between py-1">
          <div className="flex gap-2 justify-start items-center">
            <Image
              src={`/assets/icon/${type}.svg`}
              alt="add group"
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <span className="capitalize font-semibold text-purple-100 text-lg">
              {title}
            </span>
          </div>
          <div className="flex h-full gap-2">
            <Image
              src="/assets/icon/aiIcon.png"
              alt="add group"
              width={20}
              height={10}
              className="cursor-pointer"
            />
            <Image
              src="/assets/icon/copy.svg"
              alt="add group"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(url);
                toast({
                  title: "url copied successfully!",
                });
              }}
            />
            <Image
              src="/assets/icon/edit.svg"
              alt="add group"
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <Image
              src="/assets/icon/delete.svg"
              alt="add group"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() => {
                setDeleteModalVisible(true);
              }}
            />
          </div>
        </div>
        <p className="px-2 w-full break-words text-justify italic">{note}</p>
        <Link
          href={url}
          target="_blank"
          className="text-purple-200 visited:text-orange-500 text-lg italic underline px-2"
        >
          visit link!
        </Link>
        <div className="flex gap-2 px-2">
          {tags.map((tag: any) => {
            return <span key={tag._id}>#{tag.title}</span>;
          })}
        </div>
        <span className="font-mono px-2 absolute bottom-1">
          Added on {formatTimestamp(timestamp)}
        </span>
      </div>
    </>
  );
};

export default ContentCard;
