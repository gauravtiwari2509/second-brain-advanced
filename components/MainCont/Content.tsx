"use client";
import { useAddContentModal } from "@/context/AddContentContext";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar";
import React, { useEffect } from "react";
import AddContentCard from "../AddContentCard";
import ContentDisplayBox from "../ContentDisplayBox";
import { useLoading } from "@/context/loadingContext";
import Loader from "../Loader";
import { useInteractingAiModal } from "@/context/AiInteractionContext";
import ChatBox from "../ChatBox";
import { useContent } from "@/context/ContentContext";
import MobGroupContainer from "../MobGroupContainer";
import Footer from "../Footer";

const Content = () => {
  const { addingContent } = useAddContentModal();
  const { isLoading } = useLoading();
  const { isInteractingAi, setIsInteractingAi, aiData } =
    useInteractingAiModal();
  const { fetchContents } = useContent();
  useEffect(() => {
    fetchContents();
  }, []);
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

      <div className="flex z-20">
        {addingContent && <AddContentCard />}
        <div className="fixed top-0 left-0 z-10 max-sm:hidden">
          <Sidebar />
        </div>

        <div className="flex flex-col w-[80vw] min-h-screen items-center pt-5 ml-[20vw] max-sm:ml-0 max-sm:w-[100vw]">
          <Navbar />
          <div className="sm:hidden self-start mx-[10vw] max-sm:my-[2vh]">
            <MobGroupContainer />
          </div>
          <ContentDisplayBox />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Content;
