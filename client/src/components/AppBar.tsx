"use client";
import React, { useEffect, useState } from "react";
import { useWalletContext } from "@/context/WalletContext";
import PhantomApp from "../../public/icons/phantomApp";
import { Link, LogOut } from "lucide-react";
import { PhantomWalletName } from "@solana/wallet-adapter-wallets";
import { useWeb3Modal, useWalletInfo } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

const AppBarComponent: React.FC = () => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { balance, disconnect } = useWalletContext();
  const { walletInfo } = useWalletInfo();
  const { open, close } = useWeb3Modal();
  useEffect(() => {
    // show modal if not connected
    if (!isConnected) {
      open({ view: "Connect" });
    }
  }, [isConnected, open]);

  const handleConnect = async () => {
    console.log("Connecting wallet...");
    try {
      return await open({ view: "Connect" });
      // await selectWallet(PhantomWalletName); // Using Phantom wallet as an example
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const WelcomeScreen = () => {
    return (
      <main className="fixed w-screen h-screen flex items-center justify-center top-0 left-0 bg-black">
        <div className="max-w-sm rounded-xl w-full md:w-[80%] h-full md:h-[80%] bg-theme-neptune p-5">
          <div className="flex flex-col items-center w-full justify-between h-full py-5">
            <h1 className="text-4xl text-center text-theme-uranus font-matemasie">
              connect wallet
            </h1>
            <button
              onClick={handleConnect}
              className="
              text-theme-saturn rounded-lg flex items-center
              w-full
              transition duration-300 ease-in-out 
              justify-start px-2 border
               border-theme-saturn hover:bg-theme-saturn hover:text-black pr-4 font-semibold"
            >
              <PhantomApp />
              Phantom wallet
            </button>
            <p className="text-base text-left text-theme-uranus">
              choose your wallet, theres are several wallet providers
            </p>
          </div>
        </div>
      </main>
    );
  };
  return (
    <div className="w-full fixed top-0 left-0 h-[70px] z-50 p-2 bg-black">
      {isConnected ? (
        <div className="flex justify-end p-2 items-center">
          <w3m-account-button />
          {/* <button onClick={disconnect} className="text-white px-4 py-2 rounded">
            <LogOut />
          </button> */}
        </div>
      ) : (
        <button
          onClick={handleConnect}
          className="
              float-right
              text-theme-saturn flex items-center
              w-fit
              transition duration-300 ease-in-out 
              justify-start px-2 border py-2
              gap-2
               border-theme-saturn hover:bg-theme-saturn hover:text-black pr-4 font-semibold"
        >
          <Link />
          Connect Wallet
        </button>
      )}
      {/* {!isConnected && <WelcomeScreen />} */}
    </div>
  );
};

export default AppBarComponent;
