"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useGroups } from "@/context/GroupContext";
import axios from "axios";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import DeleteModal from "./DeleteModal";
import { ObjectId } from "mongodb";
import { useContent } from "@/context/ContentContext";

const MobGroupContainer = () => {
  const { toast } = useToast();
  const {
    groups,
    fetchGroups,
    deleteGroup,
    selectedGroup,
    setSelectedGroupFun,
  } = useGroups();

  const { contents } = useContent();
  const [name, setName] = useState("");
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isAddGroupModalVisible, setAddGroupModalVisible] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<ObjectId | null>(null);
  const { fetchContents } = useContent();

  const addGroup = async () => {
    try {
      if (!name.trim()) {
        return;
      }
      const res = await axios.post("/api/groups", { name });
      // console.log(res);
      if (res.status === 200) {
        toast({
          title: `${res?.data?.message}` || "Group added successfully",
        });
      }
      fetchGroups();
      setAddGroupModalVisible(false);
      setName(""); // Reset the name input
    } catch (error: any) {
      // console.log(error);
      toast({
        title:
          `${error?.response?.data?.message}` || "Error while adding group",
        variant: "destructive",
      });
    }
  };

  const deleteGroups = async () => {
    if (selectedGroupId) {
      try {
        deleteGroup(selectedGroupId);
        toast({ title: "Group deleted successfully" });
        fetchGroups();
        fetchContents();
      } catch (error) {
        toast({
          title: "Error deleting group",
          variant: "destructive",
        });
      } finally {
        setDeleteModalVisible(false);
        setSelectedGroupId(null);
      }
    }
  };

  const numItem = (id: ObjectId) => {
    return contents.filter((content) => content.group._id === id).length;
  };

  return (
    <>
      {isDeleteModalVisible && (
        <DeleteModal
          text="Deleting this will delete all your links of this group"
          setDeleteModalVisible={setDeleteModalVisible}
          onDelete={deleteGroups}
        />
      )}

      {/* Add Group Modal */}
      {isAddGroupModalVisible && (
        <div
          className="fixed z-50 h-screen w-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center p-5"
          style={{
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="bg-gray-600 p-5 rounded-md shadow-lg w-fit flex items-center justify-center gap-3 flex-col">
            <span className="text-sm font-semibold mb-4 ">Add New Group</span>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter group name"
              className="w-full text-sm"
            />
            <div className="flex gap-2">
              <Button
                className="bg-green-500 text-gray-50"
                onClick={() => addGroup()}
              >
                Add
              </Button>
              <Button
                variant="outline"
                className="bg-gray-500 text-gray-50"
                onClick={() => setAddGroupModalVisible(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center gap-2 p-1 rounded-md max-mobile:text-xs mobile:w-[40vw] w-[50vw] bg-gray-500">
        <select
          className="bg-gray-500 text-white w-[70%] overflow-ellipsis rounded-xl"
          onChange={(e) => {
            const group = e.target.value;
            if (group === "All Content") {
              setSelectedGroupFun("All Content");
            } else {
              //@ts-ignore
              setSelectedGroupFun(group);
              //@ts-ignore
              setSelectedGroupId(group);
            }
          }}
        >
          <option value="All Content">All Content</option>
          {groups.map((group) => {
            return (
              <option key={group._id} value={group._id}>
                {group.name.length > 25
                  ? `${group.name.slice(0, 25)}...`
                  : group.name}
              </option>
            );
          })}
        </select>
        {selectedGroup !== "All Content" && (
          <Image
            src="/assets/icon/delete.svg"
            alt="delete"
            width={15}
            height={15}
            onClick={() => setDeleteModalVisible(true)}
          />
        )}
        <Image
          src="/assets/icon/addIcon.svg"
          alt="add group"
          width={16}
          height={16}
          className="cursor-pointer"
          onClick={() => setAddGroupModalVisible(true)}
        />
      </div>
    </>
  );
};

export default MobGroupContainer;
