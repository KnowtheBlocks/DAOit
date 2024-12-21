import React, { useState } from "react";
import {
  PiBookOpenUserThin,
  PiNotePencil,
  PiUserListThin,
} from "react-icons/pi";
import { RiSettingsLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import logo from "../../../assets/logo.svg";

function Sidebar() {
  const [activeLink, setActiveLink] = useState("Proposals");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Proposals", icon: <PiNotePencil />, link: "/app" },
    { name: "Learning", icon: <PiBookOpenUserThin />, link: "/app" },
    { name: "Settings", icon: <RiSettingsLine />, link: "/app" },
    { name: "Profile", icon: <PiUserListThin />, link: "/app" },
  ];

  return (
    <div className="w-64 bg-white shadow-md flex flex-col h-screen">
      <div className="pl-10 flex-grow">
        <div className="py-20 text-xl font-bold">
          <Link to="/app">
            <ReactSVG src={logo} width={100} height={100} />
          </Link>
        </div>

        <nav className="p-4 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              onClick={() => setActiveLink(item.name)}
              className={`flex items-center space-x-3 cursor-pointer`}
            >
              <span
                className={`${
                  activeLink === item.name
                    ? "text-yellow-500 font-medium pl-5"
                    : "text-black"
                }`}
              >
                {item.icon}
              </span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
