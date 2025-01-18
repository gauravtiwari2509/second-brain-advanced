// context/GroupContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { ObjectId } from "mongodb";

interface Group {
  _id: string;
  name: string;
  userId: string;
}

interface GroupContextType {
  groups: Group[];
  fetchGroups: () => void;
  deleteGroup: (groupId: ObjectId) => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [groups, setGroups] = useState<Group[]>([]);

  const fetchGroups = async () => {
    try {
      const response = await axios.get("/api/groups");
      setGroups(response.data.data);
    } catch (error) {
      console.error("Error fetching groups", error);
    }
  };

  const deleteGroup = async (groupId: ObjectId) => {
    try {
      await axios.delete(`/api/groups/?groupId=${groupId.toString()}`);
      await fetchGroups();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <GroupContext.Provider value={{ groups, fetchGroups, deleteGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = (): GroupContextType => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroups must be used within a GroupProvider");
  }
  return context;
};
