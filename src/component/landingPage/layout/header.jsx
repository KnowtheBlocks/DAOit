import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactSVG } from "react-svg";
import logo from "../../../assets/logo.svg";
import Modal from "../../utilies/modal";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <header className="flex items-center justify-between p-4 px-10">
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

      {/* <Link to="/app"> */}
      <button
        onClick={() => setActiveModal("wallet")}
        className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700"
      >
        Connect Wallet
      </button>
      {/* </Link> */}
      <Modal
        isOpen={activeModal === "wallet"}
        onClose={closeModal}
        title="Choose a wallet"
      >
        <div className="space-y-3">
          <button className="flex items-center justify-between w-full px-4 py-2 bg-gray-700 rounded-lg">
            <span>🟦 Coinbase</span>
          </button>
          <button className="flex items-center justify-between w-full px-4 py-2 bg-gray-700 rounded-lg">
            <span>🦊 Metamask</span>
          </button>
          <button className="flex items-center justify-between w-full px-4 py-2 bg-gray-700 rounded-lg">
            <span>👻 Phantom</span>
          </button>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
