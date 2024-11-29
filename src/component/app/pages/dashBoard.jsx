import React, { useState } from "react";
import ProposalCard from "../../utilies/proposalCard";
import { LuSettings2 } from "react-icons/lu";
import { PiNotePencilFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // State for modal visibility

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch = proposal.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || proposal.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 p-6 flex  gap-20">
      <div className="pt-14">
        <button
          onClick={() => setIsFilterModalOpen(!isFilterModalOpen)} // Toggle the modal
          className="p-2 border border-gray-300 rounded-full hover:bg-gray-200"
        >
          <LuSettings2 />
        </button>
        <div
          onClick={() => navigate("/app/new-proposal")}
          className="mt-10 p-2 border border-gray-300 rounded-full hover:bg-gray-200"
        >
          <PiNotePencilFill />
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center gap-4 justify-end ">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 p-2 border border-gray-300 rounded-md focus:outline-none bg-white"
          />
          <button className="bg-[#D9D9D9] text-black px-4 py-2 rounded-md">
            500 credits
          </button>
        </div>
        {isFilterModalOpen && (
          <div className="absolute mt-2 left-80  w-48 p-4 bg-black text-white">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setFilterStatus("all");
                  setIsFilterModalOpen(false);
                }}
                className={`p-2 text-left rounded-md ${
                  filterStatus === "all"
                    ? "bg-[#373434] "
                    : "bg-[#373434]  rounded-lg"
                }`}
              >
                All
              </button>
              {/* <button
              onClick={() => {
                setFilterStatus("Active");
                setIsFilterModalOpen(false);
              }}
              className={`p-2 text-left rounded-md ${
                filterStatus === "Active" ? "bg-gray-700 rounded-lg" : "hover:bg-gray-200"
              }`}
            >
              Active
            </button> */}
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
        )}
        <div className="space-y-4 mt-4">
          {filteredProposals.length > 0 ? (
            filteredProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                title={proposal.title}
                description={proposal.description}
                avatar={proposal.avatar}
                username={proposal.username}
                votes={proposal.votes}
                timeRemaining={proposal.endDate}
                status={proposal.status}
              />
            ))
          ) : (
            <p className="text-gray-500">No proposals found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
