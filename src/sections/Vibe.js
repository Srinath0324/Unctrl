"use client";

import { useEffect, useRef, useState } from "react";
import CoinMan from "@/components/CoinMan";

function Row({ direction = "left" }) {
  const gifs = [
    "/assets/gifs/video1.gif",
    "/assets/gifs/video2.gif",
    "/assets/gifs/video3.gif",
  ];

  return (
    <div className="overflow-hidden w-full relative z-10">
      <div className={`marquee ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
        <div className="marquee__inner">
          {/* First set of gifs */}
          <div className="marquee__group">
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

          {/* Duplicate set for seamless loop */}
          <div className="marquee__group">
            {gifs.map((src, i) => (
              <img
                key={`dup-${i}`}
                src={src}
                alt={`Vibe GIF duplicate ${i + 1}`}
                className="vibe-gif rounded-md"
                draggable={false}
              />
            ))}
          </div>

          {/* Third set for extra smooth transition */}
          <div className="marquee__group">
            {gifs.map((src, i) => (
              <img
                key={`dup2-${i}`}
                src={src}
                alt={`Vibe GIF duplicate 2 ${i + 1}`}
                className="vibe-gif rounded-md"
                draggable={false}
              />
            ))}
          </div>
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
          /* Responsive sizing - bigger on smaller devices */
          width: 350px;
        }

        /* Responsive breakpoints */
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

        /* Smooth infinite scroll animations */
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
}

export default function Vibe() {
  return (
    <section
      id="vibe"
      className="relative min-h-[80vh] bg-black flex flex-col justify-center items-center pt-20 pb-5"
    >
      <div className="w-full max-w-[1600px] px-4 md:px-6 space-y-3 md:space-y-6 relative">
        {/* top: move right -> left */}
        <div className="relative">
          {/* CoinMan positioned so 50% is above the top scroll */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0 z-0">
            <CoinMan />
          </div>
          <Row direction="left" />
        </div>
        {/* bottom: move left -> right */}
        <Row direction="right" />
      </div>
    </section>
  );
}