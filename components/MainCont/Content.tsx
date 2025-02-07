"use client";
import { useAddContentModal } from "@/context/AddContentContext";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar";
import React from "react";
import AddContentCard from "../AddContentCard";
import { GroupProvider } from "@/context/GroupContext";
import { ContentProvider } from "@/context/ContentContext";
import ContentDisplayBox from "../ContentDisplayBox";
import { useLoading } from "@/context/loadingContext";
import Loader from "../Loader";
import { useInteractingAiModal } from "@/context/AiInteractionContext";
import ChatBox from "../ChatBox";

const Content = () => {
  const { addingContent } = useAddContentModal();
  const { isLoading } = useLoading();
  const { isInteractingAi, setIsInteractingAi, aiData } =
    useInteractingAiModal(); // Get aiData from context

  return (
    <>
      {isLoading && <Loader />}
      {isInteractingAi && aiData && (
        <ChatBox
          closeModal={() => setIsInteractingAi(false)}
          groups="none"
          links={JSON.stringify({
            title: aiData.title,
            url: aiData.url,
            note: aiData.note,
            tags: aiData.tags,
            timestamp: aiData.timestamp,
            type: aiData.type,
            deleteLink: aiData.deleteLink,
          })}
        />
      )}
      <GroupProvider>
        <ContentProvider>
          <div className="flex z-20">
            {addingContent && <AddContentCard />}
            <div className="fixed top-0 left-0 z-10 max-sm:hidden">
              <Sidebar />
            </div>

            <div className="flex flex-col w-[80vw] min-h-screen items-center pt-5 ml-[20vw] max-sm:ml-0 max-sm:w-[100vw]">
              <Navbar />
              <ContentDisplayBox />
            </div>
          </div>
        </ContentProvider>
      </GroupProvider>
    </>
  );
};

export default Content;
