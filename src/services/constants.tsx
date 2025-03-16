import { Network } from "@injectivelabs/networks";
import { ChainId, EthereumChainId } from "@injectivelabs/ts-types";

export const isProduction = process.env.NODE_ENV === "production";

export const IS_DEVELOPMENT: boolean = process.env.NODE_ENV === "development";
export const IS_PRODUCTION: boolean = process.env.NODE_ENV === "production";

const env = {
  NEXT_ALCHEMY_GOERLI_KEY: process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_KEY,
  NEXT_NETWORK: process.env.NEXT_NETWORK,
  NEXT_ETHEREUM_CHAIN_ID: 11155111,
  NEXT_CHAIN_ID: process.env.NEXT_CHAIN_ID,
};

// export const ALCHEMY_GOERLI_KEY = env.NEXT_ALCHEMY_GOERLI_KEY;

export const alchemyRpcEndpoint = `https://ethereum-sepolia-rpc.publicnode.com`;
export const alchemyWsRpcEndpoint = `wss://ethereum-sepolia-rpc.publicnode.com`;

export const ETHEREUM_CHAIN_ID = 11155111;
export const CHAIN_ID = (env.NEXT_CHAIN_ID || ChainId.Testnet) as ChainId;

export const NETWORK: Network =
  (env.NEXT_NETWORK as Network) || Network.Testnet;

export const IS_TESTNET: Boolean = [
  Network.Testnet,
  Network.TestnetK8s,
].includes(NETWORK);

export const COUNTER_CONTRACT_ADDRESS =
  "inj1t8rhq5vcxqgw68ldg0k2mjxjvzshuah6tnugvy";
