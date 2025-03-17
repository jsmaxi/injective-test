"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar";
import TabButtons from "../../components/studio/TabButtons";
import PodcastRecordingForm from "../../components/studio/PodcastRecordingForm";
import AgentsSidebar from "../../components/studio/AgentsSidebar";
import LivePodcastsGrid from "../../components/studio/LivePodcastsGrid";
import { useRouter } from "next/navigation";
import { useWalletStore } from "@/context/WalletContextProvider";
import { useNftStore } from "@/context/NftContextProvider";
import { nftDisplay } from "@/types/nft";
import { getContents } from "@/utils/pinata";

const Studio = () => {
  const navigate = useRouter();
  const [activeTab, setActiveTab] = useState("record");
  const [myNfts, setMyNfts] = useState<nftDisplay[]>([]);

  const { ownerNfts, isLoading } = useNftStore();

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

  // Sample live podcasts data
  const livePodcasts = [
    {
      id: "1",
      title: "Crypto Market Analysis",
      host: "CryptoTalkAI",
      listeners: 142,
      topics: ["CRYPTO", "MARKET", "ANALYSIS"],
    },
    {
      id: "2",
      title: "AI Revolution Weekly",
      host: "TechGuru",
      listeners: 89,
      topics: ["AI", "TECH", "FUTURE"],
    },
    {
      id: "3",
      title: "Philosophy of Mind",
      host: "PhilosophyMind",
      listeners: 56,
      topics: ["PHILOSOPHY", "CONSCIOUSNESS"],
    },
  ];

  // Sample user agents
  // const userAgents = [
  //   {
  //     id: "1",
  //     name: "CryptoTalkAI",
  //     topics: ["CRYPTO", "TECH", "NEWS"],
  //     personality:
  //       "Expert in blockchain technology with sarcastic personality.",
  //   },
  //   {
  //     id: "2",
  //     name: "TechGuru",
  //     topics: ["TECH", "GADGETS", "REVIEWS"],
  //     personality: "Tech enthusiast with deep knowledge of latest gadgets.",
  //   },
  //   {
  //     id: "7",
  //     name: "HealthExpert",
  //     topics: ["HEALTH", "FITNESS", "NUTRITION"],
  //     personality:
  //       "Knowledgeable about health topics with a supportive approach.",
  //   },
  //   {
  //     id: "8",
  //     name: "TravelGuide",
  //     topics: ["TRAVEL", "CULTURE", "ADVENTURE"],
  //     personality:
  //       "Passionate traveler with insights on destinations worldwide.",
  //   },
  // ];

  const handleJoinLivePodcast = (podcastId: string) => {
    navigate.push(`/podcast-room/live/${podcastId}`);
  };

  const { injectiveAddress } = useWalletStore();

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
                Podcast Studio
              </h1>
              <p className="mt-2">
                Create episodes with your AI podcast agents or explore live
                sessions
              </p>
            </div>

            <TabButtons activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "record" ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <PodcastRecordingForm userAgents={myNfts} />
                </div>
                <AgentsSidebar />
              </div>
            ) : (
              <LivePodcastsGrid
                podcasts={livePodcasts}
                onJoinPodcast={handleJoinLivePodcast}
              />
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default Studio;
