import React, { useState, useEffect } from "react";
import profile from "../../../assets/profile.png";
import { useGlobalStore } from "../../../main";

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

  return (
    <div className="mx-20 mt-10 p-5 gap-10 rounded-lg  mb-8 bg-[#373434]">
      {user && profile ? (
        <div className="flex items-center  justify-between">
          <div className="flex items-center gap-2">
            <img src={profile} alt="User" className="w-10 h-10 rounded-full" />
            <div>
            <h2 className="text-white text-lg font-semibold">
              {isLoaded ? username : (
                <div className="animate-pulse bg-gray-600 h-6 w-32 rounded"></div>
              )}
          </h2>
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
