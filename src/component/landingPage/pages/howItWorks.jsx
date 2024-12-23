import React from "react";
import vote from "../../../assets/vote.svg";
import collaborate from "../../../assets/colab.svg";
import create from "../../../assets/idea.svg";
import execute from "../../../assets/join.svg";
import wallet from "../../../assets/wallet.svg";
import transparency from "../../../assets/transparency.svg";
import Card from "../../utilies/card";

const cards = [
  {
    title: "Connect Wallet",
    description:
      "To join the DAOIt you have to connect your wallet either Metamask, wallet connect and form of decentralized wallet which you have.",
    Icon: wallet,
  },
  {
    title: "Creation Proposal",
    description:
      "Allow creation of proposal on smart contract based on new learning modules, school policies, learning methods and others. Proposal submissions, recording the proposal details which include it’s description, expiration date.",
    Icon: create,
  },
  {
    title: "Voting",
    description:
      "Enables the integration of blockchain-enabled voting methods such as quadratic voting, which ensures that participants with fewer tokens have a meaningful say in decisions, avoiding dominance by a single group.",
    Icon: vote,
  },
  {
    title: "Proposal Execution",
    description:
      "Upon the conclusion of a vote, the smart contract automatically triggers the proposed action which ensures auditability and effectives of proposals.",
    Icon: execute,
  },
  {
    title: "Collaboration Medium",
    description:
      "DAOIt introduces an inclusive participatory and a  global learning ecosystem, through decentralized finance (DeFi) tools, allowing participants to learn, contribute and interact with crypto wallets, trading platforms, and staking mechanisms.",
    Icon: collaborate,
  },
  {
    title: "Transparency & Auditability",
    description:
      "All transactions and decisions are recorded on a public blockchain. DAOIt aligns with global educational goals, particularly SDG 4.7, ensuring a transparent and auditable system by promoting inclusivity, peace and sustainability. ",
    Icon: transparency,
  },
];

const Works = () => (
  <div className="flex flex-col item-center pt-8 px-14    ">
    <div className=" mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Learn more on how DAOit works Today!
      </h1>
      <p className="mt-4 text-gray-600 max-w-lg pb-10">
        In a few detailed steps, learn more about how DAOit works, the values,
        and features it offers, and how to use it.
      </p>
    </div>
    <div className="pt-10 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-36 justify-center items-center">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            svgSrc={card.Icon}
          />
        ))}
      </div>
    </div>
  </div>
);

export default Works;
