// ProposalList.tsx
import React from "react";
import ProposalCard from "../../../utilies/proposalCard";

const ProposalList = ({ filteredProposals }) => {
  return (
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
  );
};

export default ProposalList;
