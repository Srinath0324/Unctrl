"use client";

import { useState, useEffect } from "react";
import ScrollEffects from "@/components/ScrollEffects";
import SiteHeader from "@/components/SiteHeader";
import IntroOverlay from "@/components/IntroOverlay";

export default function RootWrapper({ children }) {
  const [showIntro, setShowIntro] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // toggle: true = always show, false = first visit only
  const PLAY_INTRO_EVERY_TIME = true;

  useEffect(() => {
    setIsClient(true);

    if (PLAY_INTRO_EVERY_TIME) {
      setShowIntro(true);
    } else {
      const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
      if (!hasSeenIntro) {
        setShowIntro(true);
      }
    }
  }, []);

  const handleIntroFinished = () => {
    if (!PLAY_INTRO_EVERY_TIME) {
      sessionStorage.setItem("hasSeenIntro", "1");
    }
    setShowIntro(false);

    // Smooth scroll to hero
    const hero = document.getElementById("home");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {isClient && showIntro ? (
        <IntroOverlay onFinished={handleIntroFinished} />
      ) : (
        <ScrollEffects>
          <SiteHeader />
          {children}
        </ScrollEffects>
      )}
    </>
  );
}