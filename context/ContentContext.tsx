"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { ObjectId } from "mongodb";
import { useLoading } from "./loadingContext";

type ContentType =
  | "image"
  | "video"
  | "article"
  | "audio"
  | "document"
  | "social-media"
  | "web"
  | "other";

interface IContent {
  _id: ObjectId;
  url: string;
  notes?: string;
  group: any;
  type: ContentType;
  title: string;
  tags: any;
  createdAt: string;
  updatedAt: string;
}

interface ContentContextType {
  fetchContents: () => void;
  copyContent: IContent[];
  selectedContent: ContentType | "All Content";
  setSelectedContent: React.Dispatch<
    React.SetStateAction<ContentType | "All Content">
  >;
  deleteContent: (contentId: ObjectId) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contents, setContents] = useState<IContent[]>([]);
  const [copyContent, setCopyContent] = useState<IContent[]>([]);
  const [selectedContent, setSelectedContent] = useState<
    ContentType | "All Content"
  >("All Content");
  const { setLoading } = useLoading();

  const fetchContents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/content");
      if (response.data.status === 204) {
        console.log("no content found", response);
        return;
      }
     
        setContents(response.data.data);
      
    } catch (error) {
      console.error("Error fetching contents", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (contentId: ObjectId) => {
    try {
      setLoading(true);
      await axios.delete(`/api/content/?contentId=${contentId.toString()}`);
      setContents((prevContents) =>
        prevContents.filter((content) => content._id !== contentId)
      );
      setCopyContent((prevContents) =>
        prevContents.filter((content) => content._id !== contentId)
      );
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterContentFun = () => {
    if (selectedContent === "All Content") {
      setCopyContent(contents);
    } else {
      const data = contents.filter((item) => {
        return item.type === selectedContent;
      });
      setCopyContent(data);
    }
  };

  useEffect(() => {
    filterContentFun();
  }, [selectedContent, contents]);

  useEffect(() => {
    fetchContents();
  }, []);

  return (
    <ContentContext.Provider
      value={{
        fetchContents,
        copyContent,
        selectedContent,
        setSelectedContent,
        deleteContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContents must be used within a ContentProvider");
  }
  return context;
};
