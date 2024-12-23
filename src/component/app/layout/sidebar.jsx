import React, { useEffect } from "react";
import {
  PiBookOpenUserThin,
  PiNotePencil,
  PiUserListThin,
} from "react-icons/pi";
import { RiSettingsLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { ReactSVG } from "react-svg";
import logo from "../../../assets/logo.svg";

function Sidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = React.useState("");

  const menuItems = [
    { name: "Proposals", icon: <PiNotePencil />, link: "proposal" },
    { name: "Learning", icon: <PiBookOpenUserThin />, link: "set" },
    { name: "Settings", icon: <RiSettingsLine />, link: "learn" },
    { name: "Profile", icon: <PiUserListThin />, link: "profile" },
  ];

  useEffect(() => {
    const pathAfterApp =
      location.pathname.split("/app")[1]?.split("/")[1] || "";

    const matchedItem = menuItems.find((item) =>
      location.pathname.endsWith(item.link)
    );

    if (matchedItem) {
      setActiveLink(matchedItem.name);
    } else {
      setActiveLink("Proposals");
    }
  }, [location.pathname, menuItems]);

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="pl-10">
        <div className="py-20 text-xl font-bold">
          <Link to="/app">
            <ReactSVG src={logo} width={100} height={100} />
          </Link>
        </div>
        <nav className="p-4 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={`/app/${item.link}`}
              className={`flex items-center space-x-3 cursor-pointer text-lg  
              ${activeLink === item.name ? "font-bold" : "text-black"} `}
            >
              <span
                className={`${
                  activeLink === item.name
                    ? "text-yellow-500 font-bold pl-5"
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
