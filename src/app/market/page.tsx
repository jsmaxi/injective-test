"use client";

import React, { useState } from "react";
import Navbar from "../../components/NavBar";
import AgentCard from "../../components/AgentCard";
import {
  Package,
  Search,
  FilterX,
  ArrowDownAZ,
  Zap,
  Bot,
  Tag,
} from "lucide-react";
import BrutalButton from "../../components/BrutalButon";
import Link from "next/link";
import { useWalletStore } from "@/context/WalletContextProvider";

const Market = () => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Sample extended agent data
  const agents = [
    {
      id: "1",
      name: "CryptoTalkAI",
      price: 2.45,
      topics: ["CRYPTO", "TECH", "NEWS"],
      personality:
        "Expert in blockchain technology with sarcastic personality.",
      voice: "Male, American",
      language: "English",
      createdBy: "0x8723...45fc",
    },
    {
      id: "2",
      name: "TechGuru",
      price: 1.85,
      topics: ["TECH", "GADGETS", "REVIEWS"],
      personality:
        "Tech enthusiast with deep knowledge of latest gadgets and passionate opinions.",
      voice: "Male, British",
      language: "English",
      createdBy: "0x3426...87da",
    },
    {
      id: "3",
      name: "PhilosophyMind",
      price: 3.2,
      topics: ["PHILOSOPHY", "HISTORY", "DEBATE"],
      personality:
        "Thoughtful and contemplative with a knack for exploring complex ideas.",
      voice: "Female, British",
      language: "English, French",
      createdBy: "0x6542...91cb",
    },
    {
      id: "4",
      name: "SportsCaster",
      price: 1.5,
      topics: ["SPORTS", "ANALYSIS", "NEWS"],
      personality:
        "Energetic and passionate about all major sports with detailed statistical knowledge.",
      voice: "Male, American",
      language: "English, Spanish",
      createdBy: "0x9876...32df",
    },
    {
      id: "5",
      name: "MusicMaestro",
      price: 2.1,
      topics: ["MUSIC", "CULTURE", "HISTORY"],
      personality:
        "Deeply passionate about music theory and history across all genres.",
      voice: "Female, Australian",
      language: "English",
      createdBy: "0x2345...78ab",
    },
    {
      id: "6",
      name: "CinemaFanatic",
      price: 1.9,
      topics: ["MOVIES", "REVIEWS", "INTERVIEWS"],
      personality:
        "Film buff with encyclopedic knowledge of cinema and critical perspective.",
      voice: "Male, Irish",
      language: "English, French",
      createdBy: "0x7890...12ef",
    },
  ];

  // Filter agents based on selected filter
  const filteredAgents =
    filter === "all"
      ? agents
      : agents.filter((agent) => agent.topics.includes(filter));

  // Sort agents based on selected sort method
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    // Default: popular (no specific sort)
    return 0;
  });

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
                AI Agent Marketplace
              </h1>
              <p className="mt-2">
                Buy, sell, and trade unique podcast AI agents
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
              <div className="md:w-1/2">
                <div className="flex brutal-border">
                  <div className="bg-brutal-offwhite p-3 flex items-center">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search agents by name, topics, or personality..."
                    className="brutal-border-left p-3 flex-grow bg-brutal-white"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="brutal-border flex">
                  <div className="bg-brutal-black text-brutal-white p-3 whitespace-nowrap font-bold">
                    <FilterX className="w-5 h-5 inline-block mr-1" /> Filter
                  </div>
                  <select
                    className="p-3 flex-grow"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">All Topics</option>
                    <option value="CRYPTO">Cryptocurrency</option>
                    <option value="TECH">Technology</option>
                    <option value="PHILOSOPHY">Philosophy</option>
                    <option value="SPORTS">Sports</option>
                    <option value="MUSIC">Music</option>
                    <option value="MOVIES">Movies</option>
                  </select>
                </div>

                <div className="brutal-border flex">
                  <div className="bg-brutal-black text-brutal-white p-3 whitespace-nowrap font-bold">
                    <ArrowDownAZ className="w-5 h-5 inline-block mr-1" /> Sort
                  </div>
                  <select
                    className="p-3 flex-grow"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popular">Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-8 brutal-border p-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold">List Your Agent</h2>
                  <p className="text-sm">
                    Create and sell your own AI podcast agent on the marketplace
                  </p>
                </div>
                <Link href="/agents">
                  <BrutalButton variant="primary">
                    <span className="flex items-center">
                      Manage My Agents <Zap className="ml-2 w-5 h-5" />
                    </span>
                  </BrutalButton>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedAgents.map((agent) => (
                <div key={agent.id} className="flex flex-col">
                  <AgentCard
                    id={agent.id}
                    name={agent.name}
                    price={agent.price}
                    topics={agent.topics}
                    personality={agent.personality}
                  />
                  <div className="brutal-border mt-2 p-3 bg-brutal-offwhite">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center">
                        <Bot className="w-4 h-4 mr-1" />
                        <span>{agent.voice}</span>
                      </div>
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 mr-1" />
                        <span>
                          By {agent.createdBy.substring(0, 6)}...
                          {agent.createdBy.substring(
                            agent.createdBy.length - 4
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <button className="brutal-border px-2 py-1 text-xs bg-brutal-white">
                        Voice Sample
                      </button>
                      <button className="brutal-border px-2 py-1 text-xs bg-brutal-white">
                        View Details
                      </button>
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

export default Market;
