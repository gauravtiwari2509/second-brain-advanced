"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";
const AddContentModalContext = createContext<AddContentModalContextType | null>(
  null
);

// Provider component
export const AddContentModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [addingContent, setAddingContent] = useState(false);

  return (
    <AddContentModalContext.Provider
      value={{ addingContent, setAddingContent }}
    >
      {children}
    </AddContentModalContext.Provider>
  );
};

export const useAddContentModal = (): AddContentModalContextType => {
  const context = useContext(AddContentModalContext);
  if (!context) {
    throw new Error(
      "useAddContentModal must be used within an AddContentModalProvider"
    );
  }
  return context;
};
