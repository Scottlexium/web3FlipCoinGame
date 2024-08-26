import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage, http } from "wagmi";
import {
  sepolia,
  polygon,
  neonDevnet,
  opBNBTestnet,
  polygonAmoy,
  holesky,
  // solana
} from "wagmi/chains";

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

export const metadata = {
  name: "Swissmote",
  description: "Swissmote flip game",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [
  polygon,
  neonDevnet,
  sepolia,
  polygonAmoy,
  opBNBTestnet,
  holesky,
] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  auth: {
    email: false,
  },
  //   connectors: [injected()],
  //   transports: {
  //     [sepolia.id]: http(),
  //     //   [polygon.id]: http(),
  //   },
});
