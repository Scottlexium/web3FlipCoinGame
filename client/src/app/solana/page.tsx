"use client";
import React, { FC, useMemo, useEffect, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const Wallet: FC = () => {
  const network = WalletAdapterNetwork.Testnet; // Changed to Testnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [network]);

  const { connected, connect, disconnect, publicKey } = useWallet();
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
  }, [publicKey]);

  const fetchBalance = async (wallet: PublicKey) => {
    const connection = new Connection(endpoint, "confirmed"); // Use `endpoint` here
    const balance = await connection.getBalance(wallet);
    setBalance(balance / LAMPORTS_PER_SOL);
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div>
            {!connected ? (
              <button
                onClick={() => connect()}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Connect Wallet
              </button>
            ) : (
              <div>
                <button
                  onClick={() => disconnect()}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Disconnect Wallet
                </button>
                {walletAddress && (
                  <p className="text-green-500">
                    Connected Wallet Address: {walletAddress}
                  </p>
                )}
                {balance !== null && (
                  <p className="text-green-500">Balance: {balance} SOL</p>
                )}
              </div>
            )}
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Wallet;
