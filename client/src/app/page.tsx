"use client";
import React, { useMemo, useState, useEffect, useRef, useReducer } from "react";
import CoinFlip, { CoinFlipRef } from "@/components/CoinFlip";
import { Gem, Plus, Minus, BringToFront, SendToBack } from "lucide-react";
import { ethers } from "ethers";
import { contractABI } from "@/AddressABI/contractABI";
import { useWalletInfo } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { contractAddress } from "@/AddressABI/contractAddress";

enum Outcome {
  HEADS = "HEADS",
  TAILS = "TAILS",
}

type State = {
  stakedAmount: number;
};

type Action =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: number };

const initialState: State = {
  stakedAmount: 0,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { stakedAmount: state.stakedAmount + action.payload };
    case "decrement":
      return { stakedAmount: Math.max(0, state.stakedAmount - action.payload) };
    default:
      return state;
  }
};

export default function Home() {
  const { walletInfo } = useWalletInfo();
  const { chain } = useAccount();

  const coinFlipRef = useRef<CoinFlipRef>(null);
  const [flipOutcome, setFlipOutcome] = useState("");
  const [flipping, setFlipping] = useState(false);
  const [predictedOutcome, setPredictedOutcome] = useState<Outcome | null>(
    Outcome.HEADS
  );
  const [state, dispatch] = useReducer(reducer, initialState);
  const [coinFlipGame, setCoinFlipGame] = useState<ethers.Contract | null>(
    null
  );
  // Handle flip animation and result
  const handleFlip = async () => {
    setFlipping(true);
    if (coinFlipRef.current) {
      coinFlipRef.current.flipCoin();
    }

    if (!coinFlipGame) {
      console.error("Contract not initialized");
      setFlipping(false);
      return;
    }

    try {
      // Place the bet
      await coinFlipGame.placeBet(predictedOutcome === Outcome.HEADS ? 0 : 1, {
        value: ethers.parseEther(state.stakedAmount.toString()),
      });

      // Simulate flipping result (for demo purposes)
      const outcome = Math.random() < 0.5 ? 0 : 1;
      await coinFlipGame.submitFlipResult(outcome);

      // Handle flip outcome
      setFlipOutcome(outcome === 0 ? Outcome.HEADS : Outcome.TAILS);
    } catch (error) {
      console.error("Error during bet or flip submission:", error);
    } finally {
      setFlipping(false);
    }
  };

  const handlePredict = (outcome: keyof typeof Outcome) => {
    setPredictedOutcome(Outcome[outcome]);
  };

  const handleIncrement = () => {
    dispatch({ type: "increment", payload: 0.1 }); // Increment by 0.1
  };

  const handleDecrement = () => {
    dispatch({ type: "decrement", payload: 0.1 }); // Decrement by 0.1
  };

  const onFlipResult = (result: string) => {
    setFlipOutcome(result);
    setFlipping(false);
  };

  return (
    <main className="flex items-center justify-center min-h-screen h-full w-full relative px-2 sm:px-20 pb-40">
      <div className="absolute top-20 font-jersey text-3xl mb-20 text-center">
        <p>{flipping ? "Flipping..." : flipOutcome}</p>
        <p>{`You ${
          flipOutcome.toLowerCase() === predictedOutcome?.toLowerCase()
            ? "win 🤩"
            : "lose 😢"
        }`}</p>
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full h-full mt-40 md:mt-0">
        <div className="bg-theme-neptune w-full col-span-1 py-10 px-5 rounded-lg space-y-5 order-2 md:order-1 mt-40">
          <label
            htmlFor=""
            className="text-white flex items-center gap-2 text-xs"
          >
            <Gem />
            Amount ({chain?.nativeCurrency.symbol})
          </label>
          <div className="flex items-center bg-black p-2 gap-4">
            <button
              className="p-3 text-white bg-theme-neptune"
              onClick={handleIncrement}
            >
              <Plus />
            </button>
            <input
              type="number"
              className={`w-full text-center placeholder:text-center bg-transparent text-white `}
              value={state.stakedAmount.toFixed(1)} // Ensure the value displays with one decimal place
              readOnly
            />
            <button
              className="p-3 text-white bg-theme-neptune"
              onClick={handleDecrement}
            >
              <Minus />
            </button>
          </div>
          <div className="flex items-center bg-black p-2 gap-2 justify-between">
            <button
              className={`w-[50%] p-3 text-white bg-theme-neptune flex items-center justify-center gap-2 ${
                predictedOutcome === Outcome.HEADS ? "bg-theme-saturn" : ""
              }`}
              onClick={() => {
                handlePredict("HEADS");
              }}
            >
              <BringToFront className="text-xs" />
              <p className="text-xs">HEAD</p>
            </button>
            <button
              className={`w-[50%] p-3 text-white bg-theme-neptune flex items-center justify-center gap-2 ${
                predictedOutcome === Outcome.TAILS ? "bg-theme-saturn" : ""
              }`}
              onClick={() => {
                handlePredict("TAILS");
              }}
            >
              <SendToBack />
              <p className="text-xs">TAIL</p>
            </button>
          </div>
          <button
            disabled={flipping}
            onClick={handleFlip}
            className="bg-theme-saturn w-full py-3 saturn-shadow"
          >
            <p className="text-white">Stake</p>
          </button>
        </div>
        <div className="lg:col-span-2 order-1 md:order-2">
          <CoinFlip ref={coinFlipRef} onFlip={onFlipResult} />
        </div>
        {/* <div className="w-full h-full bg-red-200 order-3 mt-20 md:mt-0 p-2">
          History
        </div> */}
      </div>
      <br />
    </main>
  );
}
