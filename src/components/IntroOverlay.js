// file: components/IntroOverlay.js
"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroOverlay({ onFinished }) {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Optional: detect mobile for lower-res intro
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const videoSrc = isMobile ? "/assets/videos/introVertical.mp4" : "/assets/videos/intro.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsVideoLoaded(true);
    const handleEnd = () => onFinished?.();

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("ended", handleEnd);

    // Start loading and autoplay
    video.load();
    video.play().catch(() => {});

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("ended", handleEnd);
      video.pause();
    };
  }, [onFinished]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      <video
        ref={videoRef}
        src={videoSrc}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
