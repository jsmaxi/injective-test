"use client";

import React, { useState } from "react";
import Navbar from "../../components/NavBar";
import BrutalButton from "../../components/BrutalButon";
import AgentCard from "../../components/AgentCard";
import { Bot, ListX, ShoppingBag } from "lucide-react";

const Agents = () => {
  const [filter, setFilter] = useState("all");

  // Sample owned agent data
  const ownedAgents = [
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
      status: "listed",
    },
    {
      id: "7",
      name: "HealthExpert",
      price: 0,
      topics: ["HEALTH", "FITNESS", "NUTRITION"],
      personality:
        "Knowledgeable about health topics with a supportive approach.",
      voice: "Female, American",
      language: "English",
      createdBy: "0x8723...45fc", // user's address
      status: "unlisted",
    },
    {
      id: "8",
      name: "TravelGuide",
      price: 0,
      topics: ["TRAVEL", "CULTURE", "ADVENTURE"],
      personality:
        "Passionate traveler with insights on destinations worldwide.",
      voice: "Male, British",
      language: "English, Spanish",
      createdBy: "0x8723...45fc", // user's address
      status: "unlisted",
    },
  ];

  // Filter agents based on selected filter
  const filteredAgents =
    filter === "all"
      ? ownedAgents
      : filter === "listed"
      ? ownedAgents.filter((agent) => agent.status === "listed")
      : ownedAgents.filter((agent) => agent.status === "unlisted");

  return (
    <div className="min-h-screen flex flex-col bg-brutal-white">
      <Navbar />

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
            {filteredAgents.map((agent) => (
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
                  </div>
                  <div className="mt-2 flex justify-center">
                    {agent.status === "listed" ? (
                      <BrutalButton variant="outline">
                        <span className="flex items-center">
                          <ListX className="mr-1 w-4 h-4" /> Unlist from Market
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
    </div>
  );
};

export default Agents;
