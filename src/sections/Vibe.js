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
      className="relative flex items-center justify-center"
      style={{ width: "50vw", height: "50vh" }}
    >
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

      {/* Invisible hover layer on top */}
      <div
        className="absolute inset-0 cursor-pointer z-50"
        onMouseEnter={startFlipping}
        onMouseLeave={stopFlipping}
      />
    </div>
  );
};

const Row = ({ direction = "left" }) => {
  const gifs = [
    "/assets/gifs/video1.gif",
    "/assets/gifs/video2.gif",
    "/assets/gifs/video3.gif",
  ];

  return (
    <div className="overflow-hidden w-full relative z-10">
      <div
        className={`marquee ${
          direction === "left" ? "marquee-left" : "marquee-right"
        }`}
      >
        <div className="marquee__inner">
          {Array(3)
            .fill(0)
            .map((_, setIndex) => (
              <div className="marquee__group" key={setIndex}>
                {gifs.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Vibe GIF ${i + 1}`}
                    className="vibe-gif rounded-md"
                    draggable={false}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>

      <style jsx global>{`
        .marquee {
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .marquee__inner {
          display: flex;
          align-items: center;
          gap: 1rem;
          will-change: transform;
          width: fit-content;
        }

        .marquee__group {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }

        .vibe-gif {
          flex-shrink: 0;
          user-select: none;
          -webkit-user-drag: none;
          height: auto;
          object-fit: cover;
          width: 350px;
        }

        @media (min-width: 480px) {
          .vibe-gif {
            width: 400px;
          }
        }

        @media (min-width: 640px) {
          .vibe-gif {
            width: 350px;
          }
        }

        @media (min-width: 768px) {
          .vibe-gif {
            width: 350px;
          }
        }

        @media (min-width: 1024px) {
          .vibe-gif {
            width: 380px;
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(calc(-100% / 3));
          }
          100% {
            transform: translateX(0);
          }
        }

        .marquee-left .marquee__inner {
          animation: scroll-left 20s linear infinite;
        }

        .marquee-right .marquee__inner {
          animation: scroll-right 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default function Vibe() {
  return (
    <section
      id="vibe"
      className="relative min-h-[80vh] bg-black flex flex-col justify-center items-center pt-20 pb-5"
    >
      <div className="w-full max-w-[1600px] px-4 md:px-6 space-y-3 md:space-y-6 relative">
        {/* Top Row */}
        <div className="relative">
          {/* CoinMan hoverable but visually behind marquee */}
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2">
            <CoinMan />
          </div>

          {/* Marquee scrolling */}
          <Row direction="left" />
        </div>

        {/* Bottom Row */}
        <Row direction="right" />
      </div>
    </section>
  );
}
