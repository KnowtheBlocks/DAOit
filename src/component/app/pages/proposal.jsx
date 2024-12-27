import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../utilies/modal";
import { useGlobalStore } from "../../../main";
import ReactMarkdown from 'react-markdown';

const ProposalPage = () => {
  const { id } = useParams();
  const [activeModal, setActiveModal] = useState(null);
  const [proposal, setProposal] = useState(null);
  const [votingData, setVotingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { walletAddress, userId } = useGlobalStore();
  const [baserowProposal, setBaserowProposal] = useState(null);
  const [summary, setSummary] = useState('');
  const [pollingSummary, setPollingForSummary] = useState(false);

  const pollForSummary = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Token fy0I9k6HrFPbciwBx9spI1JGN2pk0mcU");

      const response = await fetch(
        `https://api.baserow.io/api/database/rows/table/403203/${baserowProposal.id}/?user_field_names=true`,
        {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        }
      );

      const result = await response.json();
      
      if (result.Summary && result.Summary.trim() !== '') {
        setSummary(result.Summary);
        setPollingForSummary(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error polling for summary:', error);
      return false;
    }
  };

  useEffect(() => {
    let pollInterval;
    
    if (baserowProposal && pollingSummary) {
      pollInterval = setInterval(async () => {
        const hasSummary = await pollForSummary();
        if (hasSummary) {
          clearInterval(pollInterval);
        }
      }, 5000); // Poll every 5 seconds
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [baserowProposal, pollingSummary]);

  useEffect(() => {
    if (baserowProposal) {
      if (!baserowProposal.Summary || baserowProposal.Summary.trim() === '') {
        setPollingForSummary(true);
      } else {
        setSummary(baserowProposal.Summary);
      }
    }
  }, [baserowProposal]);

  const loadProposal = async () => {
    try {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Token fy0I9k6HrFPbciwBx9spI1JGN2pk0mcU");

      const response = await fetch(
        `https://api.baserow.io/api/database/rows/table/403203/?user_field_names=true&filter__Proposal Id__equal=${id}`,
        {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        }
      );

      const result = await response.json();
      console.log("Baserow API Response:", result);

      if (!result.results || result.results.length === 0) {
        console.error('No proposal found with ID:', id);
        setError('Proposal not found');
        return;
      }

      const baserowProposal = result.results[0];
      console.log("Found proposal:", baserowProposal);
      setBaserowProposal(baserowProposal);

      let hasVotedFromRecords = false;

      // Fetch and log voting records
      const votingLogHeaders = new Headers();
      votingLogHeaders.append("Authorization", "Token fy0I9k6HrFPbciwBx9spI1JGN2pk0mcU");

      const votingLogOptions = {
        method: "GET",
        headers: votingLogHeaders,
        redirect: "follow"
      };

      try {
        const votingLogResponse = await fetch(
          "https://api.baserow.io/api/database/rows/table/415295/?user_field_names=true",
          votingLogOptions
        );
        const votingLogResult = await votingLogResponse.json();
        console.log("Voting records:", votingLogResult);

        // Check if user has voted on this proposal from voting records
        hasVotedFromRecords = votingLogResult.results?.some(
          record => 
            record["Proposal ID"] === id && 
            record["Address"] === walletAddress && 
            record["didVote"] === true
        );

        if (hasVotedFromRecords) {
          console.log("User has previously voted on this proposal");
        }

      } catch (error) {
        console.error("Error fetching voting records:", error);
      }

      // Set proposal data using the actual field names from the response
      setProposal({
        proposalId: baserowProposal['Proposal Id'],
        proposalTitle: baserowProposal['Proposal Title'],
        description: baserowProposal['Description'],
        startDate: baserowProposal['Start date'],
        endDate: baserowProposal['End date'],
        userAddress: baserowProposal['Address'],
      });

      // Transform voting data
      const votingData = {
        votes: {
          yes: parseInt(baserowProposal.yes_count || 0),
          no: parseInt(baserowProposal.no_count || 0)
        },
        voters: JSON.parse(baserowProposal.voters || '{}'),
        hasVoted: hasVotedFromRecords || (baserowProposal.voters ? 
          JSON.parse(baserowProposal.voters).hasOwnProperty(userId) : false)
      };

      setVotingData(votingData);
      
    } catch (error) {
      console.error('Error loading proposal:', error);
      setError(`Failed to load proposal: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Add debug logging for voting data changes
  useEffect(() => {
    console.log('Current voting data:', votingData);
  }, [votingData]);

  useEffect(() => {
    if (id) {
      loadProposal();
    }
  }, [id]);

  const submitVote = async (voteType) => {
    if (!userId) {
      setError('Please connect your wallet to vote');
      return;
    }

    if (votingData?.hasVoted) {
      setError('You have already voted on this proposal');
      return;
    }

    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Token fy0I9k6HrFPbciwBx9spI1JGN2pk0mcU");
      myHeaders.append("Content-Type", "application/json");

      // Calculate new vote counts
      const currentYesCount = parseInt(baserowProposal.yes_count) || 0;
      const currentNoCount = parseInt(baserowProposal.no_count) || 0;
      
      const newYesCount = voteType === 'yes' ? currentYesCount + 1 : currentYesCount;
      const newNoCount = voteType === 'no' ? currentNoCount + 1 : currentNoCount;

      // Update voters and vote counts
      const updatedVoters = {
        ...votingData.voters,
        [userId]: { 
          vote: voteType, 
          timestamp: new Date().toISOString(),
          address: walletAddress
        }
      };

      const updateData = {
        voters: JSON.stringify(updatedVoters),
        yes_count: newYesCount.toString(),
        no_count: newNoCount.toString(),
        total_votes: (newYesCount + newNoCount).toString()
      };

      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify(updateData),
        redirect: "follow"
      };

      const response = await fetch(
        `https://api.baserow.io/api/database/rows/table/403203/${baserowProposal.id}/?user_field_names=true`,
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to submit vote: ${errorData}`);
      }

      const result = await response.json();
      console.log("Vote submission result:", result);

      // Log the vote in the voting log table
      const votingLogHeaders = new Headers();
      votingLogHeaders.append("Authorization", "Token fy0I9k6HrFPbciwBx9spI1JGN2pk0mcU");
      votingLogHeaders.append("Content-Type", "application/json");

      const votingLogData = {
        "Proposal ID": id,
        "Address": walletAddress,
        "didVote": true
      };

      const votingLogOptions = {
        method: "POST",
        headers: votingLogHeaders,
        body: JSON.stringify(votingLogData),
        redirect: "follow"
      };

      try {
        const votingLogResponse = await fetch(
          "https://api.baserow.io/api/database/rows/table/415295/?user_field_names=true",
          votingLogOptions
        );
        const votingLogResult = await votingLogResponse.text();
        console.log("Vote logging result:", votingLogResult);
      } catch (error) {
        console.error("Error logging vote:", error);
      }

      // Update local state with new voting data
      setVotingData({
        votes: {
          yes: newYesCount,
          no: newNoCount
        },
        voters: updatedVoters,
        hasVoted: true
      });

      // Refresh proposal data to ensure consistency
      await loadProposal();
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
    if (!userId) {
      setError('Please connect your wallet to vote');
      return;
    }
    if (votingData?.voters?.[userId]) {
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
    const totalVotes = votingData.votes.yes + votingData.votes.no;
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

  const hasVoted = userId && votingData?.voters?.[userId];
  const totalVotes = votingData?.voters?.length || 0;

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

        {/* Summary Card */}
        {pollingSummary ? (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-600 border-t-transparent"></div>
              <span className="text-gray-600">Generating summary...</span>
            </div>
          </div>
        ) : summary ? (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Summary
            </h3>
            <div className="prose max-w-none">
              <ReactMarkdown className="text-gray-600">
                {summary}
              </ReactMarkdown>
            </div>
          </div>
        ) : null}

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
          {!userId ? (
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              Please connect your wallet to vote
            </div>
          ) : votingData?.hasVoted ? (
            <div className="text-center p-4 bg-green-50 rounded-lg">
              You have already voted on this proposal
            </div>
          ) : getProposalStatus(proposal.endDate, proposal.startDate) === "Closed" ? (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              This proposal has ended
            </div>
          ) : getProposalStatus(proposal.endDate, proposal.startDate) === "Pending" ? (
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              This proposal has not started yet
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
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Voting Results</h3>
          
          {/* Yes Votes */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Yes</span>
              <span className="text-gray-900 font-medium">
                {votingData?.votes?.yes || 0} votes ({calculatePercentage(
                  votingData?.votes?.yes || 0,
                  (votingData?.votes?.yes || 0) + (votingData?.votes?.no || 0)
                )}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#60CF0B] h-2 rounded-full" 
                style={{ 
                  width: `${calculatePercentage(
                    votingData?.votes?.yes || 0,
                    (votingData?.votes?.yes || 0) + (votingData?.votes?.no || 0)
                  )}%` 
                }}
              ></div>
            </div>
          </div>

          {/* No Votes */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">No</span>
              <span className="text-gray-900 font-medium">
                {votingData?.votes?.no || 0} votes ({calculatePercentage(
                  votingData?.votes?.no || 0,
                  (votingData?.votes?.yes || 0) + (votingData?.votes?.no || 0)
                )}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#E27525] h-2 rounded-full" 
                style={{ 
                  width: `${calculatePercentage(
                    votingData?.votes?.no || 0,
                    (votingData?.votes?.yes || 0) + (votingData?.votes?.no || 0)
                  )}%` 
                }}
              ></div>
            </div>
          </div>

          {/* Total Votes */}
          <div className="text-sm text-gray-600 mt-4">
            Total votes: {(votingData?.votes?.yes || 0) + (votingData?.votes?.no || 0)}
          </div>
          {votingData?.hasVoted && (
            <p className="text-sm text-green-600 mt-2">
              You have voted on this proposal
            </p>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Votes</h3>
          {!votingData?.voters?.length ? (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              No votes recorded yet
            </div>
          ) : (
            <div className="space-y-2">
              {votingData.voters.map((address) => (
                <div
                  key={address}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-mono text-sm text-gray-600">
                    {`${address.slice(0, 6)}...${address.slice(-4)}`}
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
    </div>
  );
};

export default ProposalPage; 