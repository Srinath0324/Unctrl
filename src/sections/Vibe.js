"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const VIDEO_SOURCES = [
  "/assets/videos/video1.mp4",
  "/assets/videos/video2.mp4",
  "/assets/videos/video3.mp4",
];

const SCROLL_SPEED_PX_PER_SEC = 60; // tune for desired speed
const REPEATS = 4; // render the list multiple times for robust seamless looping

function MarqueeRow({ direction }) {
  const trackRef = useRef(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Duplicate the list so that we can create a seamless loop
  const items = useMemo(
    () => Array.from({ length: REPEATS }).flatMap(() => VIDEO_SOURCES),
    []
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setIsReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener?.("change", update);
    return () => mediaQuery.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return; // respect user preference
    const track = trackRef.current;
    if (!track) return;

    let animationFrameId = 0;
    let lastTimestamp = 0;
    let offset = 0; // current translateX offset in px
    let initialized = false; // ensure we set a proper starting offset once widths are known

    const getSetWidth = () => {
      const totalWidth = track.scrollWidth;
      // We rendered REPEATS sets; one set width is total / REPEATS
      return totalWidth > 0 ? totalWidth / REPEATS : 0;
    };

    let setWidth = getSetWidth();

    const onResize = () => {
      setWidth = getSetWidth();
      // Keep offset within valid range after resize
      if (direction === "right") {
        if (offset > 0) offset -= setWidth * Math.ceil(offset / setWidth);
        if (offset < -setWidth) offset += setWidth * Math.ceil(Math.abs(offset) / setWidth);
      } else {
        if (offset < -setWidth) offset += setWidth * Math.ceil(Math.abs(offset) / setWidth);
        if (offset > 0) offset -= setWidth * Math.ceil(offset / setWidth);
      }
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(track);

    const step = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaMs = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // If widths are not known yet (e.g. before videos paint), try again next frame
      if (setWidth <= 0) {
        animationFrameId = requestAnimationFrame(step);
        return;
      }

      if (!initialized) {
        // For rightward motion, start at -setWidth so content fills from the start with no blank
        offset = direction === "right" ? -setWidth : 0;
        initialized = true;
      }

      const deltaPx = (SCROLL_SPEED_PX_PER_SEC * deltaMs) / 1000;

      if (direction === "left") {
        offset -= deltaPx;
        // Wrap when we have scrolled left by at least one set width
        if (offset <= -setWidth) {
          offset += setWidth;
        }
      } else {
        offset += deltaPx;
        // Keep offset within [-setWidth, 0) to avoid revealing blank space on the left
        if (offset >= 0) {
          offset -= setWidth;
        }
      }

      track.style.transform = `translate3d(${offset}px, 0, 0)`;
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      track.style.transform = "";
    };
  }, [direction, isReducedMotion]);

  return (
    <div className="marquee-wrap">
      <div ref={trackRef} className="marquee-track">
        {items.map((src, i) => (
          <video
            key={i}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="vibe-gif flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

export default function Vibe() {
  return (
    <section
      id="vibe"
      className="relative min-h-[80vh] bg-black flex flex-col justify-center items-center pt-19 pb-5"
    >
      <div className="w-full max-w-[1600px] px-6 space-y-2">
        <MarqueeRow direction="left" />
        <MarqueeRow direction="right" />
      </div>

      <style jsx global>{`
        .marquee-wrap {
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .marquee-track {
          display: flex;
          gap: 15px;
          width: max-content;
          will-change: transform;
        }

        .vibe-gif {
          width: 420px;
          height: auto;
          object-fit: cover;
        }

        @media (max-width: 1024px) {
          .vibe-gif {
            width: 180px;
          }
        }

        @media (max-width: 768px) {
          .vibe-gif {
            width: 140px;
          }
        }

        @media (max-width: 480px) {
          .vibe-gif {
            width: 100px;
          }
        }
      `}</style>
    </section>
  );
}
