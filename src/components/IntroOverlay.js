"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroOverlay({ onFinished }) {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => onFinished?.();
    const handleVideoError = () => onFinished?.();

    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("error", handleVideoError);

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("error", handleVideoError);
    };
  }, [onFinished]);

  // Determine video source based on screen width
  const isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;
  const videoSrc = isMobile
    ? "/assets/videos/introVertical.mp4"
    : "/assets/videos/intro.mp4";

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      {!isVideoLoaded && (
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      )}

      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
        muted
        playsInline
        autoPlay
        preload="auto"
        aria-hidden="true"
        onLoadedData={() => setIsVideoLoaded(true)}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}
