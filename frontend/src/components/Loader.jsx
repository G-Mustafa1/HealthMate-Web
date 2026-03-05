import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-6 h-6 border-4 border-[#1d9f9c]/30 border-t-[#1d9f9c] rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;