import React from "react";
import profile from "../../../assets/profile.png";

function Header() {
  return (
    <div className="mx-20 flex items-center mt-10 gap-[70%] p-5 rounded-lg justify-between mb-8 bg-[#373434]">
      <div className="flex items-center space-x-4">
        <img src={profile} alt="User" className="w-10 h-10 rounded-full" />
        <div>
          <h2 className=" text-white text-lg font-semibold">
            Usernameurname234
          </h2>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative bg-black  w-10 h-10 rounded-full">
          <span className="absolute w-2.5 h-2.5 bg-red-500 rounded-full right-0 top-0"></span>
          🔔
        </button>
      </div>
    </div>
  );
}

export default Header;
