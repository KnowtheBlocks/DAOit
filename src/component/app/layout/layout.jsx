import Sidebar from "./sidebar";
import Header from "./header";
import { Outlet, useLocation } from "react-router-dom";
import { useGlobalStore } from "../../../store/globalStore";
import profile from "../../../assets/profile.png";
import WalletButton from "../../utilies/WalletButton";

function Layout() {
  const location = useLocation();

  const shouldShowHeader = location.pathname !== "/app/profile";
  const { walletAddress } = useGlobalStore();

  // If no wallet is connected, show a message instead of the layout
  if (!walletAddress) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="max-w-md p-8 text-center bg-white rounded-lg shadow-lg flex flex-col gap-y-2">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600">
            Please connect your wallet using the button in the bottom left corner to access the application.
          </p>

          <div className="pt-5">
            <WalletButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto w-[1200px]">
        {shouldShowHeader && (
          <Header  profile={profile} />
        )}
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
