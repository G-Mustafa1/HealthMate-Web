import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-[#1d9f9c] rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;