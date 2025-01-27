import { useEffect, useState } from "react";
import profile from "../../../assets/profile.png";
import { useGlobalStore } from "../../../main";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Modal from "../../utilies/modal";
import logo from "../../../assets/logo-white.svg";
import coin from "../../../assets/coinbase.svg";
import meta from "../../../assets/metamask.svg";
import Phantom from "../../../assets/phantom.svg";

function Header() {
  const [username, setUsername] = useState("Loading...");
  const { walletAddress } = useGlobalStore();
  const [isLoaded, setIsLoaded] = useState(false);

  // Poll for wallet address until available
  useEffect(() => {
    const pollInterval = setInterval(() => {
      if (walletAddress) {
        // Format wallet address: show first 6 and last 4 characters
        const formattedAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
        setUsername(formattedAddress);
        setIsLoaded(true);
        clearInterval(pollInterval);
      }
    }, 1000); // Poll every second

    // Cleanup interval on component unmount
    return () => clearInterval(pollInterval);
  }, [walletAddress]);

  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="mx-20 mt-10 p-5 gap-10 rounded-lg  mb-8 bg-[#373434]">
      {username && profile ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={profile} alt="User" className="w-10 h-10 rounded-full" />
            <div>
              <h2 className="text-lg font-semibold text-white">
                {isLoaded ? username : (
                  <div className="w-32 h-6 bg-gray-600 rounded animate-pulse">{username}</div>
                )}
              </h2>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative w-10 h-10 bg-black rounded-full">
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
            className="px-4 py-2 text-white bg-black rounded-md "
          >
            Connect Wallet
          </button>
          {activeModal === "wallet" && (
            <Modal isOpen={true} onClose={closeModal} title="Choose a wallet">
              <div className="flex flex-col items-center justify-center">
                <Link to="/app">
                  <button className="flex items-center justify-center w-[350px] px-4 py-2 bg-[#494445] my-1 rounded-lg">
                    <span className="flex items-center gap-2">
                      <ReactSVG src={coin} />
                      Coinbase
                    </span>
                  </button>
                </Link>
                <Link to="/app">
                  <button className="flex items-center justify-center w-[350px] px-4 py-2 bg-[#494445] my-1 rounded-lg">
                    <span className="flex items-center gap-2">
                      <ReactSVG src={meta} /> Metamask
                    </span>
                  </button>
                </Link>
                <Link to="/app">
                  <button className="flex items-center justify-center w-[350px] px-4 py-2 bg-[#494445] my-1 rounded-lg">
                    <span className="flex items-center gap-2">
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
