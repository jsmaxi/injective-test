import type { Metadata } from "next";
import "./globals.css";
import WalletContextProvider from "@/context/WalletContextProvider";
import NftContextProvider from "@/context/NftContextProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Injective PodcastAI",
  description: "Injective PodcastAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Toaster />
        <Sonner />
        <WalletContextProvider>
          <NftContextProvider>{children}</NftContextProvider>
        </WalletContextProvider>
      </body>
    </html>
  );
}
