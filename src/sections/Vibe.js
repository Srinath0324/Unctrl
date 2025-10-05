// file: src/sections/Vibe.js
"use client";

import React from "react";
import CoinMan from "../components/CoinMan";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const videos = [
  "/assets/videos/1.mp4",
  "/assets/videos/2.mp4",
  "/assets/videos/3.mp4",
  "/assets/videos/4.mp4",
  "/assets/videos/5.mp4",
  "/assets/videos/6.mp4",
  "/assets/videos/7.mp4",
  "/assets/videos/8.mp4",
];

function VideoCard({ src }) {
  return (
    <div className="video-card">
      <video
        src={src}
        className="video-el"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        draggable={false}
      />
    </div>
  );
}

function Row({ onReady, space = 30 }) {
  return (
    <div className="w-full relative z-10">
      <Swiper
        loop
        slidesPerView="auto"
        spaceBetween={space}
        allowTouchMove={false}
        speed={0}
        onSwiper={(instance) => onReady?.(instance)}
        className="vibe-swiper"
      >
        {videos.map((src, i) => (
          <SwiperSlide key={`slide-${i}`} className="vibe-slide">
            <VideoCard src={src} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default function Vibe() {
  const topRef = React.useRef(null);
  const bottomRef = React.useRef(null);
  const runningRef = React.useRef(false);

  // Tunable controls
  const stepSlides = 3; // how many cards per pulse
  const slideDurationMs = 50; // duration per single-slide move
  const pauseBetweenRowsMs = 300; // delay after top finishes before bottom starts
  const pauseBetweenCyclesMs = 1000; // delay after bottom finishes before next cycle

  React.useEffect(() => {
    const waitForTransition = (swiper) =>
      new Promise((resolve) => {
        const handler = () => {
          swiper.off('transitionEnd', handler);
          resolve();
        };
        swiper.on('transitionEnd', handler);
      });

    const moveSteps = async (swiper, direction = "forward", steps = 3, perSlideMs = 50) => {
      if (!swiper) return;
      for (let i = 0; i < steps; i++) {
        if (direction === "forward") {
          swiper.slideNext(perSlideMs, false);
        } else {
          swiper.slidePrev(perSlideMs, false);
        }
        await waitForTransition(swiper);
      }
    };

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
        if (runningRef.current) return;
        runningRef.current = true;

        while (runningRef.current) {
          // Top row: move forward by stepSlides
          if (topRef.current) {
            await moveSteps(topRef.current, "forward", stepSlides, slideDurationMs);
          }

          await sleep(pauseBetweenRowsMs);

          // Bottom row: move backward by stepSlides
          if (bottomRef.current) {
            await moveSteps(bottomRef.current, "backward", stepSlides, slideDurationMs);
          }

          await sleep(pauseBetweenCyclesMs);
        }
    };

    run();
    return () => {
      runningRef.current = false;
    };
  }, []);
  return (
    <section
      id="vibe"
      className="relative min-h-[100vh] bg-black flex flex-col justify-center items-center pt-20 pb-5"
    >
      <div className="w-full max-w-[1600px] px-4 md:px-6 relative flex flex-col items-center space-y-4 md:space-y-6">
        {/* Top Row */}
        <Row onReady={(s) => (topRef.current = s)} />

        {/* Bottom Row with slight horizontal offset */}
        <div className="bottom-row-offset w-full">
          <Row onReady={(s) => (bottomRef.current = s)} />
        </div>


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

      {/* global styles for Swiper-based vibe rows */
      }
      <style jsx global>{`
        .vibe-swiper {
          overflow: visible;
          width: 100%;
        }

        .vibe-slide {
          width: auto; /* allow content-sized slides */
        }

        .video-card {
          position: relative;
          overflow: hidden;
          border-radius: 24px; /* rounded like Alienkind cards */
          width: 280px;
          height: 180px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          background: #000;
        }

        .video-el {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Bottom row offset for better column separation */
        .bottom-row-offset { transform: translateX(-112px); }
        @media (min-width: 480px) { .bottom-row-offset { transform: translateX(-118px); } }
        @media (min-width: 640px) { .bottom-row-offset { transform: translateX(-124px); } }
        @media (min-width: 768px) { .bottom-row-offset { transform: translateX(-132px); } }
        @media (min-width: 1024px) { .bottom-row-offset { transform: translateX(-140px); } }

        @media (min-width: 480px) {
          .video-card { width: 320px; height: 200px; }
        }
        @media (min-width: 640px) {
          .video-card { width: 360px; height: 220px; }
        }
        @media (min-width: 768px) {
          .video-card { width: 420px; height: 260px; }
        }
        @media (min-width: 1024px) {
          .video-card { width: 480px; height: 300px; }
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .vibe-swiper .swiper-wrapper {
            transition-duration: 0ms !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
