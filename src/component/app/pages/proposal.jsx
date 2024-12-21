import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../utilies/modal";
import { useGlobalStore } from "../../../main";
import proposalsData from "../../../../server/data/proposals.json";

const ProposalPage = () => {
  const { id } = useParams();
  const [activeModal, setActiveModal] = useState(null);
  const [proposal, setProposal] = useState(null);
  const [votingData, setVotingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { walletAddress } = useGlobalStore();

  useEffect(() => {
    const loadProposal = async () => {
      try {
        console.log('Loading proposal with id:', id);
        console.log('Available proposals:', proposalsData);
        
        // Find the proposal in proposals.json using proposalId
        const foundProposal = proposalsData.find(p => p.proposalId === id);
        console.log('Found proposal:', foundProposal);
        
        if (!foundProposal) {
          console.log('No proposal found with proposalId:', id);
          setError('Proposal not found');
          setLoading(false);
          return;
        }

        setProposal(foundProposal);

        // Fetch voting data
        try {
          console.log('Fetching voting data for proposal:', foundProposal.proposalId);
          const votingResponse = await fetch(`/api/voting-proposals/${foundProposal.proposalId}`);
          const votingData = await votingResponse.json();
          console.log('Received voting data:', votingData);
          setVotingData(votingData);
        } catch (votingError) {
          console.error('Error loading voting data:', votingError);
          // Don't set error, just leave votingData as null
        }

      } catch (error) {
        console.error('Error loading proposal:', error);
        setError('Failed to load proposal');
      } finally {
        setLoading(false);
      }
    };

    loadProposal();
  }, [id]);

  const submitVote = async (voteType) => {
    if (!walletAddress) {
      setError('Please connect your wallet to vote');
      return;
    }

    try {
      console.log('Submitting vote:', {
        proposalId: proposal.proposalId,
        voterAddress: walletAddress,
        vote: voteType
      });

      // Submit vote directly without signing
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          proposalId: proposal.proposalId,
          voterAddress: walletAddress,
          vote: voteType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit vote');
      }

      const voteResult = await response.json();
      console.log('Vote recorded with scores:', voteResult.scores);

      // Refresh voting data after voting
      const votingResponse = await fetch(`/api/voting-proposals/${proposal.proposalId}`);
      const votingData = await votingResponse.json();
      console.log('Updated voting data:', votingData);
      setVotingData(votingData);

      closeModal();
    } catch (err) {
      console.error('Error submitting vote:', err);
      setError(err.message || 'Failed to submit vote');
    }
  };

  const getProposalStatus = (endDate, startDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const start = new Date(startDate);

    if (now > end) return "Closed";
    if (now < start) return "Pending";
    return "Opened";
  };

  const openModal = (modalType) => {
    if (!walletAddress) {
      setError('Please connect your wallet to vote');
      return;
    }
    if (votingData?.voters?.[walletAddress]) {
      setError('You have already voted on this proposal');
      return;
    }
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
    setError(null);
  };

  const calculatePercentage = (voteCount) => {
    if (!votingData) return 0;
    const totalVotes = votingData.votes.yes + votingData.votes.no + votingData.votes.abstain;
    return totalVotes === 0 ? 0 : Math.round((voteCount / totalVotes) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Proposal Not Found</h2>
        <p className="text-gray-600">The proposal you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  const hasVoted = walletAddress && votingData?.voters?.[walletAddress];
  const votes = votingData?.votes || { yes: 0, no: 0, abstain: 0 };
  const totalVotes = votes.yes + votes.no + votes.abstain;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left Column - Proposal Details */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-yellow-600">
            Proposal Details
          </h2>
          <span className={`px-4 py-1 rounded-full text-sm ${
            getProposalStatus(proposal.endDate, proposal.startDate) === "Opened" 
              ? "bg-green-100 text-green-800"
              : getProposalStatus(proposal.endDate, proposal.startDate) === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}>
            {getProposalStatus(proposal.endDate, proposal.startDate)}
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-900">
                {proposal.proposalTitle}
              </h3>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <span className="font-mono text-sm">{proposal.userAddress}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm">
                  ID: {proposal.proposalId}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-medium">Start Date:</span>
                <span>{new Date(proposal.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">End Date:</span>
                <span>{new Date(proposal.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Voting System:</span>
                <span>Quadratic</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Description
            </h3>
            <div className="prose max-w-none">
              {proposal.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Voting Section */}
      <div className="w-full md:w-1/3">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Cast Your Vote</h3>
          {!walletAddress ? (
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              Please connect your wallet to vote
            </div>
          ) : hasVoted ? (
            <div className="text-center p-4 bg-green-50 rounded-lg">
              You have voted: <span className="capitalize font-medium">{votingData.voters[walletAddress].vote}</span>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <button
                onClick={() => openModal("yes")}
                className="w-full text-sm border border-[#60CF0B] hover:bg-[#4EA20E] hover:text-white text-green-700 py-2 px-4 rounded-full transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => openModal("no")}
                className="w-full text-sm border border-[#E27525] hover:bg-[#D0601F] hover:text-white text-red-700 py-2 px-4 rounded-full transition-colors"
              >
                No
              </button>
              <button
                onClick={() => openModal("abstain")}
                className="w-full text-sm border border-[#E2A65C] hover:bg-[#D59D4A] hover:text-white text-orange-700 py-2 px-4 rounded-full transition-colors"
              >
                Abstain
              </button>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Current Results</h3>
          {!votingData ? (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              No votes have been cast yet
            </div>
          ) : totalVotes === 0 ? (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              Voting has not started yet
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Yes</span>
                    <div className="flex gap-2">
                      <span>{calculatePercentage(votes.yes)}%</span>
                      <span className="text-gray-500">
                        (Score: {votingData.scores?.yes.toFixed(2) || 0})
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-green-500 rounded" style={{ width: `${calculatePercentage(votes.yes)}%` }}></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>No</span>
                    <div className="flex gap-2">
                      <span>{calculatePercentage(votes.no)}%</span>
                      <span className="text-gray-500">
                        (Score: {votingData.scores?.no.toFixed(2) || 0})
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-red-500 rounded" style={{ width: `${calculatePercentage(votes.no)}%` }}></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Abstain</span>
                    <div className="flex gap-2">
                      <span>{calculatePercentage(votes.abstain)}%</span>
                      <span className="text-gray-500">
                        (Score: {votingData.scores?.abstain.toFixed(2) || 0})
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-400 rounded" style={{ width: `${calculatePercentage(votes.abstain)}%` }}></div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  Total votes: {totalVotes}
                </p>
                <p className="text-sm text-gray-600">
                  Total quadratic score: {votingData.totalScore?.toFixed(2) || 0}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Votes</h3>
          {!votingData || Object.keys(votingData.voters).length === 0 ? (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              No votes recorded yet
            </div>
          ) : (
            <div className="space-y-2">
              {Object.entries(votingData.voters).map(([address, voterData]) => (
                <div
                  key={address}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-mono text-sm text-gray-600">
                    {`${address.slice(0, 6)}...${address.slice(-4)}`}
                  </span>
                  <span className={`text-sm font-medium capitalize ${
                    voterData.vote === 'yes' ? 'text-green-600' :
                    voterData.vote === 'no' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {voterData.vote}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Vote Confirmation Modals */}
      <Modal
        isOpen={activeModal === "yes"}
        onClose={closeModal}
        title="Confirm Vote"
        color="bg-black text-white"
      >
        <div className="flex flex-col items-center gap-5 p-6">
          <p className="text-sm bg-[#60CF0B] text-white py-2 px-6 rounded-full">
            Yes
          </p>
          <button 
            onClick={() => submitVote('yes')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Confirm Vote
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "no"}
        onClose={closeModal}
        title="Confirm Vote"
        color="bg-black text-white"
      >
        <div className="flex flex-col items-center gap-5 p-6">
          <p className="text-sm bg-[#E27525] text-white py-2 px-6 rounded-full">
            No
          </p>
          <button 
            onClick={() => submitVote('no')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Confirm Vote
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "abstain"}
        onClose={closeModal}
        title="Confirm Vote"
        color="bg-black text-white"
      >
        <div className="flex flex-col items-center gap-5 p-6">
          <p className="text-sm bg-[#E2A65C] text-white py-2 px-6 rounded-full">
            Abstain
          </p>
          <button 
            onClick={() => submitVote('abstain')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Confirm Vote
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProposalPage; 