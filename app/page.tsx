"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AdventCard } from "./components/AdventCard";
import { GiftModal } from "./components/GiftModal";
import { gifts } from "./data/gifts";
import { Gift } from "./types";
import Footer from "./components/Footer";

const Snowfall = dynamic(() => import("react-snowfall"), { ssr: false });

export default function Home() {
  const [openCards, setOpenCards] = useState<Set<number>>(new Set());
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [lastOpenedDate, setLastOpenedDate] = useState<string | null>(null);

  // Load `openCards` and `lastOpenedDate` from `localStorage` on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedOpenCards = localStorage.getItem("openCards");
      if (storedOpenCards) {
        setOpenCards(new Set(JSON.parse(storedOpenCards)));
      }

      const storedLastOpenedDate = localStorage.getItem("lastOpenedDate");
      if (storedLastOpenedDate) {
        setLastOpenedDate(storedLastOpenedDate);
      }
    }
  }, []);

  // Save `openCards` to `localStorage` whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("openCards", JSON.stringify(Array.from(openCards)));
    }
  }, [openCards]);

  // Save `lastOpenedDate` to `localStorage` whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && lastOpenedDate) {
      localStorage.setItem("lastOpenedDate", lastOpenedDate);
    }
  }, [lastOpenedDate]);

  const handleCardClick = (gift: Gift) => {
    const today = new Date().getDate(); // Get today's day (e.g., 1, 2, 3, etc.)

    // Check if the gift is available to open based on the current day
    if (gift.id > today) {
      alert(`You can only open this gift on or after December ${gift.id}.`);
      return;
    }

    // Check if the user has already opened a card today
    const todayDateString = new Date().toISOString().split("T")[0];
    if (lastOpenedDate === todayDateString && !openCards.has(gift.id)) {
      alert("You can only open one card per day. Come back tomorrow!");
      return;
    }

    // Open the card and update state
    setSelectedGift(gift);
    setOpenCards((prev) => new Set([...prev, gift.id])); // Add the gift.id to the Set

    // Update the last opened date
    setLastOpenedDate(todayDateString);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-red-900 py-12 px-4 relative overflow-hidden">
      <Snowfall snowflakeCount={200} />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-[54px] whitespace-nowrap lg:text-[104px] uppercase text-white font-light font-serif tracking-tighter leading-none">
            VYARA'S SPECIAL
          </h1>
          <h1 className="text-4xl lg:text-5xl font-bold uppercase text-red-500 mb-6 font-serif tracking-wide">
            Digital Advent Calendar
          </h1>
          <p className="text-xl lg:text-2xl text-green-300 font-berkshire font-light">
            Specially created with all my love for my special kitty. Seni cok
            seviyorum, askim benim 🎄✨
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {gifts.map((gift) => (
            <AdventCard
              key={gift.id}
              gift={gift}
              isOpen={openCards.has(gift.id)} // Dynamically check if the card is open
              onClick={handleCardClick}
            />
          ))}
        </div>

        <GiftModal gift={selectedGift} onClose={() => setSelectedGift(null)} />
      </div>
      <Footer />
    </main>
  );
}
