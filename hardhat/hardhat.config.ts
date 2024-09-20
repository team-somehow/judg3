import "@nomicfoundation/hardhat-toolbox";

import { HardhatUserConfig } from "hardhat/config";

import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hederaTestnet: {
      url: process.env.HEDERA_TESTNET_ENDPOINT,
      accounts: process.env.TESTNET_OPERATOR_PRIVATE_KEY
        ? [process.env.TESTNET_OPERATOR_PRIVATE_KEY]
        : [],
    },
  },
};

export default config;
