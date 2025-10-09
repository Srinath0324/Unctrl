"use client";

import { useEffect, useState } from "react";
import IntroOverlay from "@/components/IntroOverlay";
import ScrollEffects from "@/components/ScrollEffects";

// Lightweight sections (always SSR)
import Hero from "@/sections/Hero";
import Story from "@/sections/Story";
import Renders from "@/sections/Renders"; // SSR is fine
import ComingSoon from "@/sections/ComingSoon";
import Community from "@/sections/Community";
import Faqs from "@/sections/Faqs";

// Heavy sections (lazy-loaded)
import dynamic from "next/dynamic";
const Usp = dynamic(() => import("@/sections/Usp"), { ssr: false });
const Vibe = dynamic(() => import("@/sections/Vibe"), { ssr: false });

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
      const lastSeen = sessionStorage.getItem("introLastSeen");
      const now = Date.now();
      if (!hasSeenIntro || !lastSeen || now - parseInt(lastSeen) > 86400000) {
        setShowIntro(true);
      }
    } catch {}
  }, []);

  const handleIntroFinished = () => {
    try {
      sessionStorage.setItem("hasSeenIntro", "1");
      sessionStorage.setItem("introLastSeen", Date.now().toString());
    } catch {}
    setShowIntro(false);
  };

  return (
    <main className="w-full overflow-x-hidden">
      {isClient && showIntro && <IntroOverlay onFinished={handleIntroFinished} />}

      <ScrollEffects>
        <Hero />
        <Story />
        <Renders />       {/* SSR video */}
        <Usp />          {/* 3D model, client-only */}
        <Vibe />         {/* multiple videos, lazy-play */}
        <ComingSoon />
        <Community />
        <Faqs />
      </ScrollEffects>
    </main>
  );
}
