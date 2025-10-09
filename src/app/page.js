// file: app/page.js or pages/index.js
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import IntroOverlay from "@/components/IntroOverlay";

// Lightweight SSR sections
import Hero from "@/sections/Hero";
import Story from "@/sections/Story";
import Renders from "@/sections/Renders";
import ComingSoon from "@/sections/ComingSoon";
import Community from "@/sections/Community";
import Faqs from "@/sections/Faqs";

// Heavy client-only sections
const Usp = dynamic(() => import("@/sections/Usp"), { ssr: false });
const Vibe = dynamic(() => import("@/sections/Vibe"), { ssr: false });

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Preload heavy components while intro plays
    import("@/sections/Usp");
    import("@/sections/Vibe");
  }, []);

  const handleIntroFinished = () => {
    setShowIntro(false);
  };

  return (
    <main className="w-full overflow-x-hidden">
      {showIntro && <IntroOverlay onFinished={handleIntroFinished} />}
      {!showIntro && (
        <>
          <Hero />
          <Story />
          <Renders />
          <Usp />
          <Vibe />
          <ComingSoon />
          <Community />
          <Faqs />
        </>
      )}
    </main>
  );
}
