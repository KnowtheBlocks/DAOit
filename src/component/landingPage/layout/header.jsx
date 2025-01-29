import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import logo from "../../../assets/logo.svg";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="flex items-center justify-center">
      <div className="max-w-screen-2xl w-full flex justify-between items-center p-4 px-10">
        <div className="text-xl font-bold">
          <Link to="/">
            <ReactSVG src={logo} width={100} height={100} />
          </Link>
        </div>

        <nav className="flex space-x-6">
          <Link
            to="/developers"
            className={`hover:border-b-2 hover:text-black ${
              isActive("/developers") ? "border-b-2 border-black" : ""
            }`}
          >
            Developers
          </Link>
          <Link
            to="/community"
            className={`hover:border-b-2 hover:text-black ${
              isActive("/community") ? "border-b-2 border-black" : ""
            }`}
          >
            Community
          </Link>
          <Link
            to="/how-it-works"
            className={`hover:border-b-2 hover:text-black ${
              isActive("/how-it-works") ? "border-b-2 border-black" : ""
            }`}
          >
            How it works
          </Link>
        </nav>

        <button
          onClick={() => navigate('/app')}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Connect Wallet
        </button>
      </div>
    </header>
  );
};

export default Header;
