"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroOverlay({ onFinished }) {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Detect mobile (pick correct video)
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;
  const videoSrc = isMobile
    ? "/assets/videos/Introvertical.mp4"
    : "/assets/videos/intro.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force mute for autoplay on iOS/Android
    video.muted = true;

    // Try autoplay (some mobile browsers block otherwise)
    video.play().catch(() => {
      // if autoplay fails, skip intro
      onFinished?.();
    });

    const handleVideoEnd = () => onFinished?.();
    const handleVideoError = () => onFinished?.();

    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("error", handleVideoError);

    // Timeout fallback: skip if video stuck
    const timeout = setTimeout(() => {
      if (!isVideoLoaded) {
        onFinished?.();
      }
    }, 6000); // max wait 6s

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("error", handleVideoError);
      clearTimeout(timeout);
    };
  }, [isVideoLoaded, onFinished]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      {/* Loader (centered) */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="w-14 h-14 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Intro video */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
        poster="/assets/videos/intro-poster.jpg" // fallback image
        muted
        playsInline
        autoPlay
        preload="auto"
        aria-hidden="true"
        onCanPlayThrough={() => setIsVideoLoaded(true)}
        onLoadedData={() => setIsVideoLoaded(true)} // keep as backup
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}
