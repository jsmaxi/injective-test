"use client";

import { NFT_CONTRACT_ADDRESS } from "@/services/constants";
import { chainGrpcWasmApi, msgBroadcastClient } from "@/services/services";
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
  buyNft: (tokenId: string, price: string) => void;
  listNft: (tokenId: string) => void;
  unlistNft: (tokenId: string) => void;
  mintNft: (tokenUri: string, nftPrice: string) => void;
};

const NftContext = createContext<StoreState>({
  allListedNfts: [],
  ownerNfts: [],
  isLoading: true,
  buyNft: (tokenId: string, price: string) => {},
  listNft: (tokenId: string) => {},
  unlistNft: (tokenId: string) => {},
  mintNft: (tokenUri: string, nftPrice: string) => {},
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
      if (!injectiveAddress) {
        console.log("No Wallet Connected");
        return;
      }

      console.log("Fetching owner's NFTs");

      const response = (await chainGrpcWasmApi.fetchSmartContractState(
        NFT_CONTRACT_ADDRESS,
        toBase64({
          get_owner_nfts: {
            owner: getInjectiveAddress(injectiveAddress),
          },
        })
      )) as unknown as { data: string };

      const n = fromBase64(response.data);

      console.log("Owner nfts", n.nfts);

      setOwnerNfts(n.nfts);
    } catch (e) {
      console.log((e as any).message);
      alert((e as any).message);
    }
  }

  async function fetchAllListedNfts() {
    try {
      console.log("Fetching all listed NFTs");

      const response = (await chainGrpcWasmApi.fetchSmartContractState(
        NFT_CONTRACT_ADDRESS,
        toBase64({
          get_listed_nfts: {},
        })
      )) as unknown as { data: string };

      const n = fromBase64(response.data);

      console.log("All listed nfts", n.nfts);

      setAllListedNfts(n.nfts);
    } catch (e) {
      console.log((e as any).message);
      alert((e as any).message);
    }
  }

  async function buyNft(tokenId: string, price: string) {
    if (!injectiveAddress) {
      alert("No Wallet Connected");
      return;
    }

    if (Number(tokenId) < 0) {
      alert("Token Id must be >= 0");
      return;
    }

    setStatus(Status.Loading);

    try {
      console.log("Buying NFT");

      const msg = MsgExecuteContractCompat.fromJSON({
        contractAddress: NFT_CONTRACT_ADDRESS,
        sender: getInjectiveAddress(injectiveAddress),
        msg: {
          buy: {
            token_id: tokenId,
          },
        },
        funds: [
          {
            denom: "inj",
            amount: price,
          },
        ],
      });

      const response = await msgBroadcastClient.broadcast({
        msgs: msg,
        injectiveAddress: getInjectiveAddress(injectiveAddress),
      });

      console.log("Response tx hash", response?.txHash);

      fetchOwnerNfts();
    } catch (e) {
      console.log((e as any).message);
      alert((e as any).message);
    } finally {
      setStatus(Status.Idle);
    }
  }

  async function listNft(tokenId: string) {
    if (!injectiveAddress) {
      alert("No Wallet Connected");
      return;
    }

    if (Number(tokenId) < 0) {
      alert("Token Id must be >= 0");
      return;
    }

    setStatus(Status.Loading);

    try {
      console.log("Listing NFT");

      const msg = MsgExecuteContractCompat.fromJSON({
        contractAddress: NFT_CONTRACT_ADDRESS,
        sender: getInjectiveAddress(injectiveAddress),
        msg: {
          list: {
            token_id: tokenId,
          },
        },
      });

      const response = await msgBroadcastClient.broadcast({
        msgs: msg,
        injectiveAddress: getInjectiveAddress(injectiveAddress),
      });

      console.log("Response tx hash", response?.txHash);

      fetchAllListedNfts();
      fetchOwnerNfts();
    } catch (e) {
      console.log((e as any).message);
      alert((e as any).message);
    } finally {
      setStatus(Status.Idle);
    }
  }

  async function unlistNft(tokenId: string) {
    if (!injectiveAddress) {
      alert("No Wallet Connected");
      return;
    }

    if (Number(tokenId) < 0) {
      alert("Token Id must be >= 0");
      return;
    }

    setStatus(Status.Loading);

    try {
      console.log("Unlisting NFT");

      const msg = MsgExecuteContractCompat.fromJSON({
        contractAddress: NFT_CONTRACT_ADDRESS,
        sender: getInjectiveAddress(injectiveAddress),
        msg: {
          unlist: {
            token_id: tokenId,
          },
        },
      });

      const response = await msgBroadcastClient.broadcast({
        msgs: msg,
        injectiveAddress: getInjectiveAddress(injectiveAddress),
      });

      console.log("Response tx hash", response?.txHash);

      fetchAllListedNfts();
      fetchOwnerNfts();
    } catch (e) {
      console.log((e as any).message);
      alert((e as any).message);
    } finally {
      setStatus(Status.Idle);
    }
  }

  async function mintNft(tokenUri: string, nftPrice: string) {
    if (!injectiveAddress) {
      alert("No Wallet Connected");
      return;
    }

    setStatus(Status.Loading);

    try {
      console.log("Minting NFT");

      const msg = MsgExecuteContractCompat.fromJSON({
        contractAddress: NFT_CONTRACT_ADDRESS,
        sender: getInjectiveAddress(injectiveAddress),
        msg: {
          mint: {
            token_uri: tokenUri,
            price: nftPrice,
          },
        },
      });

      const response = await msgBroadcastClient.broadcast({
        msgs: msg,
        injectiveAddress: getInjectiveAddress(injectiveAddress),
      });

      console.log("Response tx hash", response?.txHash);

      fetchOwnerNfts();
    } catch (e) {
      console.log((e as any).message);
      alert((e as any).message);
    } finally {
      setStatus(Status.Idle);
    }
  }

  return (
    <NftContext.Provider
      value={{
        allListedNfts,
        ownerNfts,
        isLoading,
        buyNft,
        listNft,
        unlistNft,
        mintNft,
      }}
    >
      {props.children}
    </NftContext.Provider>
  );
};

export default NftContextProvider;
