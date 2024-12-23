import React from "react";
import { HiOutlineUsers } from "react-icons/hi";
import { ReactSVG } from "react-svg";
import activity from "../../../../assets/activity.svg";
import { useNavigate } from "react-router-dom";

const ProfileLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-6 flex gap-20">
      <div className="pt-14">
        <button
          onClick={() => navigate("/app/profile")}
          className="p-2 border border-gray-300 rounded-full hover:bg-gray-200"
        >
          <HiOutlineUsers size={35} />
        </button>
        <div
          onClick={() => navigate("/app/activity-profile")}
          className="mt-10 pl-4 py-3 border border-gray-300 rounded-full hover:bg-gray-200 cursor-pointer"
        >
          <ReactSVG src={activity} />
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default ProfileLayout;
