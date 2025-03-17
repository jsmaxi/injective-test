import React from "react";
import { Coins } from "lucide-react";

interface PricingOption {
  id: string;
  name: string;
  duration: string;
  guests: number;
  price: number;
}

interface PricingOptionsProps {
  pricingOptions: PricingOption[];
  selectedPricing: string;
  onPricingChange: (pricingId: string) => void;
}

const PricingOptions: React.FC<PricingOptionsProps> = ({
  pricingOptions,
  selectedPricing,
  onPricingChange,
}) => {
  return (
    <div className="mb-6">
      <label className="block font-bold mb-2">Pricing Options</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pricingOptions.map((option) => (
          <div
            key={option.id}
            className={`brutal-border p-4 cursor-pointer ${
              selectedPricing === option.id
                ? "bg-brutal-black text-brutal-white"
                : "bg-brutal-offwhite"
            }`}
            onClick={() => onPricingChange(option.id)}
          >
            <h3 className="font-bold uppercase mb-1">{option.name}</h3>
            <ul className="text-sm mb-3">
              <li>Duration: {option.duration}</li>
              <li>Guests: Up to {option.guests}</li>
            </ul>
            <div className="flex items-center">
              <Coins className="w-4 h-4 mr-1" />
              <span className="font-bold">{option.price} ETH</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingOptions;
