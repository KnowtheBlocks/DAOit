// SearchInput.tsx
import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchInput = ({
  searchQuery,
  setSearchQuery,
  isVisible,
  setIsVisible,
}) => {
  return (
    <div
      className={`flex items-center space-x-4 justify-end p-1 rounded-md ${
        isVisible ? "border-2" : ""
      }`}
    >
      <button
        onClick={() => {
          setIsVisible((prev) => !prev);
          if (isVisible) {
            setSearchQuery("");
          }
        }}
        className="p-2 bg-[#EAE9E9] rounded-lg border-[#ABABAB]"
      >
        <CiSearch size={25} />
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isVisible ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
        }`}
      >
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-96 p-2 border border-gray-300 rounded-md focus:outline-none bg-white`}
        />
      </div>
    </div>
  );
};

export default SearchInput;
