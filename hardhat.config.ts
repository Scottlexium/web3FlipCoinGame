require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require('@openzeppelin/hardhat-upgrades');
require("@nomicfoundation/hardhat-ignition");
require("@nomicfoundation/hardhat-verify");
const { vars } = require("hardhat/config");

const oklinkKey = vars.get("OKLINK_API_KEY");
const holeskyKey = vars.get("HOLESKY_API_KEY");
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.21",
  // defaultNetwork: "neondevnet",
  sourcify: {
    enabled: true
  },
  etherscan: {
    apiKey: {
      // neonevm: "test"
      polygonAmoy: oklinkKey,
      holesky: holeskyKey
    },
    customChains: [
      {
        network: "neonevm",
        chainId: 245022926,
        urls: {
          apiURL: "https://devnet-api.neonscan.org/hardhat/verify",
          browserURL: "https://devnet.neonscan.org"
        }
      },
      {
        network: "neonevm",
        chainId: 245022934,
        urls: {
          apiURL: "https://api.neonscan.org/hardhat/verify",
          browserURL: "https://neonscan.org"
        }
      },
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://www.oklink.com/api/explorer/v1/contract/verify/async/api/polygonAmoy",
          browserURL: "https://www.oklink.com/amoy"
        }
      },
      {
        network: "holesky",
        chainId: 17000,
        urls: {
          apiURL: "https://api-holesky.etherscan.io/api",
          browserURL: "https://holesky.etherscan.io"
        }
      }
    ]
  },
  networks: {
    neondevnet: {
      url: "https://devnet.neonevm.org",
      accounts: [process.env.NEONEVM_PRIVATE_KEY],
      chainId: 245022926
    },
    neonmainnet: {
      url: "https://neon-proxy-mainnet.solana.p2p.org",
      accounts: [process.env.NEONEVM_PRIVATE_KEY],
      chainId: 245022934
    },
    // polygonAmoy
    polygonAmoy: {
      url: process.env.ETHEREUM_HOLESKY_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    holesky: {
      url: process.env.ETHEREUM_HOLESKY_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  }
};