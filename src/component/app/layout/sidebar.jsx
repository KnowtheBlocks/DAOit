import React, { useEffect } from "react";
import {
  PiBookOpenUserThin,
  PiNotePencil,
  PiUserListThin,
} from "react-icons/pi";
import { RiSettingsLine } from "react-icons/ri";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
    { name: "Proposals", icon: <PiNotePencil />, link: "proposal" },
    { name: "Learning", icon: <PiBookOpenUserThin />, link: "set" },
    { name: "Settings", icon: <RiSettingsLine />, link: "learn" },
    { name: "Profile", icon: <PiUserListThin />, link: "profile" },
  ];

  useEffect(() => {
    const pathAfterApp =
      location.pathname.split("/app")[1]?.split("/")[1] || "";

    const matchedItem = menuItems.find((item) =>
      location.pathname.endsWith(item.link)
    );

    if (matchedItem) {
      setActiveLink(matchedItem.name);
    } else {
      setActiveLink("Proposals");
    }
  }, [location.pathname, menuItems]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider client={client}>
        <div className="w-64 bg-white shadow-md flex flex-col h-screen">
          <div className="pl-10 flex-grow">
            <div className="py-20 text-xl font-bold">
              <Link to="/app">
                <ReactSVG src={logo} width={100} height={100} />
              </Link>
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
          
          <div className="px-4 mb-6 pl-10">
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
        </div>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}

export default Sidebar;
