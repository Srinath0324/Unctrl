"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroOverlay({ onFinished }) {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 1️⃣ Pick correct video based on screen width
    const isMobile = window.innerWidth <= 768;
    setVideoSrc(isMobile ? "/assets/videos/Introvertical.mp4" : "/assets/videos/intro.mp4");
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 2️⃣ Disable scroll while intro plays
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 3️⃣ Handle events
    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {
          console.warn("Autoplay failed, fallback after 3s");
          triggerFinishWithFade();
        });
      }
    };

    const handleVideoEnd = () => {
      triggerFinishWithFade();
    };

    const handleVideoError = () => {
      console.error("Video failed to load");
      triggerFinishWithFade();
    };

    const triggerFinishWithFade = () => {
      setIsFadingOut(true);
      setTimeout(() => {
        onFinished?.();
      }, 800); // fade duration match
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("error", handleVideoError);

    return () => {
      document.body.style.overflow = originalOverflow;
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("error", handleVideoError);
      video.pause();
    };
  }, [onFinished, videoSrc]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-800 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Loading Spinner */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Video Element */}
      {videoSrc && (
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
      )}
    </div>
  );
}
