import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton, ThirdwebProvider } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import logo from "../../../assets/logo.svg";

// Initialize QueryClient
const queryClient = new QueryClient();

// Initialize ThirdWeb client
const client = createThirdwebClient({
  clientId: "68e77509b173a1cf92aff87441d10f5c", // Replace with your actual client ID
});

// Configure supported wallets
const wallets = [
  inAppWallet({
    auth: {
      options: ["email", "phone"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider client={client}>
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

          <ConnectButton
            client={client}
            wallets={wallets}
            theme={darkTheme({
              colors: {
                modalBg: "hsl(0, 0%, 0%)", // Black background
                borderColor: "hsl(60, 100%, 50%)", // Yellow border
                accentText: "hsl(60, 100%, 50%)", // Yellow accent text
                separatorLine: "hsl(60, 100%, 30%)", // Darker yellow separator
                primaryText: "hsl(60, 100%, 50%)", // Yellow text
                secondaryText: "hsl(60, 100%, 40%)", // Slightly darker yellow text
                selectedTextColor: "hsl(0, 0%, 0%)", // Black text for selected items
                tooltipText: "hsl(0, 0%, 0%)", // Black tooltip text
                accentButtonText: "hsl(0, 0%, 0%)", // Black button text
              },
            })}
            connectModal={{ size: "wide", showThirdwebBranding: false }}
            onConnect={() => navigate('/app')}
          />
        </header>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
};

export default Header;
