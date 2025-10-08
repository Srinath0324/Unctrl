"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import IntroOverlay from "@/components/IntroOverlay";

// Dynamic imports
const Hero = dynamic(() => import("@/sections/Hero"));
const Story = dynamic(() => import("@/sections/Story"));
const Renders = dynamic(() => import("@/sections/Renders"), { ssr: false });
const Usp = dynamic(() => import("@/sections/Usp"));
const Vibe = dynamic(() => import("@/sections/Vibe"), { ssr: false });
const ComingSoon = dynamic(() => import("@/sections/ComingSoon"));
const Community = dynamic(() => import("@/sections/Community"));
const Faqs = dynamic(() => import("@/sections/Faqs"));

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Intro logic
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
  };

  return (
    <main className="w-full overflow-x-hidden">
      {/* Intro overlay */}
      {isClient && showIntro && <IntroOverlay onFinished={handleIntroFinished} />}

      {/* Above-the-fold section */}
      <Hero />

      {/* Below-the-fold sections — load all in parallel with Suspense */}
      <Suspense fallback={<div className="h-screen bg-black/10" />}>
        <Story />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-black/10" />}>
        <Renders />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-black/10" />}>
        <Usp />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-black/10" />}>
        <Vibe />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-black/10" />}>
        <ComingSoon />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-black/10" />}>
        <Community />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-black/10" />}>
        <Faqs />
      </Suspense>
    </main>
  );
}
