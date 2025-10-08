"use client";

import { useEffect, useState } from "react";
import IntroOverlay from "@/components/IntroOverlay";
import ScrollEffects from "@/components/ScrollEffects";

// Lightweight sections (always mounted)
import Hero from "@/sections/Hero";
import Story from "@/sections/Story";
import Usp from "@/sections/Usp";
import ComingSoon from "@/sections/ComingSoon";
import Community from "@/sections/Community";
import Faqs from "@/sections/Faqs";

// Heavy sections (lazy-loaded only)
import dynamic from "next/dynamic";
const Renders = dynamic(() => import("@/sections/Renders"), { ssr: false });
const Vibe = dynamic(() => import("@/sections/Vibe"), { ssr: false });

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Intro overlay logic
  useEffect(() => {
    setIsClient(true);
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro) setShowIntro(true);
  }, []);

  const handleIntroFinished = () => {
    sessionStorage.setItem("hasSeenIntro", "1");
    setShowIntro(false);
  };

  return (
    <main className="w-full overflow-x-hidden">
      {/* Intro overlay on top */}
      {isClient && showIntro && <IntroOverlay onFinished={handleIntroFinished} />}

      {/* Scroll effects wrapper */}
      <ScrollEffects>
        {/* Above-the-fold */}
        <Hero />

        {/* Sections that are light enough to mount immediately */}
        <Story />
        <Renders />
        <Usp />
        <Vibe />
        <ComingSoon />
        <Community />
        <Faqs />

      </ScrollEffects>
    </main>
  );
}
