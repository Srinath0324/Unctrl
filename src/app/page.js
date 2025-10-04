"use client";

import Hero from "@/sections/Hero";
import Story from "@/sections/Story";
import Renders from "@/sections/Renders";
import Usp from "@/sections/Usp";
import Vibe from "@/sections/Vibe";
import ComingSoon from "@/sections/ComingSoon";
import Community from "@/sections/Community";
import Faqs from "@/sections/Faqs"; 
import IntroOverlay from "@/components/IntroOverlay";
import { useEffect, useState } from "react";

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroFinished = () => {
    sessionStorage.setItem("hasSeenIntro", "1");
    setShowIntro(false);
    requestAnimationFrame(() => {
      const hero = document.getElementById("home");
      hero?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <main className="w-full overflow-x-hidden">
      {isClient && showIntro && <IntroOverlay onFinished={handleIntroFinished} />}
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
