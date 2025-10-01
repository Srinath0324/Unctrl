"use client";

import React, { useState, useRef } from "react";
import CoinMan from "../components/CoinMan";


const Row = ({ direction = "left" }) => {
  const videos = [
    "/assets/videos/video1.mp4",
    "/assets/videos/video2.mp4",
    "/assets/videos/video3.mp4",
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
                {videos.map((src, i) => (
                  <video
                    key={i}
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

        .vibe-video {
          flex-shrink: 0;
          user-select: none;
          -webkit-user-drag: none;
          height: auto;
          object-fit: cover;
          width: 350px;
        }

        @media (min-width: 480px) {
          .vibe-video {
            width: 400px;
          }
        }

        @media (min-width: 640px) {
          .vibe-video {
            width: 350px;
          }
        }

        @media (min-width: 768px) {
          .vibe-video {
            width: 350px;
          }
        }

        @media (min-width: 1024px) {
          .vibe-video {
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
