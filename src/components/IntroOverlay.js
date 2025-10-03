"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroOverlay({ onFinished }) {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    // Decide mobile vs desktop after client-side render
    const isMobile = window.innerWidth <= 768;
    setVideoSrc(
      isMobile
        ? "/assets/videos/Introvertical.mp4"
        : "/assets/videos/intro.mp4"
    );
  }, []);

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
      {/* Loader (centered) */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="w-14 h-14 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {videoSrc && (
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          muted
          playsInline
          disableRemotePlayback
          autoPlay
          preload="auto"
          poster="/assets/videos/poster.jpg"
          aria-hidden="true"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
