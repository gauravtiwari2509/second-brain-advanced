"use client";
import { useAddContentModal } from "@/context/AddContentContext";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar";
import React from "react";
import AddContentCard from "../AddContentCard";
import { GroupProvider } from "@/context/GroupContext";
import { ContentProvider } from "@/context/ContentContext";
import ContentDisplayBox from "../ContentDisplayBox";

const Content = () => {
  const { addingContent } = useAddContentModal();
  return (
    <>
      <GroupProvider>
        <ContentProvider>
          <div className="flex z-20">
            {addingContent && <AddContentCard />}
            <div className="fixed top-0 left-0 z-10">
              <Sidebar />
            </div>

            <div className="flex flex-col w-[80vw] min-h-screen items-center pt-5 ml-[20vw]">
              <div className="flex">
                <Navbar />
              </div>
              <ContentDisplayBox />
            </div>
          </div>
        </ContentProvider>
      </GroupProvider>
    </>
  );
};

export default Content;
