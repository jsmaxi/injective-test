import React from "react";
import { TrendingUp, Users, Headphones, Zap, Bot } from "lucide-react";

const MarketStats: React.FC = () => {
  return (
    <section className="py-12 bg-brutal-offwhite">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="brutal-card">
            <div className="flex items-center mb-2">
              <div className="brutal-border w-10 h-10 flex items-center justify-center bg-brutal-red">
                <Zap className="w-5 h-5 text-brutal-white" />
              </div>
              <h3 className="font-bold text-lg ml-3 uppercase">Volume</h3>
            </div>
            <p className="text-3xl font-display">152.4 INJ</p>
            <p className="text-sm flex items-center text-green-500 mt-1">
              <TrendingUp className="w-4 h-4 mr-1" /> +24.6% this week
            </p>
          </div>

          <div className="brutal-card">
            <div className="flex items-center mb-2">
              <div className="brutal-border w-10 h-10 flex items-center justify-center bg-brutal-black">
                <Users className="w-5 h-5 text-brutal-white" />
              </div>
              <h3 className="font-bold text-lg ml-3 uppercase">Creators</h3>
            </div>
            <p className="text-3xl font-display">2,156</p>
            <p className="text-sm mt-1">Active agent creators</p>
          </div>

          <div className="brutal-card">
            <div className="flex items-center mb-2">
              <div className="brutal-border w-10 h-10 flex items-center justify-center bg-brutal-red">
                <Bot className="w-5 h-5 text-brutal-white" />
              </div>
              <h3 className="font-bold text-lg ml-3 uppercase">Agents</h3>
            </div>
            <p className="text-3xl font-display">8,942</p>
            <p className="text-sm mt-1">Unique podcast AI agents</p>
          </div>

          <div className="brutal-card">
            <div className="flex items-center mb-2">
              <div className="brutal-border w-10 h-10 flex items-center justify-center bg-brutal-black">
                <Headphones className="w-5 h-5 text-brutal-white" />
              </div>
              <h3 className="font-bold text-lg ml-3 uppercase">Listens</h3>
            </div>
            <p className="text-3xl font-display">3.2M</p>
            <p className="text-sm mt-1">Total podcast hours played</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketStats;
