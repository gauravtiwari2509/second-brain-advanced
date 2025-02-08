import React from "react";

const Footer = () => {
  return (
    <div
      className="fixed bottom-0 w-full h-[5vh] bg-gray-600 text-gray-100 flex items-center justify-center bg-opacity-40"
      style={{
        backdropFilter: "blur(50px)",
      }}
    >
      <div className="text-center text-xs">
        <p>&copy; 2025 Your second brain. All rights reserved.</p>
        <p>Designed with ❤️ just for you</p>
      </div>
    </div>
  );
};

export default Footer;
