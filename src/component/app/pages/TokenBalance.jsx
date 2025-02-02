import React from 'react';
import { useReadContract, useActiveAccount } from "thirdweb/react";
import { getContract, createThirdwebClient } from "thirdweb";
import { sepolia } from "thirdweb/chains";

const TOKENADDRESS = "0x920ba9f0C30f7360865Feafb9372141140bbE533";

const client = createThirdwebClient({
  clientId: "68e77509b173a1cf92aff87441d10f5c",
});

const contract = getContract({
  address: TOKENADDRESS,
  chain: sepolia,
  client,
});

const TokenBalance = () => {
  const wallet = useActiveAccount();
  const walletAddress = wallet?.address;
  console.log("address", wallet?.address);

  const { data: balance, isLoading, error } = useReadContract({
    contract,
    method: "function balanceOf(address owner) view returns (uint256)",
    params: walletAddress ? [walletAddress] : undefined,
    enabled: !!walletAddress,  // Only run query when we have an address
  });

  // Debug logs
  React.useEffect(() => {
    console.log("Contract Address:", TOKENADDRESS);
    console.log("Wallet Data:", wallet);
    console.log("Wallet Address:", walletAddress);
    console.log("Balance Data:", balance);
    console.log("Is Loading:", isLoading);
    console.log("Error:", error);
  }, [wallet, walletAddress, balance, isLoading, error]);

  const getButtonContent = () => {
    if (!walletAddress) {
      return "Connect Wallet";
    }
    if (isLoading) {
      return "Loading...";
    }
    if (error) {
      return "Error loading balance";
    }
    
    try {
      const formattedBalance = balance ? 
        (Number(balance) / 1e18).toFixed(2) : "0";
      return `${formattedBalance} credits`;
    } catch (e) {
      console.error("Error formatting balance:", e);
      return "Error formatting balance";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button className="bg-gray-300 text-black rounded-md px-4 py-2">
        {getButtonContent()}
      </button>
      {error && (
        <div className="text-red-500 text-sm">
          Error: {error.message}
        </div>
      )}
    </div>
  );
};

export default TokenBalance;