import React from "react";
import { useNavigate } from "react-router-dom";

const ProposalCard = ({
  title,
  description,
  avatar,
  username,
  votes,
  timeRemaining,
  status,
  activity,
}) => {
  const navigate = useNavigate();

  const getStatusStyles = () => {
    switch (status) {
      case "opened":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-600 text-[#494445]";
      case "closed":
        return "bg-gray-800 hover:bg-gray-900 text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };
  const getActivityStyles = () => {
    switch (activity) {
      case "yes":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "no":
        return "bg-[#E27525]  text- text-white";
      case "abstain":
        return "bg-gray-800 hover:bg-gray-900 text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };
  const handleCardClick = () => {
    navigate(`/app/proposal`, { state: { activity } });
  };
  return (
    <div
      className="  p-4 bg-white rounded-lg shadow-md border border-gray-200"
      onClick={handleCardClick}
    >
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg  text-gray-800">{title}</h3>
          <div className="mt-2 text-gray-600">
            <p className="text-lg ">Description:</p>
            <p className="">{description}</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            className={`mt-4  px-4 h-10 py-2  rounded-lg focus:outline-none ${getStatusStyles()}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
          {activity && (
            <button
              className={`mt-4 w-fit  px-4 h-10 py-2  rounded-lg focus:outline-none ${getActivityStyles()}`}
            >
              {activity.charAt(0).toUpperCase() + activity.slice(1)}
            </button>
          )}
        </div>
      </div>
      <div className=" mt-4 flex justify-between items-center">
        <div>
          <p className="text-xs">Submited by</p>
          <div className="flex items-center ">
            <img className="w-8 h-8 rounded-full" src={avatar} alt="Avatar" />
            <p className="ml-2 text-xs text-gray-500">{username}</p>
          </div>
        </div>
        <div className="flex items-center justify-between  gap-3 mt-4 text-xs text-gray-500">
          <span>{votes} votes</span>
          <span>{timeRemaining}</span>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;
