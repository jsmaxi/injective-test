"use client";

import React, { useState } from "react";
import BrutalButton from "./BrutalButon";
import { Mic, Zap, Package, Headphones, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWalletStore } from "@/context/WalletContextProvider";
import WalletDialog from "./WalletDialog";
import { useIsMobile } from "@/hooks/use-mobile";

const NavBar: React.FC = () => {
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);

  const currentPath = usePathname();

  const isActive = (path: string) => {
    return currentPath === path;
  };

  const isMobile = useIsMobile();

  const { connectWallet, disconnectWallet, injectiveAddress, ethereumAddress } =
    useWalletStore();

  const btnText = injectiveAddress
    ? `${injectiveAddress.slice(0, 5)}...${injectiveAddress.slice(-3)}`
    : "Connect Wallet";

  const handleConnectWallet = () => {
    if (!injectiveAddress) {
      connectWallet();
    } else {
      setWalletDialogOpen(true);
    }
  };

  const handleDisconnectWallet = () => {
    disconnectWallet();
    setWalletDialogOpen(false);
  };

  const mobileLinks = () => (
    <div className="flex flex-col space-y-6 p-4">
      <Link
        href="/market"
        className={`font-mono uppercase ${
          isActive("/market") ? "text-brutal-red" : "hover:text-brutal-red"
        } transition-colors flex items-center`}
      >
        <Package className="w-5 h-5 mr-3" />
        Market
      </Link>
      <Link
        href="/create"
        className={`font-mono uppercase ${
          isActive("/create") ? "text-brutal-red" : "hover:text-brutal-red"
        } transition-colors flex items-center`}
      >
        <Zap className="w-5 h-5 mr-3" />
        Create
      </Link>
      <Link
        href="/studio"
        className={`font-mono uppercase ${
          isActive("/studio") ? "text-brutal-red" : "hover:text-brutal-red"
        } transition-colors flex items-center`}
      >
        <Headphones className="w-5 h-5 mr-3" />
        Studio
      </Link>
      <Link
        href="/agents"
        className={`font-mono uppercase ${
          isActive("/agents") ? "text-brutal-red" : "hover:text-brutal-red"
        } transition-colors flex items-center`}
      >
        <User className="w-5 h-5 mr-3" />
        Agents
      </Link>

      <div className="pt-4 border-t-2 border-brutal-black">
        <BrutalButton
          onClick={handleConnectWallet}
          className="w-full justify-center"
        >
          {btnText}
        </BrutalButton>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-brutal-white border-b-4 border-brutal-black">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="brutal-border w-12 h-12 flex items-center justify-center bg-brutal-red">
            <Mic className="w-6 h-6 text-brutal-white" />
          </div>
          <h1 className="ml-4 text-xl md:text-2xl font-display uppercase tracking-tighter">
            Podcast<span className="text-brutal-red">AI</span>
          </h1>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/market"
            className={`font-mono uppercase ${
              isActive("/market") ? "text-brutal-red" : "hover:text-brutal-red"
            } transition-colors flex items-center`}
          >
            <Package className="w-4 h-4 mr-2" />
            Market
          </Link>
          <Link
            href="/create"
            className={`font-mono uppercase ${
              isActive("/create") ? "text-brutal-red" : "hover:text-brutal-red"
            } transition-colors flex items-center`}
          >
            <Zap className="w-4 h-4 mr-2" />
            Create
          </Link>
          <Link
            href="/studio"
            className={`font-mono uppercase ${
              isActive("/studio") ? "text-brutal-red" : "hover:text-brutal-red"
            } transition-colors flex items-center`}
          >
            <Headphones className="w-4 h-4 mr-2" />
            Studio
          </Link>
          <Link
            href="/agents"
            className={`font-mono uppercase ${
              isActive("/agents") ? "text-brutal-red" : "hover:text-brutal-red"
            } transition-colors flex items-center`}
          >
            <User className="w-4 h-4 mr-2" />
            Agents
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {!isMobile && (
            <BrutalButton onClick={handleConnectWallet}>{btnText}</BrutalButton>
          )}

          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <button className="brutal-border bg-brutal-black text-brutal-white p-2">
                  <Menu />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="brutal-border bg-brutal-white p-6 w-[280px] sm:w-[350px]"
              >
                <SheetTitle>Menu</SheetTitle>
                {mobileLinks()}
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

      <WalletDialog
        isOpen={walletDialogOpen}
        onOpenChange={setWalletDialogOpen}
        walletAddress={ethereumAddress}
        injAddress={injectiveAddress}
        onDisconnect={handleDisconnectWallet}
      />
    </header>
  );
};

export default NavBar;
