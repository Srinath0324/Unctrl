// file: src/sections/Vibe.js
"use client";

import React from "react";
import CoinMan from "../components/CoinMan";

const videos = [
  "/assets/videos/video1.mp4",
  "/assets/videos/video2.mp4",
  "/assets/videos/video3.mp4",
];

const Row = ({ direction = "left" }) => {
  return (
    <div className="overflow-hidden w-full relative z-10">
      <div className={`marquee ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
        <div className="marquee__inner">
          {Array.from({ length: 3 }).map((_, groupIdx) => (
            <div className="marquee__group" key={`group-${groupIdx}`}>
              {videos.map((src, i) => (
                <video
                  key={`video-${groupIdx}-${i}`}
                  src={src}
                  className="vibe-video rounded-md"
                  autoPlay
                  loop
                  muted
                  playsInline
                  draggable={false}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Vibe() {
  return (
    <section
      id="vibe"
      className="relative min-h-[100vh] bg-black flex flex-col justify-center items-center pt-20 pb-5"
    >
      <div className="w-full max-w-[1600px] px-4 md:px-6 relative flex flex-col items-center space-y-4 md:space-y-6">
        {/* Top Row */}
        <Row direction="left" />

        {/* Bottom Row */}
        <Row direction="right" />


        {/* CoinMan overlay: visually between rows but does NOT change spacing */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
          aria-hidden={false}
        >
          {/* re-enable pointer events only for CoinMan so hover/click still work */}
          <div className="pointer-events-auto">
            <CoinMan />
          </div>
        </div>
      </div>

      {/* global styles injected once (keeps Row simple and avoids duplicate style injection) */}
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

        /* Twice the original size (as you requested earlier) */
        .vibe-video {
          flex-shrink: 0;
          user-select: none;
          -webkit-user-drag: none;
          height: auto;
          object-fit: cover;
          width: 700px;
        }

        @media (min-width: 480px) {
          .vibe-video {
            width: 800px;
          }
        }

        @media (min-width: 640px) {
          .vibe-video {
            width: 700px;
          }
        }

        @media (min-width: 768px) {
          .vibe-video {
            width: 700px;
          }
        }

        @media (min-width: 1024px) {
          .vibe-video {
            width: 760px;
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
    </section>
  );
}
