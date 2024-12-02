import React, { useState } from "react";
import {
  PiBookOpenUserThin,
  PiNotePencil,
  PiUserListThin,
} from "react-icons/pi";
import { RiSettingsLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { ConnectButton, ThirdwebProvider } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import logo from "../../../assets/logo.svg";

// Initialize QueryClient
const queryClient = new QueryClient();

// Initialize ThirdWeb client
const client = createThirdwebClient({
  clientId: "68e77509b173a1cf92aff87441d10f5c",
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

function Sidebar() {
  const [activeLink, setActiveLink] = useState("Proposals");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Proposals", icon: <PiNotePencil />, link: "/app" },
    { name: "Learning", icon: <PiBookOpenUserThin />, link: "/app" },
    { name: "Settings", icon: <RiSettingsLine />, link: "/app" },
    { name: "Profile", icon: <PiUserListThin />, link: "/app" },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider client={client}>
        <div className="w-64 bg-white shadow-md">
          <div className="pl-10">
            <div className="py-20 text-xl font-bold">
              <Link to="/app">
                <ReactSVG src={logo} width={100} height={100} />
              </Link>
            </div>
            
            <div className="px-4 mb-6">
              <ConnectButton
                client={client}
                wallets={wallets}
                theme={darkTheme({
                  colors: {
                    modalBg: "hsl(0, 0%, 0%)",
                    borderColor: "hsl(60, 100%, 50%)",
                    accentText: "hsl(60, 100%, 50%)",
                    separatorLine: "hsl(60, 100%, 30%)",
                    primaryText: "hsl(60, 100%, 50%)",
                    secondaryText: "hsl(60, 100%, 40%)",
                    selectedTextColor: "hsl(0, 0%, 0%)",
                    tooltipText: "hsl(0, 0%, 0%)",
                    accentButtonText: "hsl(0, 0%, 0%)",
                  },
                })}
                connectModal={{ size: "wide", showThirdwebBranding: false }}
                onConnect={() => navigate('/app')}
                onDisconnect={() => navigate('/')}
              />
            </div>

            <nav className="p-4 space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  onClick={() => setActiveLink(item.name)}
                  className={`flex items-center space-x-3 cursor-pointer`}
                >
                  <span
                    className={`${
                      activeLink === item.name
                        ? "text-yellow-500 font-medium pl-5"
                        : "text-black"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}

export default Sidebar;
