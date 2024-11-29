import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import arrow from "../../../../assets/sideArrow.svg";
import { Link } from "react-router-dom";
import Modal from "../../../utilies/modal";
import coin from "../../../../assets/coinbase.svg";
import meta from "../../../../assets/metamask.svg";
import Phantom from "../../../../assets/phantom.svg";

const HeroSection = () => {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="relative overflow-hidden ">
      <div className="absolute inset-0 bg-header-pattern bg-no-repeat bg-left-top transform scale-x-[-1] bg-[length:150%]"></div>
      <div className="relative z-10 px-10 pt-5">
        <div className="flex flex-col items-center text-center md:px-44">
          <h1 className="text-5xl max-w-5xl md:text-5xl font-bold text-gray-800">
            Building a Collaborative Learning Community through Open & Inclusive
            Decision-Making
          </h1>
          <p className="mt-4 max-w-2xl text-center text-lg">
            Join our Educational Decentralized Autonomous Organization (DAO) to
            Learn, Collaborate, and Grow. We are Focus on Empowering Students,
            Educators, and Administrators In a Transparent, Open and
            Collaborative Decision-making Process.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            {/* <Link to="/app"> */}
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
              onClick={() => setActiveModal("wallet")}
            >
              Launch App
            </button>
            {/* </Link> */}
            <button className=" flex items-center gap-2 py-2 px-4 rounded border-yellow-600">
              <p>Explore Proposal</p>
              <ReactSVG src={arrow} />
            </button>
          </div>
          <div className="mt-8">
            {/* <img
              src="/path/to/blockchain-image.png"
              alt="Blockchain graphic"
              className="mx-auto max-w-full"
            /> */}
          </div>
        </div>
      </div>
      <Modal
        isOpen={activeModal === "wallet"}
        onClose={closeModal}
        title="Choose a wallet"
      >
        <div className="space-y-3">
          <Link to="/app">
            <button className="flex items-center justify-between w-full px-4 py-2 bg-[#494445] my-1 rounded-lg">
              <span className="flex gap-2 items-center">
                <ReactSVG src={coin} />
                Coinbase
              </span>
            </button>
          </Link>
          <Link to="/app">
            <button className="flex items-center justify-between w-full px-4 py-2 bg-[#494445] my-1 rounded-lg">
              <span className="flex gap-2 items-center">
                <ReactSVG src={meta} /> Metamask
              </span>
            </button>
          </Link>
          <Link to="/app">
            <button className="flex items-center justify-between w-full px-4 py-2 bg-[#494445] my-1 rounded-lg">
              <span className="flex gap-2 items-center">
                <ReactSVG src={Phantom} /> Phantom
              </span>
            </button>
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default HeroSection;
