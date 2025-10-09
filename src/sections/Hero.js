"use client";

import { useEffect, useRef, useState } from "react";
import UnCtrlButton from "@/components/UnCtrlButton";

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(max-width: 768px)");
      const handle = () => setIsMobile(mq.matches);
      handle();
      mq.addEventListener?.("change", handle);
      return () => mq.removeEventListener?.("change", handle);
    }
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { root: null, threshold: 0.15 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Autoplay when in view
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
      // Warm critical 3D assets once video can play
      const onCanPlay = async () => {
        try {
          const mod = await import("@/components/ControllerModel/preloadAssets");
          mod.preloadControllerAssets?.();
        } catch {}
      };
      video.addEventListener("canplay", onCanPlay, { once: true });
    } else {
      video.pause();
    }
  }, [isInView]);

  const desktopSrc = "/assets/videos/mouth.mp4";
  const mobileSrc = "/assets/videos/mm.mp4";

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center bg-black"
    >
      {mounted && (
        <div className="relative w-full h-[100vh] overflow-hidden">
          <video
            ref={videoRef}
            className={
              isMobile
                ? "w-full h-full object-cover object-bottom"
                : "absolute top-[-80px] left-0 w-full h-[calc(100vh+80px)] object-cover"
            }
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            // Start buffering immediately so it's ready when intro ends
            src={isMobile ? mobileSrc : desktopSrc}
          />
        </div>
      )}

      {/* Optional Button */}
      {/* <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <UnCtrlButton>ORDER NOW</UnCtrlButton>
      </div> */}
    </section>
  );
}
