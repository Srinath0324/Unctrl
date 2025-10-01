"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

const CoinMan = () => {
  const [showGlitch, setShowGlitch] = useState(false);
  const intervalRef = useRef(null);

  const startFlipping = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setShowGlitch((prev) => !prev);
    }, 50); // fast flicker
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
      {/* Preload both images, stack them */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/images/coinman.png"
          alt="CoinMan Normal"
          width={300}
          height={300}
          draggable={false}
          className={`transition-opacity duration-75 ${
            showGlitch ? "opacity-0" : "opacity-100"
          }`}
        />
        <Image
          src="/images/glichman.png"
          alt="CoinMan Glitch"
          width={300}
          height={300}
          draggable={false}
          className={`absolute transition-opacity duration-75 ${
            showGlitch ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Hover layer on top */}
      <div
        className="absolute inset-0 coinman-hover z-50"
        onMouseEnter={startFlipping}
        onMouseLeave={stopFlipping}
      />
    </div>
  );
};

export default CoinMan;
