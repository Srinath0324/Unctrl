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

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
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
        onCanPlayThrough={() => setIsVideoLoaded(true)}
      >
        {/* Desktop video */}
        <source src="./assets/videos/intro.mp4" type="video/mp4" media="(min-width: 769px)" />
        {/* Mobile video */}
        <source src="./assets/videos/introVertical.mp4" type="video/mp4" media="(max-width: 768px)" />
      </video>
    </div>
  );
}
