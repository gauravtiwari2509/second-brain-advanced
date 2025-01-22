import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { useGroups } from "@/context/GroupContext";
import axios from "axios";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import DeleteModal from "./DeleteModal";
import { ObjectId } from "mongodb";
import { useContent } from "@/context/ContentContext";
// import { useLoading } from "@/context/loadingContext";
// import Loader from "./Loader";

const GroupContainer = () => {
  const { toast } = useToast();
  const {
    groups,
    fetchGroups,
    deleteGroup,
    selectedGroup,
    setSelectedGroupFun,
  } = useGroups();
  const { contents } = useContent();
  // const { isLoading } = useLoading();
  const [name, setName] = useState("");
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<ObjectId | null>(null);

  const addGroup = async () => {
    try {
      if (!name.trim()) {
        return;
      }
      const res = await axios.post("/api/groups", { name });
      console.log(res);
      if (res.status === 200) {
        toast({
          title: `${res?.data?.message}` || "Group added successfully",
        });
      }
      fetchGroups();
      setIsAddingGroup(!isAddingGroup);
    } catch (error: any) {
      console.log(error);
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
  // if (isLoading) {
  //   return <Loader />;
  // }
  return (
    <>
      {isDeleteModalVisible && (
        <DeleteModal
          text="Deleting this will delete all your links of this group"
          setDeleteModalVisible={setDeleteModalVisible}
          onDelete={deleteGroups}
        />
      )}
      <div className="flex flex-col w-full">
        <div className="flex justify justify-between items-center px-4 py-2">
          <span className="text-md text-gray-100">Groups</span>
          <Button
            onClick={() => {
              setIsAddingGroup(!isAddingGroup);
            }}
            className="px-2 py-1"
          >
            {isAddingGroup ? (
              <Image
                src="/assets/icon/crossIcon.svg"
                alt="add group"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            ) : (
              <Image
                src="/assets/icon/addIcon.svg"
                alt="add group"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            )}
          </Button>
        </div>
        <Separator className="w-full bg-gray-400" />

        {isAddingGroup && (
          <div className="flex gap-2 m-auto">
            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="bg-gray-950 mt-2 border-gray-200 w-[15vw] rounded-xl h-[5vh] "
            />
            <Image
              src="/assets/icon/addIcon.svg"
              alt="add group"
              width={25}
              height={25}
              onClick={addGroup}
              className="cursor-pointer"
            />
          </div>
        )}
        <div className="p-4 w-full flex flex-col  text-gray-100 cursor-pointer gap-3 overflow-y-scroll">
          <span
            onClick={() => {
              setSelectedGroupFun("All Content");
            }}
            className={`rounded-lg p-2 text-sm w-[100%] overflow-hidden whitespace-nowrap text-ellipsis bg-gray-500 ${
              selectedGroup === "All Content" ? "bg-gray-800" : null
            }`}
          >
            All Content
            <span className="pr-1">({contents.length})</span>
          </span>
          {groups.map((group: any) => {
            return (
              <div
                key={group._id}
                className={`flex w-full items-center justify-between px-2 rounded-md overflow-hidden  bg-gray-500 py-1 ${
                  selectedGroup === group._id ? "bg-gray-800" : null
                }`}
              >
                <span
                  onClick={() => {
                    setSelectedGroupFun(group._id);
                  }}
                  className="rounded px-2 text-sm w-[70%] overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  {group.name}
                </span>
                <span>({numItem(group._id)})</span>
                <Image
                  src="/assets/icon/addIcon.svg"
                  alt="add"
                  width={15}
                  height={15}
                  className="hover:bg-gray-600  "
                />

                <Image
                  src="/assets/icon/delete.svg"
                  alt="delete"
                  width={15}
                  height={15}
                  onClick={() => {
                    setSelectedGroupId(group._id);
                    setDeleteModalVisible(true);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GroupContainer;
