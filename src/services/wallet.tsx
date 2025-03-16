import { WalletStrategy } from "@injectivelabs/wallet-strategy";
import { Web3Exception } from "@injectivelabs/exceptions";

import {
  CHAIN_ID,
  ETHEREUM_CHAIN_ID,
  IS_TESTNET,
  alchemyRpcEndpoint,
  alchemyWsRpcEndpoint,
} from "./constants";
import { ChainId, EthereumChainId } from "@injectivelabs/ts-types";
import { Wallet, WalletStrategyArguments } from "@injectivelabs/wallet-base";
import { BaseWalletStrategy, MsgBroadcaster } from "@injectivelabs/wallet-core";
import { EvmWalletStrategy } from "@injectivelabs/wallet-evm";

const strategyArgs: WalletStrategyArguments = {
  chainId: ChainId.Testnet,
  wallet: Wallet.Metamask,
  strategies: {
    [Wallet.Metamask]: new EvmWalletStrategy({
      chainId: ChainId.Testnet,
      ethereumOptions: {
        ethereumChainId: EthereumChainId.Sepolia,
        rpcUrl: "https://ethereum-sepolia-rpc.publicnode.com",
      },
      wallet: Wallet.Metamask,
    }),
  },
};
export const walletStrategy = new BaseWalletStrategy(strategyArgs);

// export const walletStrategy = new WalletStrategy({
//   chainId: CHAIN_ID,
//   ethereumOptions: {
//     ethereumChainId: 11155111,
//     rpcUrl: "https://ethereum-sepolia-rpc.publicnode.com",
//   },
// });

export const getAddresses = async (): Promise<string[]> => {
  // walletStrategy.setWallet(Wallet.Keplr);
  // if (!(window as any).keplr) {
  //   throw new Error("Keplr extension is not installed");
  // }
  // await (window as any).keplr.enable(ChainId.Testnet);
  const addresses = await walletStrategy.getAddresses();

  if (addresses.length === 0) {
    throw new Web3Exception(
      new Error("There are no addresses linked in this wallet.")
    );
  }

  return addresses;
};
