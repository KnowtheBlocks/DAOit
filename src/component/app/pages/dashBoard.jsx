import React, { useState, useEffect } from "react";
import ProposalCard from "../../utilies/proposalCard";
import { LuSettings2 } from "react-icons/lu";
import { PiNotePencilFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import proposalsData from "../../../../server/data/proposals.json";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [votingData, setVotingData] = useState({});

  useEffect(() => {
    // Fetch voting data
    const fetchVotingData = async () => {
      try {
        const response = await fetch('/api/voting-proposals');
        const data = await response.json();
        // Convert array to object with proposalId as key for easier lookup
        const votingMap = data.reduce((acc, vote) => {
          acc[vote.proposalId] = vote;
          return acc;
        }, {});
        setVotingData(votingMap);
      } catch (error) {
        console.error('Error fetching voting data:', error);
      }
    };

    fetchVotingData();
  }, []);

  useEffect(() => {
    // Transform proposals with voting data
    const transformedProposals = proposalsData
      .filter(proposal => proposal.proposalTitle && proposal.description)
      .map(proposal => {
        const votes = votingData[proposal.proposalId] || { 
          votes: { yes: 0, no: 0, abstain: 0 },
          scores: { yes: 0, no: 0, abstain: 0 },
          totalScore: 0
        };
        
        const totalVotes = votes.votes.yes + votes.votes.no + votes.votes.abstain;
        
        return {
          id: proposal.id,
          proposalId: proposal.proposalId,
          title: proposal.proposalTitle,
          description: proposal.description,
          avatar: "https://via.placeholder.com/32",
          username: proposal.userAddress,
          votes: totalVotes,
          voteBreakdown: {
            yes: votes.votes.yes,
            no: votes.votes.no,
            abstain: votes.votes.abstain,
            scores: votes.scores,
            totalScore: votes.totalScore
          },
          endDate: `Ends ${new Date(proposal.endDate).toLocaleDateString()}`,
          status: getProposalStatus(proposal.endDate, proposal.startDate),
        };
      });
    
    setProposals(transformedProposals);
  }, [votingData]);

  // Helper function to determine proposal status
  const getProposalStatus = (endDate, startDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const start = new Date(startDate);

    if (now > end) return "closed";
    if (now < start) return "pending";
    return "opened";
  };

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch = proposal.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || proposal.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleProposalClick = (proposalId) => {
    navigate(`/app/proposal/${proposalId}`);
  };

  return (
    <div className="space-y-6 p-6 flex gap-20">
      <div className="pt-14">
        <button
          onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
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
        <div className="flex items-center gap-4 justify-end">
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
          <div className="absolute mt-2 left-80 w-48 p-4 bg-black text-white">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setFilterStatus("all");
                  setIsFilterModalOpen(false);
                }}
                className={`p-2 text-left rounded-md ${
                  filterStatus === "all"
                    ? "bg-[#373434]"
                    : "bg-[#373434] rounded-lg"
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
        )}
        <div className="space-y-4 mt-4">
          {filteredProposals.length > 0 ? (
            filteredProposals.map((proposal) => (
              <div 
                key={proposal.id}
                onClick={() => handleProposalClick(proposal.proposalId)}
                className="cursor-pointer"
              >
                <ProposalCard
                  title={proposal.title}
                  description={proposal.description}
                  avatar={proposal.avatar}
                  username={proposal.username}
                  votes={proposal.votes}
                  voteBreakdown={proposal.voteBreakdown}
                  timeRemaining={proposal.endDate}
                  status={proposal.status}
                />
              </div>
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
