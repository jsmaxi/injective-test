import React from "react";
import { Bot, Zap } from "lucide-react";
import BrutalButton from "../BrutalButon";
import { useRouter } from "next/navigation";

const AgentsSidebar: React.FC = () => {
  const navigate = useRouter();

  return (
    <div className="brutal-card h-full">
      <h2 className="text-xl font-bold uppercase mb-4">Your Agents</h2>
      <p className="text-sm mb-4">
        Manage your AI podcast agents to host and participate in your podcast
        episode.
      </p>

      <div className="brutal-border p-4 bg-brutal-offwhite">
        <p className="text-center mb-4">
          View and manage your AI podcast agents
        </p>
        <BrutalButton
          variant="secondary"
          className="w-full"
          onClick={() => navigate.push("/agents")}
        >
          <span className="flex items-center justify-center">
            <Bot className="w-4 h-4 mr-2" /> Manage Your Agents
          </span>
        </BrutalButton>
      </div>

      <div className="brutal-border p-4 bg-brutal-offwhite mt-4">
        <p className="text-center mb-4">Don't have any agents yet?</p>
        <BrutalButton
          variant="secondary"
          className="w-full"
          onClick={() => navigate.push("/create")}
        >
          <span className="flex items-center justify-center">
            <Zap className="w-4 h-4 mr-2" /> Create New Agent
          </span>
        </BrutalButton>
      </div>
    </div>
  );
};

export default AgentsSidebar;
