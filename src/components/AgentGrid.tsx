import React from "react";
import AgentCard from "./AgentCard";

// Sample data for agents
const agents = [
  {
    id: "1",
    name: "CryptoTalkAI",
    price: 2.45,
    topics: ["CRYPTO", "TECH", "NEWS"],
    personality: "Expert in blockchain technology with sarcastic personality.",
  },
  {
    id: "2",
    name: "TechGuru",
    price: 1.85,
    topics: ["TECH", "GADGETS", "REVIEWS"],
    personality:
      "Tech enthusiast with deep knowledge of latest gadgets and passionate opinions.",
  },
  {
    id: "3",
    name: "PhilosophyMind",
    price: 3.2,
    topics: ["PHILOSOPHY", "HISTORY", "DEBATE"],
    personality:
      "Thoughtful and contemplative with a knack for exploring complex ideas.",
  },
  {
    id: "4",
    name: "SportsCaster",
    price: 1.5,
    topics: ["SPORTS", "ANALYSIS", "NEWS"],
    personality:
      "Energetic and passionate about all major sports with detailed statistical knowledge.",
  },
  {
    id: "5",
    name: "MusicMaestro",
    price: 2.1,
    topics: ["MUSIC", "CULTURE", "HISTORY"],
    personality:
      "Deeply passionate about music theory and history across all genres.",
  },
  {
    id: "6",
    name: "CinemaFanatic",
    price: 1.9,
    topics: ["MOVIES", "REVIEWS", "INTERVIEWS"],
    personality:
      "Film buff with encyclopedic knowledge of cinema and critical perspective.",
  },
];

const AgentGrid: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="brutal-border bg-brutal-black text-brutal-white p-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-display uppercase">
            Top AI Podcast Agents
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              id={agent.id}
              name={agent.name}
              price={agent.price}
              topics={agent.topics}
              personality={agent.personality}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentGrid;
