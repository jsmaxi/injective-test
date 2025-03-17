import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink, Power } from "lucide-react";
import BrutalButton from "./BrutalButon";
import Link from "next/link";

interface WalletDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  walletAddress?: string;
  injAddress?: string;
  onDisconnect: () => void;
}

const WalletDialog: React.FC<WalletDialogProps> = ({
  isOpen,
  onOpenChange,
  walletAddress,
  injAddress,
  onDisconnect,
}) => {
  const shortenAddress = (address: string | undefined) => {
    if (!address) return "";
    if (address.length < 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl uppercase">
            Your Wallet
          </DialogTitle>
          <DialogDescription className="font-mono">
            Explore wallet details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 font-mono">
          <div className="brutal-border p-3 bg-brutal-offwhite">
            <p className="text-sm font-bold mb-1">Network</p>
            <p className="flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Injective Testnet
            </p>
          </div>

          <div className="brutal-border p-3 bg-brutal-offwhite">
            <p className="text-sm font-bold mb-1">Addresses</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs">Ethereum:</span>
              <Link
                href={`https://sepolia.etherscan.io/address/${walletAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brutal-red hover:underline flex items-center text-xs"
              >
                {shortenAddress(walletAddress)}
                <ExternalLink className="ml-1 w-3 h-3" />
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Injective:</span>
              <Link
                href={`https://testnet.explorer.injective.network/account/${injAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brutal-red hover:underline flex items-center text-xs"
              >
                {shortenAddress(injAddress)}
                <ExternalLink className="ml-1 w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="brutal-border p-3 bg-brutal-offwhite">
            <p className="text-sm font-bold mb-1">Resources</p>
            <Link
              href="https://testnet.faucet.injective.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brutal-red hover:underline flex items-center text-xs"
            >
              Testnet Faucet
              <ExternalLink className="ml-1 w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <BrutalButton
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={onDisconnect}
          >
            <Power className="mr-2 w-4 h-4" />
            Disconnect Wallet
          </BrutalButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletDialog;
