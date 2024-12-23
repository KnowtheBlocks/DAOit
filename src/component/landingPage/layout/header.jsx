import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactSVG } from "react-svg";
import logo from "../../../assets/logo.svg";
import Modal from "../../utilies/modal";
import coin from "../../../assets/coinbase.svg";
import meta from "../../../assets/metamask.svg";
import Phantom from "../../../assets/phantom.svg";

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

      <button
        onClick={() => setActiveModal("wallet")}
        className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700"
      >
        Connect Wallet
      </button>
      <Modal
        isOpen={activeModal === "wallet"}
        onClose={closeModal}
        title="Choose a wallet"
      >
        <div className="flex flex-col justify-center items-center">
          <Link to="/app">
            <button className="flex items-center justify-center w-[350px] px-4 py-2 bg-[#494445] my-1 rounded-lg">
              <span className="flex gap-2 items-center">
                <ReactSVG src={coin} />
                Coinbase
              </span>
            </button>
          </Link>
          <Link to="/app">
            <button className="flex items-center justify-center w-[350px] px-4 py-2 bg-[#494445] my-1 rounded-lg">
              <span className="flex gap-2 items-center">
                <ReactSVG src={meta} /> Metamask
              </span>
            </button>
          </Link>
          <Link to="/app">
            <button className="flex items-center justify-center w-[350px] px-4 py-2 bg-[#494445] my-1 rounded-lg">
              <span className="flex gap-2 items-center">
                <ReactSVG src={Phantom} /> Phantom
              </span>
            </button>
          </Link>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
