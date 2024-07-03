"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchSectionProps {
  onSearchInput: (input: string) => void;
  noResults?: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  onSearchInput,
  noResults = false,
}) => {
  const [input, setInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    onSearchInput(value);
  };

  return (
    <div className="h-[30vh] flex items-center flex-col w-full gap-6 justify-center text-white bg-gradient-to-br from-emerald-900 to-slate-900">
      <div>
        <h2 className="text-3xl font-bold">Browse All Templates</h2>
        <p>What would you like to create today?</p>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex items-center w-full max-w-[20rem] lg:max-w-lg border-2 border-transparent bg-white rounded-lg py-2.5 px-2 focus-within:border-primary">
          <Search size={20} className="text-gray-400 mr-2.5 ml-1.5" />
          <input
            value={input}
            onChange={handleChange}
            className="bg-transparent border-none outline-none text-black flex-grow"
            placeholder="Search Templates..."
          />
        </div>
      </div>
      {noResults && (
        <div className="text-center text-red-500 mt-4">
          No records found related to your search.
        </div>
      )}
    </div>
  );
};

export default SearchSection;
