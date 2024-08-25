import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import "./CoinFlip.css"; // Import your CSS styles

type CoinFlipProps = {
  onFlip: (flipResult: string) => void;
};

export type CoinFlipRef = {
  flipCoin: () => void;
};

const CoinFlip: React.ForwardRefRenderFunction<CoinFlipRef, CoinFlipProps> = (
  { onFlip },
  ref
) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const coinRef = useRef<HTMLDivElement>(null);

  const flipCoin = () => {
    setIsFlipping(true);

    const flips = Math.floor(Math.random() * 5) + 3; // Random number of flips between 3 and 7
    const duration = Math.random() * 2 + 1; // Random duration between 1s to 3s

    if (coinRef.current) {
      const coin = coinRef.current;

      // Trigger the coin flip animation
      coin.style.transition = `transform ${duration}s ease-out`;
      coin.style.transform = `rotateY(${flips * 180}deg)`;

      // End the flipping after the duration
      setTimeout(() => {
        const isHeads = Math.random() > 0.5;
        coin.style.transform = `rotateY(${isHeads ? 0 : 180}deg)`;
        setIsFlipping(false);
        onFlip(isHeads ? "Heads" : "Tails");
      }, duration * 1000);
    }
  };

  // Expose the flipCoin function to the parent component
  useImperativeHandle(ref, () => ({
    flipCoin,
  }));

  return (
    <div className="purse">
      <div className={`coin ${isFlipping ? "flipping" : ""}`} ref={coinRef}>
        <div className="front"></div>
        <div className="back"></div>
        <div className="side">
          {[...Array(16)].map((_, index) => (
            <div className="spoke" key={index}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(CoinFlip);
