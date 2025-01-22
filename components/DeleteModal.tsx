import React from "react";

const DeleteModal = ({ setDeleteModalVisible, onDelete, text }: any) => {
  return (
    <div
      className="absolute z-50 top-0 left-0 h-screen w-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center modal"
      style={{
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="bg-gray-600 p-6 rounded-lg shadow-lg z-10">
        <p className="text-center mb-4 text-white">{text}</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => {
              onDelete();
              setDeleteModalVisible(false);
            }}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded-md"
            onClick={() => setDeleteModalVisible(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
