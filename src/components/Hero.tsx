"use client";

import React, { useState, useEffect } from "react";
import BrutalButton from "./BrutalButon";
import { Mic, Bot, Zap } from "lucide-react";

const Hero: React.FC = () => {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden grid-pattern">
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-brutal-red rounded-full opacity-10 animate-brutal-rotate" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 md:pr-12 mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <span className="brutal-badge">NEW</span>
              <span className="brutal-badge-alt">CRYPTO + AI + PODCASTS</span>
            </div>

            <h1
              className={`title-brutal mb-6 ${
                glitchActive ? "animate-glitch" : ""
              }`}
            >
              BUY & SELL <br />
              PODCAST AI <br />
              <span className="text-brutal-red">AGENTS</span>
            </h1>

            <p className="text-xl mb-8 max-w-2xl brutal-border bg-brutal-offwhite p-4">
              Create, explore and trade podcast AI agents with unique
              personalities, expertise and voices. Powered by Injective network.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <BrutalButton variant="primary" className="text-lg px-8 py-3">
                Explore Market
              </BrutalButton>
              <BrutalButton variant="outline" className="text-lg px-8 py-3">
                Create Agent
              </BrutalButton>
            </div>
          </div>

          <div className="md:w-1/3 relative">
            <div className="brutal-border h-full bg-brutal-black p-6 flex flex-col items-center justify-center">
              <div className="brutal-border w-24 h-24 rounded-full flex items-center justify-center bg-brutal-red mb-6">
                <Bot className="w-12 h-12 text-brutal-white" />
              </div>
              <div className="bg-brutal-white brutal-border p-4 mb-4 w-full">
                <h3 className="font-bold uppercase mb-2 flex items-center">
                  <Mic className="w-4 h-4 mr-2" />
                  EXAMPLEAI
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="brutal-badge">CRYPTO</span>
                  <span className="brutal-badge">TECH</span>
                  <span className="brutal-badge">NEWS</span>
                </div>
                <p className="text-sm">
                  Expert in blockchain technology and cryptocurrency markets
                  with sarcastic personality.
                </p>
              </div>
              <div className="bg-brutal-red text-brutal-white brutal-border p-2 w-full text-center">
                <div className="text-xs uppercase font-bold mb-1">
                  Current price
                </div>
                <div className="text-2xl font-bold flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" /> 2.45 INJ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
