"use client";

import Hero from "@/sections/Hero";
import Story from "@/sections/Story";
import Renders from "@/sections/Renders";
import Usp from "@/sections/Usp";
import Vibe from "@/sections/Vibe";
import ComingSoon from "@/sections/ComingSoon";
import Community from "@/sections/Community";
import Faqs from "@/sections/Faqs";
import Footer from "@/components/Footer";
import IntroOverlay from "@/components/IntroOverlay";
import { useEffect, useState } from "react";

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // 🔹 TOGGLE: true = show intro EVERY reload, false = show ONLY first visit
  const PLAY_INTRO_EVERY_TIME = false;

  useEffect(() => {
    setIsClient(true);

    if (PLAY_INTRO_EVERY_TIME) {
      setShowIntro(true);
    } else {
      // Only show intro if user hasn't seen it yet
      const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
      if (!hasSeenIntro) {
        setShowIntro(true);
      }
    }
  }, []);

  const handleIntroFinished = () => {
    if (!PLAY_INTRO_EVERY_TIME) {
      // Only mark as seen if intro is supposed to show once
      sessionStorage.setItem("hasSeenIntro", "1");
    }

    setShowIntro(false);

    // Smooth scroll to hero section
    const hero = document.getElementById("home");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="w-full overflow-x-hidden">
      {isClient && showIntro && (
        <IntroOverlay
          onFinished={handleIntroFinished}
        />
      )}
      <Hero />
      <Story />
      <Renders />
      <Usp />
      <Vibe />
      <ComingSoon />
      <Community />
      <Faqs />
      
    </main>
  );
}
