"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroOverlay({ onFinished }) {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Determine correct video src based on screen width
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const videoSrc = isMobile ? "/assets/videos/introVertical.mp4" : "/assets/videos/intro.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const finishOverlay = () => {
      setIsFadingOut(true);
      setTimeout(() => onFinished?.(), 800); // match fade duration
    };

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      video.play().catch(() => finishOverlay());
    };

    const handleVideoEnd = () => finishOverlay();
    const handleVideoError = () => finishOverlay();

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("error", handleVideoError);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("error", handleVideoError);
      video.pause();
    };
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-800 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Spinner until video is ready */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Video element — starts loading immediately */}
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
