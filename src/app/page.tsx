"use client";

import { useNftStore } from "@/context/NftContextProvider";
import { nft } from "@/types/nft";
import React, { useEffect, useState } from "react";

type Props = {};

function Home({}: Props) {
  const [myNfts, setMyNfts] = useState<nft[]>([]);
  const [allNfts, setAllNfts] = useState<nft[]>([]);
  const {
    ownerNfts,
    allListedNfts,
    isLoading,
    buyNft,
    listNft,
    unlistNft,
    mintNft,
  } = useNftStore();

  useEffect(() => {
    setMyNfts(ownerNfts);
  }, [ownerNfts]);

  useEffect(() => {
    setAllNfts(allListedNfts);
  }, [allListedNfts]);

  function handleBuy() {
    buyNft("0", "10000000000000000"); // 0.01 INJ in base units
  }

  function handleList() {
    listNft("1");
  }

  function handleUnlist() {
    unlistNft("1");
  }

  function handleMint() {
    mintNft("uri", "10000000000000000"); // 0.01 INJ in base units
  }

  return (
    <div className="flex justify-center pt-20">
      <div className="bg-white rounded-lg p-5 text-center">
        <div>
          <h1>My Total NFTs</h1>
          <p>{isLoading ? "loading..." : myNfts.length}</p>
        </div>
        <div>
          <h1>All Listed NFTs</h1>
          <p>{isLoading ? "loading..." : allNfts.length}</p>
        </div>
        <div>
          <button
            onClick={handleBuy}
            className="btn w-full bg-blue-600 text-white px-4 py-3"
            disabled={isLoading}
          >
            Buy NFT
          </button>
          <button
            onClick={handleList}
            className="mt-6 btn w-full bg-blue-600 text-white px-4 py-3"
            disabled={isLoading}
          >
            List NFT
          </button>
          <button
            onClick={handleUnlist}
            className="mt-6 btn w-full bg-blue-600 text-white px-4 py-3"
            disabled={isLoading}
          >
            Unlist NFT
          </button>
          <button
            onClick={handleMint}
            className="mt-6 btn w-full bg-blue-600 text-white px-4 py-3"
            disabled={isLoading}
          >
            Mint NFT
          </button>
          <div className="py-2 flex flex-col gap-y-4">
            {myNfts &&
              myNfts.map((n, i) => (
                <div key={n.token_id + i}>
                  <p>ID: {n.token_id}</p>
                  <p>Owner: {n.owner}</p>
                  <p>Creator: {n.creator}</p>
                  <p>URI: {n.token_uri}</p>
                  <p>Price: {n.price ? n.price : "Not set"}</p>
                  <p>Listed: {n.is_listed ? "YES" : "NO"}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
