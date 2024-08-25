"use client";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useEffect, useMemo } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom"; // Example wallet adapter
import { WalletContextProvider } from "@/context/WalletContext";
export default function AppWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const network = WalletAdapterNetwork.Devnet; // Change to Testnet if needed
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  // Add wallet adapters here
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);
  // const { select } = useWallet();
  // // useEffect(() => {
  // //   select(wallets[0].name);
  // // }, [select, wallets]);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContextProvider>{children}</WalletContextProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
