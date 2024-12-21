import React, { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { ThirdwebProvider, ConnectButton, useActiveAccount, useWalletBalance } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { Ethereum, Goerli } from "@thirdweb-dev/chains";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { createThirdwebClient } from "thirdweb";
import { create } from "zustand";

const container = document.getElementById("root");
const root = createRoot(container);

const clientId = "68e77509b173a1cf92aff87441d10f5c";
console.log("🔑 Client ID:", clientId);

const client = createThirdwebClient({ clientId });
console.log("🌐 Thirdweb Client Created");

const wallets = [
  inAppWallet({ recommended: true }), // Email and phone login
  createWallet("io.metamask"),
];
console.log("👛 Available Wallets:", wallets.map(w => w.id));

// Global state store for wallet and user info
export const useGlobalStore = create((set) => ({
  walletAddress: null,
  userId: null,
  setWalletInfo: (address) => {
    console.log("💼 Setting Wallet Address:", address);
    const userId = address ? `user_${address.slice(2, 10)}` : null;
    console.log("🆔 Generated User ID:", userId);
    set({ walletAddress: address, userId });
  },
  clearWalletInfo: () => set({ walletAddress: null, userId: null })
}));

function WalletButton() {
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  const account = useActiveAccount();
  console.log("👤 Active Account:", account?.address);

  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: Ethereum,
    address: account?.address,
  });
  console.log("💰 Wallet Balance:", isLoading ? "Loading..." : balance?.displayValue);

  const { setWalletInfo, userId } = useGlobalStore();

  // Update global wallet info when account changes
  React.useEffect(() => {
    console.log("🔄 Account Changed - New Address:", account?.address);
    setWalletInfo(account?.address || null);
  }, [account?.address, setWalletInfo]);

  const toggleSensitiveInfo = () => setShowSensitiveInfo(!showSensitiveInfo);

  const maskText = (text) => "•".repeat(text?.length || 0);

  return (
    <div className="fixed bottom-4 left-4">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <ConnectButton 
          client={client}
          wallets={wallets}
          theme="light"
          modalSize="wide"
        />
        {account && (
          <div className="mt-4 space-y-2 text-sm">
            <div className="p-3 bg-gray-50 rounded relative">
              <p className="font-medium">User ID</p>
              <p className="text-gray-600">{showSensitiveInfo ? userId : maskText(userId)}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded relative">
              <p className="font-medium">Wallet Address</p>
              <p className="text-gray-600 break-all">
                {showSensitiveInfo ? account.address : maskText(account.address)}
              </p>
            </div>
            {!isLoading && balance && (
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium">Balance</p>
                <p className="text-gray-600">
                  {balance.displayValue} {balance.symbol}
                </p>
              </div>
            )}
            <button
              onClick={toggleSensitiveInfo}
              className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-800"
            >
              {showSensitiveInfo ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

console.log("🚀 Starting React App Render");
root.render(
  <StrictMode>
    <BrowserRouter>
      <ThirdwebProvider 
        clientId={clientId}
        activeChain={Ethereum}
        supportedChains={[Ethereum, Goerli]}
      >
        <App />
        <WalletButton />
      </ThirdwebProvider>
    </BrowserRouter>
  </StrictMode>
);
