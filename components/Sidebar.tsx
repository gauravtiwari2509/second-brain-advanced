import React from "react";
import { Separator } from "./ui/separator";
import GroupContainer from "./GroupContainer";
import SignOut from "./Buttons/SignOut";
const Sidebar = () => {
  return (
    <div className="w-[20vw] h-[100vh] bg-gray-600 flex flex-col items-center pt-4">
      <img
        src="/assets/logo.png"
        alt="logo"
        className="w-[70%] h-auto  pointer-events-none no-select"
      />
      <Separator className="bg-gray-400" />
      <div className="w-full overflow-y-scroll">
        <GroupContainer />
      </div>
      <div className="w-full flex flex-col mt-8 absolute bottom-1 ">
        <Separator className="bg-gray-400" />
        <SignOut />
      </div>
    </div>
  );
};

export default Sidebar;
