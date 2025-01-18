"use client";
import React from "react";
import ContentCard from "./ContentCard";
import { useContent } from "@/context/ContentContext";
import { ObjectId } from "mongodb";
const ContentDisplayBox = () => {
  const { copyContent, deleteContent } = useContent();
  const deleteLink = async (id: ObjectId) => {
    deleteContent(id);
  };
  return copyContent.length > 0 ? (
    <div className="w-full flex flex-wrap justify-center items-center gap-x-6 gap-y-6 mt-8 overflow-y-scroll ">
      {copyContent.map((content) => {
        return (
          <ContentCard
            key={content._id}
            title={content.title}
            url={content.url}
            note={content?.notes}
            tags={content.tags}
            timestamp={content.createdAt}
            type={content.type}
            deleteLink={() => {
              deleteLink(content._id);
            }}
          />
        );
      })}
    </div>
  ) : (
    <span className="mt-[20vh]">no content available!</span>
  );
};

export default ContentDisplayBox;
