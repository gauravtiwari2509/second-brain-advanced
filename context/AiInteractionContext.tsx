"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";

interface AiInteractionType {
  isInteractingAi: boolean;
  setIsInteractingAi: React.Dispatch<React.SetStateAction<boolean>>;
  aiData: AiData | null;
  setAiData: React.Dispatch<React.SetStateAction<AiData | null>>;
}

interface AiData {
  title: string;
  url: string;
  note: string;
  tags: any[];
  timestamp: string;
  type: string;
  deleteLink: any;
}

const AiInteraction = createContext<AiInteractionType | null>(null);

// Provider component
export const InteractingAiModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isInteractingAi, setIsInteractingAi] = useState(false);
  const [aiData, setAiData] = useState<AiData | null>(null);

  return (
    <AiInteraction.Provider
      value={{ isInteractingAi, setIsInteractingAi, aiData, setAiData }}
    >
      {children}
    </AiInteraction.Provider>
  );
};

export const useInteractingAiModal = (): AiInteractionType => {
  const context = useContext(AiInteraction);
  if (!context) {
    throw new Error(
      "useInteractingAi must be used within an InteractingAiModalProvider"
    );
  }
  return context;
};
