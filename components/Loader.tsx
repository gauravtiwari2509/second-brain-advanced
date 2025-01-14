import React from "react";

const Loader = () => (
  <div className="fixed h-screen w-screen top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
    <span className="loader"></span>
  </div>
);

export default Loader;
