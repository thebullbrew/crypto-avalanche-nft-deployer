import type { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";

dotenv.config();

// Single-chain config: Avalanche C-Chain (chain id 43114).
// RPC_URL / PRIVATE_KEY are only needed for deploys — `npx hardhat compile` works without them.
const rawKey = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: { optimizer: { enabled: true, runs: 200 }, evmVersion: "cancun" },
  },
  networks: {
    avalanche: {
      url: process.env.RPC_URL ?? "http://127.0.0.1:8545",
      chainId: 43114,
      accounts:
        rawKey !== undefined && rawKey !== ""
          ? [rawKey.startsWith("0x") ? rawKey : `0x${rawKey}`]
          : [],
    },
  },
};

export default config;
