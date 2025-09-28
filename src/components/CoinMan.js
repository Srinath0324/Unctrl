"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

const CoinMan = () => {
  const [showGlitch, setShowGlitch] = useState(false);
  const intervalRef = useRef(null);

  // Start fast glitch
  const startFlipping = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setShowGlitch((prev) => !prev);
    }, 50); // super fast
  };

  // Stop glitch
  const stopFlipping = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setShowGlitch(false);
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        width: 400,      // BIG hover width
        height: 400,     // BIG hover height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onMouseEnter={startFlipping}
      onMouseLeave={stopFlipping}
    >
      <Image
        src={showGlitch ? "/images/glichman.png" : "/images/coinman.png"}
        alt="CoinMan"
        width={500}
        height={500}
      />     
    </div>
  );
};

export default CoinMan;
