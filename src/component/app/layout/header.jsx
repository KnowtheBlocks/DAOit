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
    <div className="mx-20 flex items-center mt-10 gap-[70%] p-5 rounded-lg justify-between mb-8 bg-[#373434]">
      <div className="flex items-center space-x-4">
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
          🔔
        </button>
      </div>
    </div>
  );
}

export default Header;
