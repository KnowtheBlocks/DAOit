// DashboardPage.tsx
import React, { useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import { PiNotePencilFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import FilterModal from "./allProposal/filter";
import ProposalList from "./allProposal/proposalList";
import SearchInput from "./allProposal/searchInput";
import { sepolia } from "thirdweb/chains";
import { getContract, createThirdwebClient } from "thirdweb";
import { DAOIT } from "../../../lib/constants";
import { useReadContract } from "thirdweb/react";
import ProposalModal from "./ProposalModal";
import TokenBalance from "./TokenBalance";

const client = createThirdwebClient({
  clientId: "58cdb2d58aaf66e7872b6eb45c258fdd", // Replace with your thirdweb client ID
});


const contract = getContract({ 
  address: DAOIT,
  chain: sepolia,
  client,
});


console.log("Exports from constants.js:", { client, DAOIT });

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null); // State for selected proposal
  const [isModalOpen, setIsModalOpen] = useState(false);

 

  // Fetch all proposals from the smart contract
  const { data: proposalsData, isLoading, error } = useReadContract({
    contract,
    method: "function getAllProposals() external view returns (uint[] memory, string[] memory, string[] memory, uint256[] memory, uint256[] memory, uint256[] memory, uint256[] memory, bool[] memory, uint256[] memory, address[] memory)",
  });

  console.log("Proposals Data:", proposalsData);
  console.log("Loading:", isLoading);
  console.log("Error:", error);
  console.log("Raw Proposals Data:", proposalsData);

  // Map the fetched data to the structure expected by your component
  const proposals = proposalsData
  ? proposalsData[0].map((_, index) => ({
      id: Number(proposalsData[0][index]), // Access the first element of the nested array
      title: proposalsData[1][index] || "Untitled Proposal",
      description: proposalsData[2][index] || "No description available.",
      votes: Number(proposalsData[3][index]) || 0,
      delegatedVoteCount: Number(proposalsData[4][index]) || 0,
      yesVotes: Number(proposalsData[5][index]) || 0,
      noVotes: Number(proposalsData[6][index]) || 0,
      executed: proposalsData[7][index] || false,
      deadline: proposalsData[8][index]
        ? new Date(Number(proposalsData[8][index]) * 1000).toLocaleDateString()
        : "No deadline",
      proposer: proposalsData[9][index] || "Unknown",
      status: proposalsData[7][index]
        ? "executed"
        : Number(proposalsData[8][index]) > Math.floor(Date.now() / 1000)
        ? "opened"
        : "closed",
      avatar: "https://via.placeholder.com/32",
      username: proposalsData[9][index]
        ? proposalsData[9][index].slice(0, 6) + "..." + proposalsData[9][index].slice(-4)
        : "Unknown",
      endDate:
        Number(proposalsData[8][index]) > Math.floor(Date.now() / 1000)
          ? `Ends in ${Math.ceil(
              (Number(proposalsData[8][index]) - Math.floor(Date.now() / 1000)) / 86400
            )} days`
          : "Ended",
    }))
  : [];

  // Filter proposals based on search query and filter status
  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch = proposal.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || proposal.status === filterStatus;
    return matchesSearch && matchesFilter;
  });
  

  if (isLoading) {
    return <div>Loading proposals...</div>;
  }

  if (error) {
    return <div>Error fetching proposals: {error.message}</div>;
  }

  // Handle card click to open the modal
  const handleCardClick = (proposal) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  // Handle vote button click
  const handleVote = () => {
    // Implement your voting logic here
    console.log("Voting for proposal:", selectedProposal.id);
    // Close the modal after voting
  };

  const handleProposalClick = (proposal) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProposal(null);
    setIsModalOpen(false);
  };

  const handleVoteSuccess = () => {
    // Optionally refresh the proposals data here
  
  };
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
          {/* <button className="bg-[#D9D9D9] text-black px-4 py-2 rounded-md">
            500 credits
          </button> */}
          <TokenBalance />
        </div>

        <FilterModal
          isFilterModalOpen={isFilterModalOpen}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          setIsFilterModalOpen={setIsFilterModalOpen}
        />
        <div className="w-full">
        {/* ... other components ... */}
        <ProposalList 
          filteredProposals={filteredProposals} 
          onProposalClick={handleProposalClick}
        />
        {isModalOpen && (
          <ProposalModal
            proposal={selectedProposal}
            onClose={handleCloseModal}
            onVote={handleVoteSuccess}
          />
        )}
      </div>
      </div>
    </div>
    
  );
};

export default DashboardPage;
