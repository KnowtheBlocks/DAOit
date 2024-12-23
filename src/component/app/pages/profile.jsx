import React, { useState } from "react";
import { FaPen, FaCopy } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { ReactSVG } from "react-svg";
import activity from "../../../assets/activity.svg";
import ProfileLayout from "./profile/profileLayout";

const ProfileCard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("0x4cee...b541");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ProfileLayout>
      <div className=" bg-white w-full rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-40">
          <img
            className="w-full h-full object-cover"
            src="https://via.placeholder.com/400x150"
            alt="Profile Background"
          />
          <button className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md">
            <FaPen className="text-gray-600" />
          </button>
        </div>

        <div className="relative -mt-12 flex justify-center">
          <img
            className="h-24 w-24 rounded-full border-4 border-white"
            src="https://via.placeholder.com/96"
            alt="Profile"
          />
        </div>

        <div className=" px-6 py-4">
          <h3 className="text-sm font-semibold text-gray-400">USERNAME</h3>

          <h2 className="text-[22px] ">WicKUsername</h2>
          <div className="flex  items-center gap-2 mt-2">
            <p className="font-medium text-sm text-gray-500">0x4cee...b541</p>
            <button
              onClick={handleCopy}
              className="text-gray-500 hover:text-gray-800"
              title="Copy Address"
            >
              <FaCopy />
            </button>
          </div>
          {copied && (
            <p className="text-sm text-green-500 mt-1">Address Copied!</p>
          )}

          <div className="pt-4 mt-4 border-t">
            <h3 className="text-sm font-semibold text-gray-400">BIO</h3>
            <p className="text-gray-600">I am a web3 enthusiast,</p>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default ProfileCard;
