import React from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../../assets/daoit.svg";
import help from "../../../assets/help.svg";
import more from "../../../assets/more.svg";
import user from "../../../assets/user.svg";

const Community = () => {
  const navigationLinks = [
    { to: "/resource-centre", icon: more, label: "Resource Centre" },
    { to: "/community", icon: user, label: "Join Community on socials" },
    { to: "/get-started", icon: logo, label: "Get started with DAOit" },
    { to: "/help-support", icon: help, label: "Help and support" },
  ];

  const infoCards = [
    {
      title: "Smart Contract Integration",
      description:
        "Discover an automated governance, proposal creation, voting contract, and decision-making processes via blockchain smart contracts.",
      linkTo: "/smart-contract-integration",
      linkLabel: "Learn more",
    },
    {
      title: "DAOit Impact on Sustainable Environmental Practices",
      description:
        "Blockchain-based climate management tools for tracking carbon emissions, Carbon Credits Trading, and educating users on sustainability practices.",
      linkTo: "/sustainable-practices",
      linkLabel: "Learn more",
    },
  ];
  return (
    <div className=" flex flex-col items-center text-center pt-8 lg:px-28">
      <section className="p-8  ">
        <h1 className="text-3xl font-bold text-gray-800">
          Join the Daoit Community
        </h1>
        <p className="mt-4 text-gray-600">
          Looking to learn more about Daoit? No worries, get access to the best
          resource available in order to get educated and become part of the
          community.
        </p>
        <button className="mt-6 px-6 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600">
          Read Blog Post
        </button>
      </section>

      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-wrap gap-4 mb-10">
          {navigationLinks.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center justify-between w-[48%] p-4 text-lg font-semibold bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100"
            >
              <div className=" flex items-center gap-2">
                <ReactSVG src={icon} width={100} height={100} /> {label}
              </div>
              <IoIosArrowDown />
            </Link>
          ))}
        </div>

        {/* Content Section */}
        <div className="flex flex-wrap gap-6 text-left">
          {infoCards.map(({ title, description, linkTo, linkLabel }) => (
            <div key={title} className="flex-1 min-w-[500px]  p-6 ">
              <h2 className="text-xl font-bold mb-4">{title}</h2>
              <p className="text-gray-600 mb-4">{description}</p>
              <Link
                to={linkTo}
                className="text-yellow-600 font-semibold hover:underline"
              >
                {linkLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
