import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { Outlet } from "react-router-dom";
import { useGlobalStore } from "../../../main";

function Layout() {
  const { walletAddress } = useGlobalStore();

  // If no wallet is connected, show a message instead of the layout
  if (!walletAddress) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600">
            Please connect your wallet using the button in the bottom left corner to access the application.
          </p>
        </div>
      </div>
    );
  }

  // Normal layout when wallet is connected
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto w-[1200px]">
        {shouldShowHeader && (
          <Header user="username.....5678" profile={profile} />
        )}
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
