// ProposalList.tsx
import React from "react";
import ProposalCard from "../../../utilies/proposalCard";
import ProfileLayout from "./profileLayout";

const ActivityList = () => {
  const data = [
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
      activity: "yes",
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
      activity: "yes",
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
      activity: "no",
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
      activity: "no",
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
      activity: "yes",
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
      activity: "abstain",
      status: "closed",
    },
  ];
  return (
    <ProfileLayout>
      <div className="space-y-4 mt-4">
        {data.length > 0 ? (
          data.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              title={proposal.title}
              description={proposal.description}
              avatar={proposal.avatar}
              username={proposal.username}
              votes={proposal.votes}
              timeRemaining={proposal.endDate}
              status={proposal.status}
              activity={proposal.activity}
            />
          ))
        ) : (
          <p className="text-gray-500">No proposals found.</p>
        )}
      </div>
    </ProfileLayout>
  );
};

export default ActivityList;
