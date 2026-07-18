import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WatchlistProvider } from "@/context/WatchlistContext";
import { QueryProvider } from "@/context/QueryProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CinematicIntro from "@/components/layout/CinematicIntro";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SK Movies | Premium Cinematic Platform",
  description: "Explore your favorite movies, organize your watchlist, and discover top trending cinema titles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#060608] text-white">
        <QueryProvider>
          <WatchlistProvider>
            <CinematicIntro />
            <Navbar />
            <main className="flex-grow flex flex-col">{children}</main>
            <Footer />
          </WatchlistProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
