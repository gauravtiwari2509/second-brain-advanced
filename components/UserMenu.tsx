"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";

interface UserMenuProps {
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onClose }) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleSignOut = () => {
    // Sign out logic here (next-auth)
    toast({ title: "You have been signed out." });
  };

  return (
    <div className="absolute right-0 top-20 bg-gray-600 p-4 rounded-lg shadow-md w-fit z-50 text-sm sm:hidden">
      <div className="text-white text-center mb-3">
        Hello, {session?.user?.username}
      </div>
      <Button onClick={() => signOut()} className="w-full mb-2">
        Sign Out
      </Button>
      <Button onClick={onClose} className="w-full mb-2">
        Close
      </Button>
      {/* <Button
        onClick={handleAccountDelete}
        variant="destructive"
        className="w-full"
      >
        Delete Account
      </Button> */}
    </div>
  );
};

export default UserMenu;
