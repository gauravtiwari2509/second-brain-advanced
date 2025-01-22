"use client";
import SharedContentCard from "@/components/sharedContentCard";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const TagPage = () => {
  const [sharedLinkContent, setsharedLinkContent] = useState<any>(null);
  const { brainhash } = useParams();
  useEffect(() => {
    getSharedContent();
  }, []);
  async function getSharedContent() {
    try {
      const res = await axios.post("/api/brain", { hashId: brainhash });
      setsharedLinkContent(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-6 overflow-y-scroll my-[10vh]">
        {sharedLinkContent &&
          sharedLinkContent.map((content: any) => {
            return (
              <SharedContentCard
                key={content._id}
                title={content.title}
                url={content.url}
                note={content?.notes}
                tags={content.tags}
                timestamp={content.createdAt}
                type={content.type}
              />
            );
          })}
      </div>
    </>
  );
};
export default TagPage;
