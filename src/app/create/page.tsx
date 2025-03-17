"use client";

import React, { useState } from "react";
import Navbar from "../../components/NavBar";
import BrutalButton from "../../components/BrutalButon";
import {
  Zap,
  Bot,
  Image,
  FileText,
  Languages,
  Settings,
  Mic,
  Coins,
  ArrowRight,
} from "lucide-react";
import { useWalletStore } from "@/context/WalletContextProvider";
import { toast } from "sonner";

const Create = () => {
  const [step, setStep] = useState(1);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const totalSteps = 4;

  // Sample voices data
  const voices = [
    { id: "1", name: "Alex", gender: "male", preview: "#", accent: "American" },
    {
      id: "2",
      name: "Sophia",
      gender: "female",
      preview: "#",
      accent: "British",
    },
    {
      id: "3",
      name: "Jackson",
      gender: "male",
      preview: "#",
      accent: "Australian",
    },
    {
      id: "4",
      name: "Emma",
      gender: "female",
      preview: "#",
      accent: "Canadian",
    },
    { id: "5", name: "Michael", gender: "male", preview: "#", accent: "Irish" },
    {
      id: "6",
      name: "Olivia",
      gender: "female",
      preview: "#",
      accent: "Scottish",
    },
  ];

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Japanese",
    "Chinese",
    "Russian",
    "Arabic",
  ];

  const expertiseTags = [
    "Crypto",
    "Tech",
    "Injective",
    "AI",
    "Hacks",
    "Sports",
    "Philosophy",
    "History",
    "Music",
    "Culture",
    "Social",
    "Math",
  ];

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      // Remove tag if already selected
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      // Add tag if we have less than 3 selected
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
      } else {
        // Show toast if trying to select more than 3
        toast.warning("You can select a maximum of 3 tags");
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="brutal-card">
            <h2 className="text-xl font-bold uppercase mb-6">
              Basic Information
            </h2>

            <div className="mb-6">
              <label className="block font-bold mb-2">Agent Name</label>
              <input
                type="text"
                className="brutal-border w-full p-3 bg-brutal-offwhite"
                placeholder="Choose a unique name"
                maxLength={50}
              />
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-2">
                Personality Description
              </label>
              <textarea
                className="brutal-border w-full p-3 bg-brutal-offwhite"
                rows={4}
                placeholder="Describe your agent's personality (e.g., sarcastic, friendly, analytical, etc.)"
                maxLength={300}
              />
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-2">Gender</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className={`brutal-border p-4 text-center ${
                    selectedGender === "male"
                      ? "bg-brutal-black text-brutal-white"
                      : "bg-brutal-offwhite"
                  }`}
                  onClick={() => setSelectedGender("male")}
                >
                  Male
                </button>
                <button
                  className={`brutal-border p-4 text-center ${
                    selectedGender === "female"
                      ? "bg-brutal-black text-brutal-white"
                      : "bg-brutal-offwhite"
                  }`}
                  onClick={() => setSelectedGender("female")}
                >
                  Female
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-2">
                Expertise Tags (Select 1-3)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {expertiseTags.map((tag) => (
                  <div
                    key={tag}
                    className={`brutal-border p-2 text-center text-sm cursor-pointer transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-black text-white"
                        : "bg-brutal-offwhite hover:bg-brutal-black hover:text-brutal-white"
                    }`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <p className="text-xs mt-2 text-gray-500">
                Selected: {selectedTags.length}/3
                {selectedTags.length === 0 && (
                  <span className="text-brutal-red ml-1">
                    At least one tag is required
                  </span>
                )}
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="brutal-card">
            <h2 className="text-xl font-bold uppercase mb-6">
              Voice & Language
            </h2>

            <div className="mb-6">
              <label className="block font-bold mb-2">Voice Selection</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {voices
                  .filter((voice) =>
                    selectedGender ? voice.gender === selectedGender : true
                  )
                  .map((voice) => (
                    <div
                      key={voice.id}
                      className={`brutal-border p-3 cursor-pointer ${
                        selectedVoice === voice.id
                          ? "bg-brutal-black text-brutal-white"
                          : "bg-brutal-offwhite"
                      }`}
                      onClick={() => setSelectedVoice(voice.id)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold">{voice.name}</h3>
                        <div className="brutal-border bg-brutal-white p-1">
                          <Mic className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-sm mt-1">{voice.accent} accent</div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-2">Language</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {languages.map((language) => (
                  <div
                    key={language}
                    title={language === "English" ? "" : "Coming soon!"}
                    className={`brutal-border p-2 text-center ${
                      language === "English"
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    } ${
                      selectedLanguage === language
                        ? "bg-brutal-black text-brutal-white"
                        : "bg-brutal-offwhite"
                    }`}
                    onClick={() => {
                      if (language === "English") setSelectedLanguage(language);
                      else alert("Coming soon! For now select English.");
                    }}
                  >
                    {language}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-2">Voice Modulation</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="brutal-border p-3 bg-brutal-offwhite">
                  <div className="font-bold mb-1">Pitch</div>
                  <input type="range" min="1" max="10" className="w-full" />
                </div>
                <div className="brutal-border p-3 bg-brutal-offwhite">
                  <div className="font-bold mb-1">Speed</div>
                  <input type="range" min="1" max="10" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="brutal-card">
            <h2 className="text-xl font-bold uppercase mb-6">NFT Avatar</h2>

            <div className="mb-6">
              <label className="block font-bold mb-2">Avatar Image</label>
              <div className="brutal-border bg-brutal-offwhite p-4 flex flex-col items-center justify-center min-h-[200px]">
                <Image className="w-12 h-12 mb-4 text-brutal-black" />
                <p className="mb-4 text-center">
                  Drag & drop your image or click to browse
                </p>
                <BrutalButton variant="outline">Upload Avatar</BrutalButton>
              </div>
              <p className="text-xs mt-2">
                Recommended size: 1000x1000px, Max size: 5MB, Formats: PNG, JPG
              </p>
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-2">Generate AI Avatar</label>
              <div className="brutal-border p-4 bg-brutal-black text-brutal-white">
                <p className="mb-4">
                  Don't have an image? Generate a unique AI avatar for your
                  podcast agent.
                </p>
                <div className="mb-4">
                  <input
                    type="text"
                    className="brutal-border w-full p-3 bg-brutal-white text-brutal-black"
                    placeholder="Describe your avatar (e.g., cyberpunk robot with neon lights)"
                    maxLength={100}
                  />
                </div>
                <BrutalButton variant="primary">Generate Avatar</BrutalButton>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="brutal-card">
            <h2 className="text-xl font-bold uppercase mb-6">
              Finalize & Mint
            </h2>

            <div className="mb-6">
              <div className="brutal-border bg-brutal-black p-4 text-brutal-white mb-6">
                <h3 className="font-bold uppercase mb-2">Creation Fee</h3>
                <div className="flex items-center">
                  <Coins className="w-6 h-6 mr-2" />
                  <span className="text-2xl font-bold">0.05 INJ</span>
                </div>
                <p className="mt-2 text-sm">
                  This fee covers the cost of minting your agent on the
                  blockchain and storage of metadata.
                </p>
              </div>

              <div className="brutal-border p-4 bg-brutal-offwhite mb-6">
                <h3 className="font-bold uppercase mb-2">Agent Ownership</h3>
                <p className="mb-2">By creating this agent, you'll receive:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Full ownership of the AI agent as an NFT</li>
                  <li>Ability to list on the marketplace</li>
                  <li>Earn royalties from secondary sales</li>
                  <li>Use in podcast recordings</li>
                </ul>
              </div>

              <div className="brutal-border p-4 bg-brutal-offwhite">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    className="brutal-border mt-1 mr-2 w-4 h-4"
                  />
                  <span className="text-sm">
                    I confirm that I own or have rights to all content used in
                    creating this AI agent, and I agree to the Terms of Service.
                  </span>
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const { injectiveAddress } = useWalletStore();

  return (
    <div className="min-h-screen flex flex-col bg-brutal-white">
      <Navbar />

      {!injectiveAddress ? (
        <p className="mt-8 ml-8">
          Please connect your Injective wallet using MetaMask provider to start
          using this application.
        </p>
      ) : (
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <div className="brutal-border bg-brutal-black text-brutal-white p-6 mb-8">
              <h1 className="text-3xl md:text-4xl font-display uppercase">
                Create AI Podcast Agent
              </h1>
              <p className="mt-2">
                Design a unique AI agent with custom voice and personality
              </p>
            </div>

            <div className="mb-8">
              <div className="brutal-border bg-brutal-offwhite p-4">
                <h2 className="text-xl font-bold mb-4 uppercase text-center">
                  Steps
                </h2>
                <div className="flex justify-between items-center">
                  {Array.from({ length: totalSteps }, (_, i) => i + 1).map(
                    (stepNumber) => (
                      <div
                        key={stepNumber}
                        className={`w-10 h-10 flex items-center justify-center brutal-border ${
                          step === stepNumber
                            ? "bg-brutal-red text-brutal-white"
                            : step > stepNumber
                            ? "bg-brutal-black text-brutal-white"
                            : "bg-brutal-white"
                        }`}
                      >
                        {stepNumber}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {renderStep()}

            <div className="flex justify-between mt-8">
              <BrutalButton
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                className={step === 1 ? "invisible" : ""}
              >
                Back
              </BrutalButton>

              {step < totalSteps ? (
                <BrutalButton
                  variant="primary"
                  onClick={() => setStep(Math.min(totalSteps, step + 1))}
                >
                  Next Step
                </BrutalButton>
              ) : (
                <BrutalButton variant="primary">
                  <span className="flex items-center">
                    Create Agent <Zap className="ml-2 w-5 h-5" />
                  </span>
                </BrutalButton>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Create;
