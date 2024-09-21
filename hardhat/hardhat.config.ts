import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";

dotenv.config();

// Console logs to check if environment variables are loaded correctly
// console.log("HEDERA_TESTNET_ENDPOINT:", process.env.HEDERA_TESTNET_ENDPOINT);
// console.log("TESTNET_OPERATOR_PRIVATE_KEY:", process.env.TESTNET_OPERATOR_PRIVATE_KEY);
// console.log("MORPH_TESTNET_URL:", process.env.MORPH_TESTNET_URL);
// console.log("MORPH_TESTNET_PRIVATE_KEY:", process.env.MORPH_TESTNET_PRIVATE_KEY);

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hederaTestnet: {
      url: process.env.HEDERA_TESTNET_ENDPOINT || "https://default-hedera-testnet-url.com",
      accounts: process.env.TESTNET_OPERATOR_PRIVATE_KEY
        ? [process.env.TESTNET_OPERATOR_PRIVATE_KEY]
        : [],
    },
    morphTestnet: {
      url: process.env.MORPH_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [process.env.PRIVATE_KEY]
          : [],
    },
    lineaTestnet: {
      url: process.env.LINEA_TESTNET_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    oasisTestnet: {
      url: process.env.OASIS_TESTNET_URL || "https://testnet.emerald.oasis.dev",
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [],
    },
    polygonAmoy: {
      url: process.env.POLYGON_AMOY_TESTNET_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

export default config;