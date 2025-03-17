"use client";

import { getAddresses } from "@/services/wallet";
import { getInjectiveAddress } from "@injectivelabs/sdk-ts";
// import { ChainId } from "@injectivelabs/ts-types";
import React, { createContext, useContext, useEffect, useState } from "react";

type StoreState = {
  injectiveAddress: string;
  ethereumAddress: string;
  connectWallet: () => void;
  disconnectWallet: () => void;
};

const WalletContext = createContext<StoreState>({
  ethereumAddress: "",
  injectiveAddress: "",
  connectWallet: () => {},
  disconnectWallet: () => {},
});

export const useWalletStore = () => useContext(WalletContext);

type Props = {
  children?: React.ReactNode;
};

const WalletContextProvider = (props: Props) => {
  const [ethereumAddress, setEthereumAddress] = useState("");
  const [injectiveAddress, setInjectiveAddress] = useState("");

  useEffect(() => {
    connectWallet();
  }, []);

  async function connectWallet() {
    console.log("connect");
    const [address] = await getAddresses();
    console.log("ETH", address);
    console.log("INJ", getInjectiveAddress(address));
    setEthereumAddress(address);
    setInjectiveAddress(getInjectiveAddress(address));
  }

  function disconnectWallet() {
    console.log("disconnect");
    setEthereumAddress("");
    setInjectiveAddress("");
  }

  return (
    <WalletContext.Provider
      value={{
        ethereumAddress,
        injectiveAddress,
        connectWallet,
        disconnectWallet,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;
