"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { PhantomWalletName } from "@solana/wallet-adapter-phantom"; // Import Phantom wallet name
import { type WalletName } from "@solana/wallet-adapter-base";
interface WalletContextType {
  connected: boolean;
  walletAddress: string | null;
  balance: number | null;
  selectWallet: (walletName: WalletName) => void;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWalletContext: () => WalletContextType = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};

export const WalletContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { connection } = useConnection();
  const { connected, publicKey, connect, disconnect, select } = useWallet();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (publicKey) {
      setWalletAddress(publicKey.toBase58());
      fetchBalance(publicKey);
    } else {
      setWalletAddress(null);
      setBalance(null);
    }
  }, [publicKey, connection]);

  const fetchBalance = async (wallet: PublicKey) => {
    try {
      const balance = await connection.getBalance(wallet);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance(null);
    }
  };

  const selectWallet = async (walletName: WalletName) => {
    try {
      await select(walletName); //dont remove the await, else it throws wallet selction error
      await connect();
    } catch (error) {
      console.error("Error selecting wallet:", error);
    }
  };

  const value = {
    connected,
    walletAddress,
    balance,
    selectWallet,
    disconnect,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
