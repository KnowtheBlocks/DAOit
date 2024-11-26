import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactSVG } from "react-svg";
import logo from "../../assets/logo.svg";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="flex items-center justify-between p-4">
      <div className="text-xl font-bold">
        <Link to="/">
          <ReactSVG src={logo} width={100} height={100} />
        </Link>
      </div>

      <nav className="flex space-x-6">
        <Link
          to="/developers"
          className={`hover:underline hover:text-black ${
            isActive("/developers") ? "border-b-2 border-black" : ""
          }`}
        >
          Developers
        </Link>
        <Link
          to="/community"
          className={`hover:underline hover:text-black ${
            isActive("/community") ? "border-b-2 border-black" : ""
          }`}
        >
          Community
        </Link>
        <Link
          to="/how-it-works"
          className={`hover:underline hover:text-black ${
            isActive("/how-it-works") ? "border-b-2 border-black" : ""
          }`}
        >
          How it works
        </Link>
      </nav>

      <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700">
        Connect Wallet
      </button>
    </header>
  );
};

export default Header;
