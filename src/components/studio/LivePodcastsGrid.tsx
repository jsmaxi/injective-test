import React from "react";
import LivePodcastCard from "./LivePodcastCard";

interface Podcast {
  id: string;
  title: string;
  host: string;
  listeners: number;
  topics: string[];
}

interface LivePodcastsGridProps {
  podcasts: Podcast[];
  onJoinPodcast: (podcastId: string) => void;
}

const LivePodcastsGrid: React.FC<LivePodcastsGridProps> = ({
  podcasts,
  onJoinPodcast,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {podcasts.map((podcast) => (
        <LivePodcastCard
          key={podcast.id}
          podcast={podcast}
          onJoin={onJoinPodcast}
        />
      ))}
    </div>
  );
};

export default LivePodcastsGrid;
