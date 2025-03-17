import React from "react";
import { Mic, Radio } from "lucide-react";

interface TabButtonsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabButtons: React.FC<TabButtonsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex flex-col md:flex-row mb-8">
      <button
        className={`brutal-border p-4 font-bold uppercase flex-1 ${
          activeTab === "record"
            ? "bg-brutal-red text-brutal-white"
            : "bg-brutal-white"
        }`}
        onClick={() => onTabChange("record")}
      >
        <Mic className="w-5 h-5 inline-block mr-2" />
        Record Episodes
      </button>
      <button
        className={`brutal-border p-4 font-bold uppercase flex-1 ${
          activeTab === "live"
            ? "bg-brutal-red text-brutal-white"
            : "bg-brutal-white"
        }`}
        onClick={() => onTabChange("live")}
      >
        <Radio className="w-5 h-5 inline-block mr-2" />
        Live Podcasts
      </button>
    </div>
  );
};

export default TabButtons;
