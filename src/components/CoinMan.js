"use client";

import React, { useState, useRef, useEffect } from "react";

const CoinMan = () => {
  const [showGlitch, setShowGlitch] = useState(false);
  const intervalRef = useRef(null);

  // Preload images
  useEffect(() => {
    const images = ["/images/coinman.png", "/images/glichman.png"];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const startFlipping = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setShowGlitch((prev) => !prev);
    }, 50);
  };

  const stopFlipping = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setShowGlitch(false);
  };

  return (
    <div
      className="relative flex items-center justify-center coinman-hover"
      style={{ width: "50vw", height: "50vh" }}
    >
      {/* Stack two <img> tags */}
      <img
        src="/images/coinman.png"
        alt="CoinMan"
        style={{
          width: "300px",
          height: "300px",
          position: "absolute",
          transition: "opacity 0.05s",
          opacity: showGlitch ? 0 : 1,
          pointerEvents: "none",
        }}
        draggable={false}
      />
      <img
        src="/images/glichman.png"
        alt="CoinMan Glitch"
        style={{
          width: "300px",
          height: "300px",
          position: "absolute",
          transition: "opacity 0.05s",
          opacity: showGlitch ? 1 : 0,
          pointerEvents: "none",
        }}
        draggable={false}
      />

      {/* Hover layer */}
      <div
        className="absolute inset-0 z-50"
        onMouseEnter={startFlipping}
        onMouseLeave={stopFlipping}
      />
    </div>
  );
};

export default CoinMan;
