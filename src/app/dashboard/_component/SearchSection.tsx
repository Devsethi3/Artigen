import { Input } from "@/components/ui/input";
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchSection = () => {
  return (
    <div className="h-[30vh] flex items-center flex-col w-full gap-6 justify-center text-white bg-gradient-to-br from-emerald-900 to-slate-900">
      <div>
        <h2 className="text-3xl font-bold">Browse All Templates</h2>
        <p>What would you like to create today ?</p>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex  gap-2 items-center bg-white py-2 px-4 rounded-lg">
          <FaSearch size={20} className="text-gray-400 mr-2" />
          <input className="bg-transparent outline-none w-full text-black" />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
