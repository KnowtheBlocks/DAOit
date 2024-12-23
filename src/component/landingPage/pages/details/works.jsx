import React from "react";
import Card from "../../../utilies/card";
import vote from "../../../../assets/vote.svg";
import collaborate from "../../../../assets/colab.svg";
import wallet from "../../../../assets/Group 17.svg";
import global from "../../../../assets/global.svg";
import { ReactSVG } from "react-svg";

const HowItWorks = () => {
  const cards = [
    {
      title: "Connect Wallet",
      description:
        "To join the DAOIt you have to connect your wallet either Metamask, wallet connect and form of decentralized wallet which you have.",
      Icon: wallet,
    },

    {
      title: "Voting",
      description:
        "Enables the integration of blockchain-enabled voting methods such as quadratic voting, which ensures that participants with fewer tokens have a meaningful say in decisions, avoiding dominance by a single group.",
      Icon: vote,
    },

    {
      title: "Collaboration Medium",
      description:
        "DAOIt introduces an inclusive participatory and a  global learning ecosystem, through decentralized finance (DeFi) tools, allowing participants to learn, contribute and interact with crypto wallets, trading platforms, and staking mechanisms.",
      Icon: collaborate,
    },
  ];

  return (
    <div className="relative overflow-hidden ">
      <div className="absolute inset-0 bg-header-pattern bg-no-repeat bg-left-top transform scale-x-[-1] bg-[length:150%]"></div>
      <div className="relative z-10 ">
        {" "}
        <div className=" py-12 px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            How It Works
          </h2>
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
        <div className="py-16 px-8">
          <div className="flex flex-col md:flex-row items-center md:gap-5 md:space-x-8">
            <div className="text-center md:text-left max-w-2xl">
              <h3 className="text-[40px] font-bold mb-4 text-yellow-600">
                Promotion of sustainable practices and climate awareness in
                education
              </h3>
              <p className="text-gray-600 text-2xl">
                DAOIt integrates blockchain tools for tracking carbon emissions
                and trading carbon credits, supporting educational institutions
                in adopting sustainable practices. The platform educates
                participants on the environmental impact of blockchain,
                advocating for energy-efficient models like Proof of Stake
                (PoS).
              </p>
            </div>
            <ReactSVG src={global} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
