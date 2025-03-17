"use client";

import { NFT_CONTRACT_ADDRESS } from "@/services/constants";
import { chainGrpcWasmApi, msgBroadcastClient } from "@/services/services";
import { getAddresses } from "@/services/wallet";
import {
  MsgExecuteContractCompat,
  fromBase64,
  getInjectiveAddress,
  toBase64,
} from "@injectivelabs/sdk-ts";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useWalletStore } from "./WalletContextProvider";
import { nft } from "@/types/nft";

enum Status {
  Idle = "idle",
  Loading = "loading",
}

type StoreState = {
  allListedNfts: nft[];
  ownerNfts: nft[];
  isLoading: boolean;
  //   incrementCount: () => void;
  //   setContractCounter: (number: string) => void;
};

const NftContext = createContext<StoreState>({
  allListedNfts: [],
  ownerNfts: [],
  isLoading: true,
  //   incrementCount: () => {},
  //   setContractCounter: (number) => {},
});

export const useNftStore = () => useContext(NftContext);

type Props = {
  children?: React.ReactNode;
};

const NftContextProvider = (props: Props) => {
  const [allListedNfts, setAllListedNfts] = useState<nft[]>([]);
  const [ownerNfts, setOwnerNfts] = useState<nft[]>([]);
  const [status, setStatus] = useState<Status>(Status.Idle);
  const isLoading = status == Status.Loading;
  const { injectiveAddress } = useWalletStore();

  useEffect(() => {
    if (injectiveAddress) {
      fetchOwnerNfts();
      fetchAllListedNfts();
    }
  }, [injectiveAddress]);

  async function fetchOwnerNfts() {
    try {
      const response = (await chainGrpcWasmApi.fetchSmartContractState(
        NFT_CONTRACT_ADDRESS,
        toBase64({
          get_owner_nfts: {
            owner: "inj15tcqqeafzl2kascdsl5n5y4sg67h6thclpn60l",
          },
        })
      )) as unknown as { data: string };

      const n = fromBase64(response.data);

      console.log("owner nfts", n.nfts);

      setOwnerNfts(n.nfts);
    } catch (e) {
      console.log((e as any).message);
      alert((e as any).message);
    }
  }

  async function fetchAllListedNfts() {
    try {
      const response = (await chainGrpcWasmApi.fetchSmartContractState(
        NFT_CONTRACT_ADDRESS,
        toBase64({
          get_listed_nfts: {},
        })
      )) as unknown as { data: string };

      const n = fromBase64(response.data);

      console.log("all listed nfts", n.nfts);

      setAllListedNfts(n.nfts);
    } catch (e) {
      console.log((e as any).message);
      alert((e as any).message);
    }
  }

  //   async function incrementCount() {
  //     if (!injectiveAddress) {
  //       alert("No Wallet Connected");
  //       return;
  //     }

  //     setStatus(Status.Loading);

  //     try {
  //       console.log(
  //         injectiveAddress,
  //         getInjectiveAddress(injectiveAddress),
  //         COUNTER_CONTRACT_ADDRESS
  //       );
  //       console.log("starting");

  //       const msg = MsgExecuteContractCompat.fromJSON({
  //         contractAddress: COUNTER_CONTRACT_ADDRESS,
  //         sender: getInjectiveAddress(injectiveAddress),
  //         msg: {
  //           increment: {},
  //         },
  //       });

  //       console.log("broadcasting");

  //       await msgBroadcastClient.broadcast({
  //         msgs: msg,
  //         injectiveAddress: getInjectiveAddress(injectiveAddress),
  //       });

  //       console.log("fetching");

  //       fetchCount();
  //     } catch (e) {
  //       alert((e as any).message);
  //     } finally {
  //       setStatus(Status.Idle);
  //     }
  //   }

  //   async function setContractCounter(number: string) {
  //     if (!injectiveAddress) {
  //       alert("No Wallet Connected");
  //       return;
  //     }

  //     if (Number(number) > 100 || Number(number) < -100) {
  //       alert("Number must we within -100 and 100");
  //       return;
  //     }

  //     setStatus(Status.Loading);

  //     try {
  //       console.log(
  //         injectiveAddress,
  //         getInjectiveAddress(injectiveAddress),
  //         COUNTER_CONTRACT_ADDRESS
  //       );
  //       const msg = MsgExecuteContractCompat.fromJSON({
  //         contractAddress: COUNTER_CONTRACT_ADDRESS,
  //         sender: getInjectiveAddress(injectiveAddress),
  //         msg: {
  //           reset: {
  //             count: parseInt(number, 10),
  //           },
  //         },
  //       });

  //       await msgBroadcastClient.broadcast({
  //         msgs: msg,
  //         injectiveAddress: getInjectiveAddress(injectiveAddress),
  //       });

  //       fetchCount();
  //     } catch (e) {
  //       alert((e as any).message);
  //     } finally {
  //       setStatus(Status.Idle);
  //     }
  //   }

  return (
    <NftContext.Provider
      value={{
        allListedNfts,
        ownerNfts,
        isLoading,
        // incrementCount,
        // setContractCounter,
      }}
    >
      {props.children}
    </NftContext.Provider>
  );
};

export default NftContextProvider;
