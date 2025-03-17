"use client";

import React, { useState } from "react";
import { Bot, Mic, User, Zap } from "lucide-react";

interface AgentCardProps {
  name: string;
  price: number;
  image?: string;
  topics: string[];
  personality: string;
  id: string;
}

const AgentCard: React.FC<AgentCardProps> = ({
  name,
  price,
  image,
  topics,
  personality,
  id,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="brutal-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg uppercase">{name}</h3>
        <div className="brutal-border w-10 h-10 rounded-full flex items-center justify-center bg-brutal-black">
          <Bot
            className={`w-5 h-5 text-brutal-white ${
              isHovered ? "animate-brutal-shake" : ""
            }`}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {topics.map((topic, index) => (
          <span key={index} className="brutal-badge text-[10px]">
            {topic}
          </span>
        ))}
      </div>

      <div className="mb-4 text-sm">
        <div className="flex items-start mb-2">
          <User className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
          <p className="line-clamp-2">{personality}</p>
        </div>
      </div>

      <div className="mt-auto flex items-center">
        <div className="flex items-center">
          <Zap className="w-4 h-4 mr-1" />
          <span className="font-bold">{price} INJ</span>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
