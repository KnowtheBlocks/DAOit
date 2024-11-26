import React from "react";
import Card from "./Card";

const cardData = [
  {
    imageSrc: "/path/to/connect-wallet-image.svg",
    altText: "Connect Wallet",
    title: "Connect Wallet",
    description:
      "To join the DAOit, you have to connect your wallet, either Metamask, WalletConnect, or any form of decentralized wallet that you have.",
  },
  {
    imageSrc: "/path/to/creation-proposal-image.svg",
    altText: "Creation Proposal",
    title: "Creation Proposal",
    description:
      "Allow the creation of proposals on smart contracts based on new learning modules, social policies, learning methods, and more.",
  },
  {
    imageSrc: "/path/to/voting-image.svg",
    altText: "Voting",
    title: "Voting",
    description:
      "Enables integration of blockchain-enabled voting methods, ensuring fair decisions and avoiding dominance by a single group.",
  },
  {
    imageSrc: "/path/to/proposal-execution-image.svg",
    altText: "Proposal Execution",
    title: "Proposal Execution",
    description:
      "Upon conclusion of a vote, the smart contract automatically triggers the proposal execution.",
  },
  {
    imageSrc: "/path/to/collaboration-medium-image.svg",
    altText: "Collaboration Medium",
    title: "Collaboration Medium",
    description:
      "DAOit introduces an inclusive participatory ecosystem, fostering collaboration between teachers and students.",
  },
  {
    imageSrc: "/path/to/transparency-auditability-image.svg",
    altText: "Transparency & Auditability",
    title: "Transparency & Auditability",
    description:
      "All transactions and decisions are recorded on a public blockchain, ensuring a transparent system.",
  },
];

const HowItWorks = () => {
  return (
    <main className=" flex flex-col items-center p-8">
      <section className=" mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Learn more on how DAOit works Today!
        </h1>
        <p className="mt-4 text-gray-600">
          In a few detailed steps, learn more about how DAOit works, the values,
          and features it offers, and how to use it.
        </p>
      </section>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Card
          key={index}
          imageSrc={card.imageSrc}
          altText={card.altText}
          title={card.title}
          description={card.description}
        />
        ))}
      </div>
    </main>
  );
};

export default HowItWorks;
