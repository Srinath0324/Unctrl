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

// Heavy sections (lazy-loaded)
import dynamic from "next/dynamic";
const Renders = dynamic(() => import("@/sections/Renders"), { ssr: false });
const Vibe = dynamic(() => import("@/sections/Vibe"), { ssr: false });

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if user has seen intro (using a more reliable check)
    try {
      const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
      const lastSeen = sessionStorage.getItem("introLastSeen");
      const now = Date.now();
      
      // Show intro if never seen, or if it's been more than 24 hours
      if (!hasSeenIntro || !lastSeen || (now - parseInt(lastSeen)) > 86400000) {
        setShowIntro(true);
      }
    } catch (e) {
      // If sessionStorage fails, just skip the intro
      console.log("SessionStorage not available");
    }
  }, []);

  const handleIntroFinished = () => {
    try {
      sessionStorage.setItem("hasSeenIntro", "1");
      sessionStorage.setItem("introLastSeen", Date.now().toString());
    } catch (e) {
      console.log("Could not save to sessionStorage");
    }
    setShowIntro(false);
  };

  return (
    <main className="w-full overflow-x-hidden">
      {/* Intro overlay - only shows when needed */}
      {isClient && showIntro && <IntroOverlay onFinished={handleIntroFinished} />}

      {/* Main content - renders immediately regardless of intro */}
      <ScrollEffects>
        <Hero /> 
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