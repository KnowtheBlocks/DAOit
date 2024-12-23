import React, { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Modal from "../../utilies/modal";
import logo from "../../../assets/logo-white.svg";
import coin from "../../../assets/coinbase.svg";
import meta from "../../../assets/metamask.svg";
import Phantom from "../../../assets/phantom.svg";

function Header({ user, profile }) {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="mx-20 mt-10 p-5 gap-10 rounded-lg  mb-8 bg-[#373434]">
      {user && profile ? (
        <div className="flex items-center  justify-between">
          <div className="flex items-center gap-2">
            <img src={profile} alt="User" className="w-10 h-10 rounded-full" />
            <div>
              <h2 className="text-white text-lg font-semibold">{user}</h2>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative bg-black w-10 h-10 rounded-full">
              <span className="absolute w-2.5 h-2.5 bg-red-500 rounded-full right-0 top-0"></span>
              <IoMdNotifications color="white" size={25} className="pl-3" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <div className="text-xl font-bold">
            <Link to="/">
              <ReactSVG src={logo} width={100} height={100} />
            </Link>
          </div>
          <button
            onClick={() => setActiveModal("wallet")}
            className="px-4 py-2 bg-black text-white rounded-md "
          >
            Connect Wallet
          </button>
          {activeModal === "wallet" && (
            <Modal isOpen={true} onClose={closeModal} title="Choose a wallet">
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
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
