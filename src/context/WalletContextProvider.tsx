"use client";

import { getAddresses } from "@/services/wallet";
import { getInjectiveAddress } from "@injectivelabs/sdk-ts";
import { ChainId } from "@injectivelabs/ts-types";
import React, { createContext, useContext, useEffect, useState } from "react";

type StoreState = {
  injectiveAddress: string;
  ethereumAddress: string;
  connectWallet: () => void;
};

const WalletContext = createContext<StoreState>({
  ethereumAddress: "",
  injectiveAddress: "",
  connectWallet: () => {},
});

export const useWalletStore = () => useContext(WalletContext);

type Props = {
  children?: React.ReactNode;
};

const WalletContextProvider = (props: Props) => {
  const [ethereumAddress, setEthereumAddress] = useState("");
  const [injectiveAddress, setInjectiveAddress] = useState("");

  async function connectWallet() {
    console.log("click connect");
    // if (!(window as any).keplr) {
    //   throw new Error("Keplr extension is not installed");
    // }
    // await (window as any).keplr.enable(ChainId.Testnet);
    const [address] = await getAddresses();
    console.log(address);
    // setEthereumAddress(address);
    // setInjectiveAddress(getInjectiveAddress(address));
    setInjectiveAddress(address);
  }

  return (
    <WalletContext.Provider
      value={{
        ethereumAddress,
        injectiveAddress,
        connectWallet,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;
