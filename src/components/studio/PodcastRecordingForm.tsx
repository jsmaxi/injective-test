import React, { useState, useEffect } from "react";
import { Mic, Bot, Plus } from "lucide-react";
import BrutalButton from "../BrutalButon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PricingOptions from "./PricingOptions";
import { useRouter } from "next/navigation";

interface Agent {
  id: string;
  name: string;
  topics: string[];
  personality: string;
}

interface PodcastRecordingFormProps {
  userAgents: Agent[];
}

const PodcastRecordingForm: React.FC<PodcastRecordingFormProps> = ({
  userAgents,
}) => {
  const navigate = useRouter();
  const [selectedHost, setSelectedHost] = useState("");
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState("basic");
  const [isAddGuestDialogOpen, setIsAddGuestDialogOpen] = useState(false);

  // Pricing options
  const pricingOptions = [
    {
      id: "basic",
      name: "Basic",
      duration: "10 minutes",
      guests: 1,
      price: 0.005,
    },
    {
      id: "standard",
      name: "Standard",
      duration: "20 minutes",
      guests: 2,
      price: 0.01,
    },
    {
      id: "premium",
      name: "Premium",
      duration: "30 minutes",
      guests: 3,
      price: 0.02,
    },
  ];

  // Reset guests when pricing changes to ensure guest limit is respected
  useEffect(() => {
    const currentPricingOption = pricingOptions.find(
      (option) => option.id === selectedPricing
    );
    if (
      currentPricingOption &&
      selectedGuests.length > currentPricingOption.guests
    ) {
      setSelectedGuests(selectedGuests.slice(0, currentPricingOption.guests));
    }
  }, [selectedPricing]);

  const handleStartPodcast = () => {
    navigate.push(`/podcast-room/${selectedPricing}`);
  };

  const handleAddGuest = (guestId: string) => {
    if (guestId === selectedHost) {
      return; // Cannot add the host as a guest
    }

    const currentPricingOption = pricingOptions.find(
      (option) => option.id === selectedPricing
    );
    if (!currentPricingOption) return;

    if (
      selectedGuests.length < currentPricingOption.guests &&
      !selectedGuests.includes(guestId)
    ) {
      setSelectedGuests([...selectedGuests, guestId]);
    }

    setIsAddGuestDialogOpen(false);
  };

  const handleRemoveGuest = (guestId: string) => {
    setSelectedGuests(selectedGuests.filter((id) => id !== guestId));
  };

  // Get available agents for guest selection (exclude the host)
  const getAvailableGuestsAgents = () => {
    return userAgents.filter(
      (agent) => agent.id !== selectedHost && !selectedGuests.includes(agent.id)
    );
  };

  // Get max number of guests allowed by current pricing
  const getMaxGuests = () => {
    const currentPricingOption = pricingOptions.find(
      (option) => option.id === selectedPricing
    );
    return currentPricingOption ? currentPricingOption.guests : 0;
  };

  // Check if more guests can be added
  const canAddMoreGuests = () => {
    return selectedGuests.length < getMaxGuests();
  };

  return (
    <div className="brutal-card h-full">
      <h2 className="text-xl font-bold uppercase mb-4">New Episode</h2>

      <div className="mb-6">
        <label className="block font-bold mb-2">Episode Topic</label>
        <textarea
          className="brutal-border w-full p-3 bg-brutal-offwhite"
          rows={3}
          placeholder="Enter the topic or prompt for your podcast episode..."
        />
      </div>

      <div className="mb-6">
        <label className="block font-bold mb-2">Host & Guests</label>
        <div className="brutal-border p-4 mb-3 bg-brutal-offwhite flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <div className="brutal-border w-10 h-10 flex items-center justify-center bg-brutal-red">
              <Mic className="w-5 h-5 text-brutal-white" />
            </div>
            <div className="ml-3">
              <div className="font-bold">Host</div>
              <Select value={selectedHost} onValueChange={setSelectedHost}>
                <SelectTrigger className="w-[180px] brutal-border">
                  <SelectValue placeholder="Select host" />
                </SelectTrigger>
                <SelectContent>
                  {userAgents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Dialog
              open={isAddGuestDialogOpen}
              onOpenChange={setIsAddGuestDialogOpen}
            >
              <DialogTrigger asChild>
                <BrutalButton
                  variant="outline"
                  className="text-sm"
                  onClick={() => {}}
                  disabled={!canAddMoreGuests() || !selectedHost}
                >
                  <Plus className="w-3 h-3 mr-1" /> Add Guest (
                  {selectedGuests.length}/{getMaxGuests()})
                </BrutalButton>
              </DialogTrigger>
              <DialogContent className="brutal-border bg-brutal-white p-0">
                <DialogHeader className="p-4 bg-brutal-black text-brutal-white">
                  <DialogTitle>Select Guest Agent</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                  <p className="mb-4">Select an agent to add as a guest:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {getAvailableGuestsAgents().map((agent) => (
                      <div
                        key={agent.id}
                        className="brutal-border p-3 cursor-pointer hover:bg-brutal-offwhite flex justify-between items-center"
                        onClick={() => handleAddGuest(agent.id)}
                      >
                        <div className="flex items-center">
                          <Bot className="w-4 h-4 mr-2" />
                          <span>{agent.name}</span>
                        </div>
                        <Plus className="w-4 h-4" />
                      </div>
                    ))}
                    {getAvailableGuestsAgents().length === 0 && (
                      <p className="text-center text-gray-500 p-4">
                        No available agents to add as guests
                      </p>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Display selected guests */}
        {selectedGuests.length > 0 && (
          <div className="mt-3 space-y-2">
            {selectedGuests.map((guestId) => {
              const guest = userAgents.find((agent) => agent.id === guestId);
              if (!guest) return null;

              return (
                <div
                  key={guestId}
                  className="brutal-border p-3 bg-brutal-offwhite flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className="brutal-border w-8 h-8 flex items-center justify-center bg-brutal-black">
                      <Bot className="w-4 h-4 text-brutal-white" />
                    </div>
                    <div className="ml-2">
                      <div className="font-bold">{guest.name}</div>
                      <div className="text-xs">
                        {guest.personality.substring(0, 40)}...
                      </div>
                    </div>
                  </div>
                  <BrutalButton
                    variant="outline"
                    className="text-xs"
                    onClick={() => handleRemoveGuest(guestId)}
                  >
                    Remove
                  </BrutalButton>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block font-bold mb-2">Episode Settings</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Format</label>
            <select className="brutal-border px-3 py-2 w-full">
              <option>Discussion</option>
              <option>Interview</option>
              <option>Monologue</option>
              <option>Debate</option>
            </select>
          </div>
        </div>
      </div>

      <PricingOptions
        pricingOptions={pricingOptions}
        selectedPricing={selectedPricing}
        onPricingChange={setSelectedPricing}
      />

      <div className="flex justify-center">
        <BrutalButton
          variant="primary"
          className="text-lg px-8 py-3"
          onClick={handleStartPodcast}
          disabled={!selectedHost}
        >
          <span className="flex items-center">
            <Mic className="w-5 h-5 mr-2" /> Start Recording
          </span>
        </BrutalButton>
      </div>
    </div>
  );
};

export default PodcastRecordingForm;
