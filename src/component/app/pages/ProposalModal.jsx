import React, { useState } from "react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall, createThirdwebClient, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { DAOIT } from "../../../lib/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const client = createThirdwebClient({
  clientId: "58cdb2d58aaf66e7872b6eb45c258fdd", // Replace with your thirdweb client ID
});

const contract = getContract({
  address: DAOIT,
  chain: sepolia,
  client,
});

const ProposalModal = ({ proposal, onClose, onVote }) => {
  const [tokens, setTokens] = useState(0); // State for the number of tokens to vote with
  const [support, setSupport] = useState(true); // State for the vote direction (true = support, false = oppose)
  const { mutate: sendTransaction, isLoading: isVoting } = useSendTransaction();
  const [isLocalVoting, setIsLocalVoting] = useState(false);

  const handleVote = async () => {
    if (!proposal || tokens <= 0) {
      toast.error("Please enter a valid number of tokens to vote.");
      return;
    }
    setIsLocalVoting(true);
    console.log("Starting vote transaction...");

    try {
      // Show a pending toast
      toast.info("Waiting for wallet confirmation...", {
        autoClose: false, // Don't auto-close this toast
        closeButton: false, // Hide the close button
      });

      // Prepare the contract call
      const voteTx = prepareContractCall({
        contract,
        method: "function vote(uint _proposalId, uint256 tokens, bool support)",
        params: [proposal.id, tokens, support],
      });

      console.log("Prepared transaction:", voteTx);

      // Send the transaction
      console.log("Sending transaction...");
      await sendTransaction(voteTx);

      console.log("Transaction sent successfully!");

      // Dismiss the pending toast
      toast.dismiss();

      // Show success toast
      toast.success("Vote submitted successfully!");

      // Notify the parent component that the vote was successful
      onVote();
    } catch (error) {
      console.error("Error voting:", error);

      // Dismiss the pending toast
      toast.dismiss();

      // Show error toast
      toast.error("Failed to vote. Please try again.");
    } finally {
      setIsLocalVoting(false); // Reset local loading state
    }
  };

  if (!proposal) return null;

  return (
    <>
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white p-4 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
          <h1 className="text-lg font-bold mb-3">{proposal.title}</h1>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 leading-tight">{proposal.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Proposal ID</p>
                <p className="font-medium">{proposal.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Proposer</p>
                <p className="font-medium">{proposal.username}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Votes</p>
                <p className="font-medium">{proposal.votes}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Yes Votes</p>
                <p className="font-medium">{proposal.yesVotes}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">No Votes</p>
                <p className="font-medium">{proposal.noVotes}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Status</p>
                <p className="font-medium">{proposal.status}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Deadline</p>
                <p className="font-medium">{proposal.deadline}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">End Date</p>
                <p className="font-medium">{proposal.endDate}</p>
              </div>
            </div>
          </div>

          {/* Voting Inputs */}
          <div className="mt-4 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Number of Tokens to Vote
            </label>
            <input
              type="number"
              value={tokens}
              onChange={(e) => setTokens(Number(e.target.value))}
              className="w-full p-3 bg-white border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
              required
            />
            <div className="flex items-center gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Vote Direction
              </label>
              <select
                value={support}
                onChange={(e) => setSupport(e.target.value === "true")}
                className="p-2 border bg-white border-gray-300 rounded-lg"
              >
                <option value={true}>Support</option>
                <option value={false}>Oppose</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Close
            </button>
            <button
              onClick={handleVote}
              disabled={isLocalVoting}
              className="px-3 py-1 text-xs text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
            >
              {isLocalVoting ? (
                <>
                  <span className="mr-2">Voting...</span>
                  <div className="w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
                </>
              ) : (
                "Vote"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposalModal;