import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThirdwebProvider } from "thirdweb/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { useGlobalStore } from "./store/globalStore";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);

const clientId = "68e77509b173a1cf92aff87441d10f5c";

root.render(
  <StrictMode>
    <BrowserRouter>
      <ThirdwebProvider clientId={clientId} activeChain={Sepolia} supportedChains={[Sepolia]}>
        <App />
      </ThirdwebProvider>
    </BrowserRouter>
  </StrictMode>
);
