"use client";
import React from "react";
import ContentCard from "./ContentCard";
import { useContent } from "@/context/ContentContext";
import { ObjectId } from "mongodb";
import { useLoading } from "@/context/loadingContext";
import Loader from "./Loader";

const ContentDisplayBox = () => {
  const { copyContent, deleteContent } = useContent();
  const { isLoading } = useLoading();

  const deleteLink = async (id: ObjectId) => {
    deleteContent(id);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full sm:mt-8">
      {copyContent.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-6 overflow-y-scroll">
          {copyContent.map((content) => (
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
          ))}
        </div>
      ) : (
        <div className="text-center">No content available</div>
      )}
    </div>
  );
};

export default ContentDisplayBox;
