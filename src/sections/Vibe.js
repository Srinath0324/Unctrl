// file: src/sections/Vibe.js
"use client";

import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CoinMan from "../components/CoinMan";

const videos = [
  "/assets/vibe/1.mp4",
  "/assets/vibe/2.mp4",
  "/assets/vibe/3.mp4",
  "/assets/vibe/4.mp4",
  "/assets/vibe/5.mp4",
  "/assets/vibe/6.mp4",
  "/assets/vibe/7.mp4",
  "/assets/vibe/8.mp4",
];

function VideoCard({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return;
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.01 } // play when 1% visible
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <div className="video-card">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="video-el"
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
        speed={300}
        onSwiper={(s) => onReady?.(s)}
        className="vibe-swiper"
      >
        {videos.map((src, i) => (
          <SwiperSlide key={i} className="vibe-slide">
            <VideoCard src={src} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default function Vibe() {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const runningRef = useRef(false);

  // Animation settings
  const stepSlides = 1;
  const slideDurationMs = 300;
  const pauseBetweenRowsMs = 300;
  const pauseBetweenCyclesMs = 1000;

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const waitForTransition = (swiper) =>
      new Promise((resolve) => {
        const handler = () => {
          swiper.off("transitionEnd", handler);
          resolve();
        };
        swiper.on("transitionEnd", handler);
      });

    const moveSteps = async (swiper, direction = "forward", steps = 3) => {
      if (!swiper) return;
      for (let i = 0; i < steps && !cancelled; i++) {
        if (direction === "forward") swiper.slideNext(slideDurationMs, true);
        else swiper.slidePrev(slideDurationMs, true);
        await waitForTransition(swiper);
      }
    };

    const run = async () => {
      if (runningRef.current) return;
      runningRef.current = true;

      while (!cancelled) {
        if (topRef.current)
          await moveSteps(topRef.current, "forward", stepSlides);
        await sleep(pauseBetweenRowsMs);
        if (bottomRef.current)
          await moveSteps(bottomRef.current, "backward", stepSlides);
        await sleep(pauseBetweenCyclesMs);
      }
    };

    run();
    return () => {
      cancelled = true;
      runningRef.current = false;
    };
  }, []);

  return (
    <section className="relative min-h-[100vh] bg-black flex flex-col justify-center items-center pt-20 pb-5">
      <div className="w-full max-w-[1600px] px-4 md:px-6 relative flex flex-col items-center space-y-4 md:space-y-6">
        {/* Top row */}
        <Row
          onReady={(s) => {
            topRef.current = s;
          }}
        />

        {/* Bottom row with horizontal offset */}
        <div className="bottom-row-offset w-full z-30">
          <Row
            onReady={(s) => {
              bottomRef.current = s;
            }}
          />
        </div>

        {/* CoinMan overlay */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-15 pointer-events-none">
          <div className="pointer-events-auto">
            <CoinMan />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .vibe-swiper {
          overflow: visible;
          width: 100%;
        }
        .vibe-slide {
          width: auto;
        }
        .video-card {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
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
          will-change: transform;
          transform: translateZ(0);
        }
        .bottom-row-offset {
          transform: translateX(-112px);
        }
        @media (min-width: 480px) {
          .bottom-row-offset {
            transform: translateX(-118px);
          }
          .video-card {
            width: 320px;
            height: 200px;
          }
        }
        @media (min-width: 640px) {
          .bottom-row-offset {
            transform: translateX(-124px);
          }
          .video-card {
            width: 360px;
            height: 220px;
          }
        }
        @media (min-width: 768px) {
          .bottom-row-offset {
            transform: translateX(-132px);
          }
          .video-card {
            width: 420px;
            height: 260px;
          }
        }
        @media (min-width: 1024px) {
          .bottom-row-offset {
            transform: translateX(-140px);
          }
          .video-card {
            width: 480px;
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
}
