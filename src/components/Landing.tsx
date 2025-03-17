"use client";

import React, { useEffect } from "react";
import Navbar from "./NavBar";
import Hero from "./Hero";
import AgentGrid from "./AgentGrid";
import MarketStats from "./MarketStats";
import BrutalButton from "./BrutalButon";
import { Bot, Mic, ArrowRight, Zap } from "lucide-react";

const Landing = () => {
  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.classList.add("animate-slide-up");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-brutal-white">
      <Navbar />

      <main id="main-content" className="flex-grow">
        <Hero />

        <MarketStats />

        <AgentGrid />

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="brutal-border bg-brutal-black text-brutal-white p-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
                  <h2 className="text-3xl md:text-4xl font-display uppercase mb-6">
                    Create Your Own
                    <br />
                    Podcast AI Agent
                  </h2>
                  <p className="text-brutal-white text-lg mb-6">
                    Design unique personality traits, voice characteristics, and
                    topic expertise. List your creation on the marketplace and
                    earn cryptocurrency when others use your agent.
                  </p>
                  <BrutalButton variant="primary" className="text-lg px-8 py-3">
                    <span className="flex items-center">
                      Start Creating <Zap className="ml-2 w-5 h-5" />
                    </span>
                  </BrutalButton>
                </div>
                <div className="md:w-1/3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="brutal-border bg-brutal-red p-4 flex items-center justify-center aspect-square">
                      <Mic className="w-12 h-12 text-brutal-white" />
                    </div>
                    <div className="brutal-border bg-brutal-white p-4 flex items-center justify-center aspect-square">
                      <Bot className="w-12 h-12 text-brutal-black" />
                    </div>
                    <div className="brutal-border bg-brutal-white p-4 flex items-center justify-center aspect-square">
                      <Zap className="w-12 h-12 text-brutal-black" />
                    </div>
                    <div className="brutal-border bg-brutal-red p-4 flex items-center justify-center aspect-square">
                      <ArrowRight className="w-12 h-12 text-brutal-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t-4 border-brutal-black py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="font-display text-2xl uppercase">
                  Podcast<span className="text-brutal-red">AI</span>
                </h2>
                <p className="text-sm mt-2">
                  © {new Date().getFullYear()} PodcastAI Injective
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold uppercase mb-3">Platform</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="hover:text-brutal-red">
                        Market
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-brutal-red">
                        Create
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-brutal-red">
                        Connect Wallet
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold uppercase mb-3">Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="hover:text-brutal-red">
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-brutal-red">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-brutal-red">
                        Support
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Landing;
