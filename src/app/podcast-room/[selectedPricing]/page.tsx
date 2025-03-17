"use client";

import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import {
  Mic,
  MicOff,
  MessageSquare,
  Users,
  Coins,
  ArrowLeft,
} from "lucide-react";
import BrutalButton from "../../../components/BrutalButon";
// import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useWalletStore } from "@/context/WalletContextProvider";

const PodcastRoom = () => {
  const { podcastId, type } = useParams();
  const navigate = useRouter();
  const [isLive, setIsLive] = useState(type === "live");
  const [listeners, setListeners] = useState(
    isLive ? Math.floor(Math.random() * 100) + 20 : 1
  );
  const [isMuted, setIsMuted] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "CryptoFan", message: "Great discussion today!" },
    {
      id: 2,
      user: "AIEnthusiast",
      message: "Can you talk about the latest developments in AI?",
    },
    {
      id: 3,
      user: "BlockchainGuru",
      message: "What do you think about the new Injetive update?",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Mock podcast data
  const podcastData = {
    title: isLive ? "AI Revolution Weekly" : "My Custom Podcast",
    description: isLive
      ? "Discussion about the latest AI trends"
      : "A generated podcast with custom AI agents",
    host: { name: "TechGuru", avatar: null },
    guests: [
      { name: "AIExpert", avatar: null },
      { name: "InjDev", avatar: null },
    ],
  };

  useEffect(() => {
    // Simulate increasing listeners over time
    if (isLive) {
      const intervalId = setInterval(() => {
        setListeners((prev) => prev + 1);
      }, 10000);

      return () => clearInterval(intervalId);
    }
  }, [isLive]);

  // Simulated podcast audio control
  const toggleMute = () => {
    setIsMuted(!isMuted);
    //toast(isMuted ? "Audio unmuted" : "Audio muted");
  };

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { id: chatMessages.length + 1, user: "You", message: newMessage },
      ]);
      setNewMessage("");
    }
  };

  const handleTip = () => {
    //toast.success("Tip of 0.01 INJ sent to creator!");
  };

  const { injectiveAddress } = useWalletStore();

  return (
    <div className="min-h-screen flex flex-col bg-brutal-white">
      <header className="sticky top-0 z-50 bg-brutal-black text-brutal-white border-b-4 border-brutal-red p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate.push("/studio")}
              className="brutal-border bg-brutal-white p-2 text-brutal-black mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-display">{podcastData.title}</h1>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{listeners}</span>
            </div>
            <button
              onClick={toggleMute}
              className="brutal-border bg-brutal-white p-2 text-brutal-black"
            >
              {isMuted ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {!injectiveAddress ? (
        <p className="mt-8 ml-8">
          Please connect your Injective wallet using MetaMask provider to start
          using this application.
        </p>
      ) : (
        <main className="flex-grow flex flex-col md:flex-row">
          {/* Podcast visualization */}
          <div className="md:w-2/3 p-6">
            <div className="brutal-border h-full flex flex-col">
              <div className="bg-brutal-black text-brutal-white p-4">
                <h2 className="font-bold uppercase">
                  {podcastData.description}
                </h2>
              </div>

              <div className="flex-grow p-6 bg-brutal-offwhite">
                <div className="brutal-border bg-brutal-white p-4 mb-6">
                  <h3 className="font-bold uppercase mb-4">
                    Currently Speaking:
                  </h3>
                  <div className="flex items-center">
                    <div className="brutal-border w-16 h-16 flex items-center justify-center bg-brutal-red">
                      <Mic className="w-8 h-8 text-brutal-white" />
                    </div>
                    <div className="ml-4">
                      <div className="font-bold text-lg">
                        {podcastData.host.name}
                      </div>
                      <div className="text-sm">Host</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Round table visualization */}
                  <div className="brutal-border bg-brutal-white p-4 flex flex-col items-center justify-center col-span-3 aspect-video">
                    <div className="w-40 h-40 rounded-full brutal-border bg-brutal-black flex items-center justify-center">
                      <div className="text-brutal-white">Round Table</div>
                    </div>

                    <div className="grid grid-cols-3 gap-8 mt-8">
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 brutal-border bg-brutal-red flex items-center justify-center">
                          <div className="text-brutal-white text-xs">
                            {podcastData.host.name}
                          </div>
                        </div>
                        <div className="mt-2 text-xs font-bold">Host</div>
                      </div>

                      {podcastData.guests.map((guest, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="w-20 h-20 brutal-border bg-brutal-black flex items-center justify-center">
                            <div className="text-brutal-white text-xs">
                              {guest.name}
                            </div>
                          </div>
                          <div className="mt-2 text-xs font-bold">
                            Guest {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {isLive && (
                  <div className="flex justify-center">
                    <BrutalButton onClick={handleTip} variant="primary">
                      <span className="flex items-center">
                        <Coins className="w-4 h-4 mr-2" /> Tip Creator 0.01 INJ
                      </span>
                    </BrutalButton>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="md:w-1/3 border-l-4 border-brutal-black">
            <div className="h-full flex flex-col">
              <div className="bg-brutal-black text-brutal-white p-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                <h2 className="font-bold uppercase">Live Chat</h2>
              </div>

              <div className="flex-grow p-4 bg-brutal-white overflow-y-auto">
                <div className="space-y-3">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="brutal-border p-2 bg-brutal-offwhite"
                    >
                      <span className="font-bold">{msg.user}: </span>
                      <span>{msg.message}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t-4 border-brutal-black">
                <form onSubmit={handleSendMessage} className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="brutal-border flex-grow p-2 bg-brutal-offwhite"
                    placeholder="Type your message..."
                  />
                  <button
                    type="submit"
                    className="brutal-border bg-brutal-black text-brutal-white p-2 ml-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default PodcastRoom;
