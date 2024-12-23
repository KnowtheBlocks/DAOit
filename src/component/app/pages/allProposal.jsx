// DashboardPage.tsx
import React, { useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import { PiNotePencilFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import FilterModal from "./allProposal/filter";
import ProposalList from "./allProposal/proposalList";
import SearchInput from "./allProposal/searchInput";

const DashboardPage = () => {
  const proposals = [
    {
      id: 1,
      descriptionTitle:
        "Lorem ipsum dolor sit amet consectetur. Dolor lacus accumsan nec magna. SeLorci...",
      title: "Lorem ipsum",
      description: "This card is currently opened.",
      avatar: "https://via.placeholder.com/32",
      username: "0x4cee...b541",
      votes: 355,
      endDate: "Ends in 3 days",
      status: "opened",
    },
    {
      id: 2,
      descriptionTitle:
        "Lorem ipsum dolor sit amet consectetur. Dolor lacus accumsan nec magna. SeLorci...",
      title: "Lorem ipsum",
      description: "This card is currently pending.",
      avatar: "https://via.placeholder.com/32",
      username: "0x1234...abcd",
      votes: 120,
      endDate: "Ends in 5 hours",
      status: "pending",
    },
    {
      id: 3,
      descriptionTitle:
        "Lorem ipsum dolor sit amet consectetur. Dolor lacus accumsan nec magna. SeLorci...",
      title: "Lorem ipsum",
      description: "This card is currently closed.",
      avatar: "https://via.placeholder.com/32",
      username: "0x5678...efgh",
      votes: 78,
      endDate: "Ended 2 days ago",
      status: "closed",
    },
    {
      id: 5,
      descriptionTitle:
        "Lorem ipsum dolor sit amet consectetur. Dolor lacus accumsan nec magna. SeLorci...",
      title: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Dolor lacus accumsan nec magna. SeLorci...",
      avatar: "https://via.placeholder.com/32",
      username: "0x4cee...b541",
      votes: 355,
      endDate: "Ends in 3 days",
      status: "pending",
    },
    {
      id: 6,
      descriptionTitle:
        "Lorem ipsum dolor sit amet consectetur. Dolor lacus accumsan nec magna. SeLorci...",
      title: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Dolor lacus accumsan nec magna. SeLorci...",
      avatar: "https://via.placeholder.com/32",
      username: "0x4cee...b541",
      votes: 355,
      endDate: "Ends in 3 days",
      status: "pending",
    },
    {
      id: 7,
      descriptionTitle:
        "Lorem ipsum dolor sit amet consectetur. Dolor lacus accumsan nec magna. SeLorci...",
      title: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Dolor lacus accumsan nec magna. SeLorci...",
      avatar: "https://via.placeholder.com/32",
      username: "0x4cee...b541",
      votes: 355,
      endDate: "Ends in 3 days",
      status: "closed",
    },
  ];

  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch = proposal.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || proposal.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 p-6 flex gap-20">
      <div className="pt-14">
        <button
          onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
          className="p-2 border border-gray-300 rounded-full hover:bg-gray-200"
        >
          <LuSettings2 size={35} />
        </button>
        <div
          onClick={() => navigate("/app/new-proposal")}
          className="mt-10 p-2 border border-gray-300 rounded-full hover:bg-gray-200"
        >
          <PiNotePencilFill size={35} />
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center gap-4 justify-end">
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
          <button className="bg-[#D9D9D9] text-black px-4 py-2 rounded-md">
            500 credits
          </button>
        </div>

        <FilterModal
          isFilterModalOpen={isFilterModalOpen}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          setIsFilterModalOpen={setIsFilterModalOpen}
        />

        <ProposalList filteredProposals={filteredProposals} />
      </div>
    </div>
  );
};

export default DashboardPage;
