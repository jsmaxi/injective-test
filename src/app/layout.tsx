import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/NavBar";
import WalletContextProvider from "@/context/WalletContextProvider";
import CounterContextProvider from "@/context/CounterContextProvider";
import NftContextProvider from "@/context/NftContextProvider";

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
        <WalletContextProvider>
          <CounterContextProvider>
            <NftContextProvider>
              <Navbar />
              {children}
            </NftContextProvider>
          </CounterContextProvider>
        </WalletContextProvider>
      </body>
    </html>
  );
}
