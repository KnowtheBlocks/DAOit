// FilterModal.tsx
import React from "react";

const FilterModal = ({
  isFilterModalOpen,
  filterStatus,
  setFilterStatus,
  setIsFilterModalOpen,
}) => {
  if (!isFilterModalOpen) return null;

  return (
    <div className="absolute mt-2 left-80 w-48 p-4 bg-black text-white">
      <div className="flex flex-col gap-2">
        <button
          onClick={() => {
            setFilterStatus("all");
            setIsFilterModalOpen(false);
          }}
          className={`p-2 text-left rounded-md ${
            filterStatus === "all" ? "bg-[#373434]" : "bg-[#373434] rounded-lg"
          }`}
        >
          All
        </button>
        <button
          onClick={() => {
            setFilterStatus("pending");
            setIsFilterModalOpen(false);
          }}
          className={`p-2 text-left rounded-md ${
            filterStatus === "pending"
              ? "bg-[#373434] rounded-lg"
              : "bg-[#373434]"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => {
            setFilterStatus("closed");
            setIsFilterModalOpen(false);
          }}
          className={`p-2 text-left rounded-md ${
            filterStatus === "closed"
              ? "bg-[#373434] rounded-lg"
              : "bg-[#373434]"
          }`}
        >
          Closed
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
