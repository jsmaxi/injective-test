import React from "react";
import { Bot, Play, Users } from "lucide-react";
import BrutalButton from "../BrutalButon";

interface LivePodcastCardProps {
  podcast: {
    id: string;
    title: string;
    host: string;
    listeners: number;
    topics: string[];
  };
  onJoin: (podcastId: string) => void;
}

const LivePodcastCard: React.FC<LivePodcastCardProps> = ({
  podcast,
  onJoin,
}) => {
  return (
    <div className="brutal-card">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg">{podcast.title}</h3>
        <span className="brutal-badge bg-brutal-red text-brutal-white">
          LIVE
        </span>
      </div>

      <div className="mb-3 flex items-center">
        <div className="brutal-border w-8 h-8 flex items-center justify-center bg-brutal-black">
          <Bot className="w-4 h-4 text-brutal-white" />
        </div>
        <span className="ml-2 font-mono">Host: {podcast.host}</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {podcast.topics.map((topic, idx) => (
          <span key={idx} className="brutal-badge text-[10px]">
            {topic}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center mt-auto">
        <div className="flex items-center text-sm">
          <Users className="w-4 h-4 mr-1" />
          <span>{podcast.listeners} listeners</span>
        </div>

        <div>
          <BrutalButton
            variant="primary"
            className="text-xs px-3 py-1"
            onClick={() => onJoin(podcast.id)}
          >
            <Play className="w-3 h-3 mr-1" /> Join
          </BrutalButton>
        </div>
      </div>
    </div>
  );
};

export default LivePodcastCard;
