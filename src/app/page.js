// file: app/page.js or pages/index.js
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import IntroOverlay from "@/components/IntroOverlay";

// Load Hero normally so it's immediately available after intro
import Hero from "@/sections/Hero";

// Defer the rest via dynamic imports (code-splitting)
const Story = dynamic(() => import("@/sections/Story"), { ssr: true, loading: () => null });
const Renders = dynamic(() => import("@/sections/Renders"), { ssr: true, loading: () => null });
const ComingSoon = dynamic(() => import("@/sections/ComingSoon"), { ssr: true, loading: () => null });
const Community = dynamic(() => import("@/sections/Community"), { ssr: true, loading: () => null });
const Faqs = dynamic(() => import("@/sections/Faqs"), { ssr: true, loading: () => null });

// Heavy client-only sections
const Usp = dynamic(() => import("@/sections/Usp"), { ssr: false });
const Vibe = dynamic(() => import("@/sections/Vibe"), { ssr: false });

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [introKey, setIntroKey] = useState(0);
  const [showRest, setShowRest] = useState(false);

  useEffect(() => {
    // Force IntroOverlay to mount fresh on client after hydration
    setIntroKey(Date.now());
  }, []);

  const handleIntroFinished = () => {
    setShowIntro(false);
    // Defer non-Hero sections slightly to let Hero mount first
    const defer = typeof window !== "undefined" && "requestIdleCallback" in window
      ? window.requestIdleCallback
      : (cb) => setTimeout(cb, 120);
    defer(() => setShowRest(true));
  };

  return (
    <main className="w-full overflow-x-hidden">
      {showIntro && <IntroOverlay key={introKey} onFinished={handleIntroFinished} />} 
      {!showIntro && (
        <>
          <Hero />
          {showRest && (
            <>
              <Story />
              <Renders />
              <Usp />
              <Vibe />
              <ComingSoon />
              <Community />
              <Faqs />
            </>
          )}
        </>
      )}
    </main>
  );
}
