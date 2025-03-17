"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar";
import BrutalButton from "../../components/BrutalButon";
import AgentCard from "../../components/AgentCard";
import { Bot, ListX, ShoppingBag } from "lucide-react";
import { useWalletStore } from "@/context/WalletContextProvider";
import { nft, nftDisplay } from "@/types/nft";
import { useNftStore } from "@/context/NftContextProvider";
import { getContents } from "@/utils/pinata";

const Agents = () => {
  const [filter, setFilter] = useState("all");
  const [myNfts, setMyNfts] = useState<nftDisplay[]>([]);
  const { ownerNfts, isLoading, listNft, unlistNft } = useNftStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userAgents = ownerNfts;
        const resultArray: nftDisplay[] = [];
        console.log("Total agents for this user", userAgents.length);

        for (let i = 0; i < userAgents.length; i++) {
          try {
            // console.log("Fetch metadata: ", userAgents[i].token_uri);
            const pinned = await getContents(userAgents[i].token_uri);
            const dt = pinned?.data as any;
            // console.log(dt);
            const nftD: nftDisplay = {
              token_id: userAgents[i].token_id,
              name: dt.name,
              personality: dt.personality,
              owner: userAgents[i].owner,
              creator: userAgents[i].creator,
              gender: dt.gender,
              language: dt.language,
              tags: dt.tags,
              imageHash: dt.imageIpfsHash,
              price: userAgents[i].price,
              is_listed: userAgents[i].is_listed,
            };
            resultArray.push(nftD);
          } catch (e) {
            // ignore this
          }
        }

        setMyNfts(resultArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData().catch(console.log);
  }, [ownerNfts]);

  // Sample owned agent data
  // const ownedAgents = [
  //   {
  //     id: "1",
  //     name: "CryptoTalkAI",
  //     price: 2.45,
  //     topics: ["CRYPTO", "TECH", "NEWS"],
  //     personality:
  //       "Expert in blockchain technology with sarcastic personality.",
  //     voice: "Male, American",
  //     language: "English",
  //     createdBy: "0x8723...45fc",
  //     status: "listed",
  //   },
  //   {
  //     id: "7",
  //     name: "HealthExpert",
  //     price: 0,
  //     topics: ["HEALTH", "FITNESS", "NUTRITION"],
  //     personality:
  //       "Knowledgeable about health topics with a supportive approach.",
  //     voice: "Female, American",
  //     language: "English",
  //     createdBy: "0x8723...45fc", // user's address
  //     status: "unlisted",
  //   },
  //   {
  //     id: "8",
  //     name: "TravelGuide",
  //     price: 0,
  //     topics: ["TRAVEL", "CULTURE", "ADVENTURE"],
  //     personality:
  //       "Passionate traveler with insights on destinations worldwide.",
  //     voice: "Male, British",
  //     language: "English, Spanish",
  //     createdBy: "0x8723...45fc", // user's address
  //     status: "unlisted",
  //   },
  // ];

  // Filter agents based on selected filter
  const filteredAgents =
    filter === "all"
      ? myNfts
      : filter === "listed"
      ? myNfts.filter((agent) => agent.is_listed === true)
      : myNfts.filter((agent) => agent.is_listed === false);

  const { injectiveAddress } = useWalletStore();

  const convertPrice = (price: string | null): number => {
    if (price === null) return 0;
    // 10^18 since INJ has 18 decimals
    const result = Number(price) / Math.pow(10, 18);
    return result;
  };

  return (
    <div className="min-h-screen flex flex-col bg-brutal-white">
      <Navbar />

      {!injectiveAddress ? (
        <p className="mt-8 ml-8">
          Please connect your Injective wallet using MetaMask provider to start
          using this application.
        </p>
      ) : (
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <div className="brutal-border bg-brutal-black text-brutal-white p-6 mb-8">
              <h1 className="text-3xl md:text-4xl font-display uppercase">
                My AI Agents
              </h1>
              <p className="mt-2">
                Manage your owned and created AI podcast agents
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
              <div className="flex space-x-4">
                <BrutalButton
                  variant={filter === "all" ? "primary" : "outline"}
                  onClick={() => setFilter("all")}
                >
                  <span className="flex items-center">
                    <Bot className="mr-2 w-4 h-4" /> All Agents
                  </span>
                </BrutalButton>
                <BrutalButton
                  variant={filter === "listed" ? "primary" : "outline"}
                  onClick={() => setFilter("listed")}
                >
                  <span className="flex items-center">
                    <ShoppingBag className="mr-2 w-4 h-4" /> Listed
                  </span>
                </BrutalButton>
                <BrutalButton
                  variant={filter === "unlisted" ? "primary" : "outline"}
                  onClick={() => setFilter("unlisted")}
                >
                  <span className="flex items-center">
                    <ListX className="mr-2 w-4 h-4" /> Unlisted
                  </span>
                </BrutalButton>
              </div>

              <BrutalButton
                variant="primary"
                onClick={() => (window.location.href = "/create")}
              >
                <span className="flex items-center">
                  Create New Agent <Bot className="ml-2 w-5 h-5" />
                </span>
              </BrutalButton>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent, index) => (
                <div key={index} className="flex flex-col">
                  <AgentCard
                    id={agent.token_id}
                    name={agent.name}
                    price={convertPrice(agent.price)}
                    topics={agent.tags}
                    personality={agent.personality}
                  />
                  <div className="brutal-border mt-2 p-3 bg-brutal-offwhite">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center">
                        <Bot className="w-4 h-4 mr-1" />
                        <span>{agent.gender + ", " + agent.language}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-center">
                      {agent.is_listed ? (
                        <BrutalButton variant="outline">
                          <span className="flex items-center">
                            <ListX className="mr-1 w-4 h-4" /> Unlist from
                            Market
                          </span>
                        </BrutalButton>
                      ) : (
                        <BrutalButton variant="outline">
                          <span className="flex items-center">
                            <ShoppingBag className="mr-1 w-4 h-4" /> List on
                            Market
                          </span>
                        </BrutalButton>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Agents;
