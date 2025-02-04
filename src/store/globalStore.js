import { create } from "zustand";

export const useGlobalStore = create((set) => ({
  walletAddress: null,
  userId: null,
  setWalletInfo: (address) => {
    console.log("💼 Setting Wallet Address:", address);
    const userId = address ? `user_${address.slice(2, 10)}` : null;
    console.log("🆔 Generated User ID:", userId);
    set({ walletAddress: address, userId });
  },
  clearWalletInfo: () => set({ walletAddress: null, userId: null }),
}));
