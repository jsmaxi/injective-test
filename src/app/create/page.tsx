"use client";

// https://gateway.pinata.cloud/ipfs/<hash>

import React, { useRef, useState } from "react";
import Navbar from "../../components/NavBar";
import BrutalButton from "../../components/BrutalButon";
import { Zap, Image, Mic, Coins, Upload } from "lucide-react";
import { useWalletStore } from "@/context/WalletContextProvider";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { pinToIpfs, pinToIpfsJson } from "@/utils/pinata";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPitch, setSelectedPitch] = useState("3");
  const [selectedSpeed, setSelectedSpeed] = useState("3");

  const [imageIpfsHash, setImageIpfsHash] = useState("");
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [metadataDialogOpen, setMetadataDialogOpen] = useState(false);
  const [metadataHash, setMetadataHash] = useState("");

  const totalSteps = 4;

  const voices = [
    {
      id: "1",
      name: "Arsenio",
      gender: "male",
      preview: "#",
      accent: "African American",
      link: "s3://voice-cloning-zero-shot/65977f5e-a22a-4b36-861b-ecede19bdd65/original/manifest.json",
    },
    {
      id: "2",
      name: "Nia",
      gender: "female",
      preview: "#",
      accent: "American",
      link: "s3://voice-cloning-zero-shot/831bd330-85c6-4333-b2b4-10c476ea3491/original/manifest.json",
    },
    {
      id: "3",
      name: "Angelo",
      gender: "male",
      preview: "#",
      accent: "American",
      link: "s3://voice-cloning-zero-shot/baf1ef41-36b6-428c-9bdf-50ba54682bd8/original/manifest.json",
    },
    {
      id: "4",
      name: "Inara",
      gender: "female",
      preview: "#",
      accent: "African American",
      link: "s3://voice-cloning-zero-shot/adb83b67-8d75-48ff-ad4d-a0840d231ef1/original/manifest.json",
    },
    {
      id: "5",
      name: "Mitch",
      gender: "male",
      preview: "#",
      accent: "Australian",
      link: "s3://voice-cloning-zero-shot/c14e50f2-c5e3-47d1-8c45-fa4b67803d19/original/manifest.json",
    },
    {
      id: "6",
      name: "Ava",
      gender: "female",
      preview: "#",
      accent: "Australian",
      link: "s3://voice-cloning-zero-shot/50381567-ff7b-46d2-bfdc-a9584a85e08d/original/manifest.json",
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

  const handleCreate = async () => {
    console.log("creating...");

    if (!name) {
      alert("Agent name is required!");
      return;
    }

    if (!description) {
      alert("Agent personality description is required!");
      return;
    }

    if (!knowledge) {
      alert("Agent knowledge is required!");
      return;
    }

    if (!selectedGender) {
      alert("Agent gender is required!");
      return;
    }

    if (!selectedTags || selectedTags.length === 0) {
      alert("Agent tags are required!");
      return;
    }

    if (!selectedVoice) {
      alert("Agent voice is required!");
      return;
    }

    if (!selectedLanguage) {
      alert("Agent language is required!");
      return;
    }

    if (!selectedPitch) {
      alert("Agent pitch is required!");
      return;
    }

    if (!selectedSpeed) {
      alert("Agent speed is required!");
      return;
    }

    if (!uploadedAvatar) {
      alert("Agent avatar is required!");
      return;
    }

    if (!imageIpfsHash) {
      alert("Image IPFS hash is required!");
      return;
    }

    console.log(
      name,
      description,
      knowledge,
      selectedGender,
      selectedTags,
      selectedVoice,
      selectedLanguage,
      selectedPitch,
      selectedSpeed,
      imageIpfsHash
    );

    try {
      setUploading(true);

      const jsonData = {
        name: name,
        personality: description,
        knowledge: knowledge,
        gender: selectedGender,
        tags: selectedTags,
        voice: selectedVoice,
        language: selectedLanguage,
        pitch: selectedPitch,
        speed: selectedSpeed,
        imageIpfsHash: imageIpfsHash,
      };

      const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], {
        type: "application/json",
      });

      try {
        const res = await pinToIpfsJson(jsonBlob);
        console.log("Json ipfs hash", res?.IpfsHash);
        setMetadataHash(res?.IpfsHash);
        setMetadataDialogOpen(true);
      } catch (e) {
        alert("Failed to upload json to Pinata IPFS!");
      }
    } catch (e) {
      console.log(e);
      alert("Failed to create an agent! Please check console for details.");
    } finally {
      setUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Please upload a JPEG or PNG file");
      return;
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Simulate upload progress
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const res = await pinToIpfs(file);
      console.log("Image ipfs hash", res?.IpfsHash);
      setImageIpfsHash(res?.IpfsHash);
    } catch (e) {
      alert("Failed to upload image to Pinata IPFS!");
    }

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Create file reader to get data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setTimeout(() => {
        setUploadedAvatar(dataUrl);
        setIsUploading(false);
        setUploadProgress(100);
        toast.success("Image uploaded successfully");
        clearInterval(interval);
      }, 2000);
    };
    reader.readAsDataURL(file);
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-2">Agent Knowledge</label>
              <Textarea
                className="brutal-border w-full p-3 bg-brutal-offwhite"
                rows={6}
                placeholder="Describe in detail what your agent knows about (e.g., Injective, crypto, philosophy, etc.)"
                maxLength={2000}
                value={knowledge}
                onChange={(e) => setKnowledge(e.target.value)}
              />
              <p className="text-xs mt-1 text-gray-500">
                Maximum 700 characters
              </p>
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
                        selectedVoice === voice.link
                          ? "bg-brutal-black text-brutal-white"
                          : "bg-brutal-offwhite"
                      }`}
                      onClick={() => setSelectedVoice(voice.link)}
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
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step={1}
                    className="w-full"
                    value={selectedPitch}
                    onChange={(e) => setSelectedPitch(e.target.value)}
                  />
                </div>
                <div className="brutal-border p-3 bg-brutal-offwhite">
                  <div className="font-bold mb-1">Speed</div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step={1}
                    className="w-full"
                    value={selectedSpeed}
                    onChange={(e) => setSelectedSpeed(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="brutal-card">
            <h2 className="text-xl font-bold uppercase mb-6">Agent Avatar</h2>

            <div className="mb-6">
              <label className="block font-bold mb-2">Avatar Image</label>
              <div className="brutal-border bg-brutal-offwhite p-4 flex flex-col items-center justify-center min-h-[200px]">
                {uploadedAvatar ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={uploadedAvatar}
                      alt="Uploaded avatar"
                      className="w-32 h-32 object-cover mb-4 brutal-border"
                    />
                    <p className="mb-4">Avatar uploaded successfully</p>
                    <BrutalButton variant="outline" onClick={handleUploadClick}>
                      Change Avatar
                    </BrutalButton>
                  </div>
                ) : isUploading ? (
                  <div className="w-full flex flex-col items-center">
                    <Upload className="w-12 h-12 mb-4 text-brutal-black animate-pulse" />
                    <p className="mb-4 text-center">Uploading avatar...</p>
                    <div className="w-full max-w-xs mb-4">
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  </div>
                ) : (
                  <>
                    <Image className="w-12 h-12 mb-4 text-brutal-black" />
                    <p className="mb-4 text-center">
                      Click to browse your local file system
                    </p>
                    <BrutalButton variant="outline" onClick={handleUploadClick}>
                      Upload Avatar
                    </BrutalButton>
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                />
              </div>
              <p className="text-xs mt-2">
                Recommended size: 1000x1000px, Max size: 5MB, Formats: PNG, JPG
              </p>
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-2">
                Generate AI Avatar (Coming Soon)
              </label>
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
                <BrutalButton
                  variant="primary"
                  onClick={() => alert("Coming soon!")}
                >
                  Generate Avatar
                </BrutalButton>
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
                <BrutalButton
                  variant="primary"
                  onClick={handleCreate}
                  disabled={uploading}
                >
                  <span className="flex items-center">
                    Create Agent <Zap className="ml-2 w-5 h-5" />
                  </span>
                </BrutalButton>
              )}
            </div>
          </div>
        </main>
      )}

      <Dialog open={metadataDialogOpen} onOpenChange={setMetadataDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Agent Metadata File
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center p-4">
            <div className="brutal-border p-4 bg-brutal-offwhite w-full mb-4">
              <p className="mb-2 font-semibold">
                Please check the metadata file here:
              </p>
              <p className="brutal-border bg-brutal-white p-3 break-all">
                <Link
                  target="_blank"
                  href={"https://gateway.pinata.cloud/ipfs/" + metadataHash}
                >
                  https://gateway.pinata.cloud/ipfs/{metadataHash}
                </Link>
              </p>
            </div>

            <BrutalButton
              variant="primary"
              onClick={() => setMetadataDialogOpen(false)}
              className="w-full"
            >
              Close
            </BrutalButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Create;
