import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",

  networks: {
    polygonAmoy: {
      chainId: 80002,
      url: "https://rpc-amoy.polygon.technology",
      accounts: [process.env.PRIVATE_KEY as string],
    },
    ethereumSepolia: {
      chainId: 11155111,
      url: `https://rpc2.sepolia.org`,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },

  etherscan: {
    apiKey: {
      polygonAmoy: process.env.POLYGON_API_KEY as string,
    },

    customChains: [
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com",
        },
      },
    ],
  },
};

export default config;
