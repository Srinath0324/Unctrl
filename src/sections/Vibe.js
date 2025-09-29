"use client";

import CoinMan from "@/components/CoinMan";
import React from "react";

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
        {/* Top Row: left -> right */}
        <div className="relative">
          {/* CoinMan with hover detection */}
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 ">
            <CoinMan />
          </div>

          {/* Marquee scroll */}
          <Row direction="left" />
        </div>

        {/* Bottom Row: right -> left */}
        <Row direction="right" />
      </div>
    </section>
  );
}
