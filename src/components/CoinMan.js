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
    <div className="relative flex items-center justify-center" style={{ width: "50vw", height: "50vh" }}>
      {/* CoinMan image visually behind marquee */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src={showGlitch ? "/images/glichman.png" : "/images/coinman.png"}
          alt="CoinMan"
          width={300}
          height={300}
          draggable={false}
        />
      </div>

      {/* Hover layer on top of everything (invisible) */}
      <div
        className="absolute inset-0 cursor-pointer z-50"
        onMouseEnter={startFlipping}
        onMouseLeave={stopFlipping}
      />
    </div>
  );
};

export default CoinMan;
