"use client";

import { useEffect, useRef, useState } from "react";

const ANIMATION_DURATION = 30; // seconds

function Row({ direction = "left" }) {
  const gifs = [
    "/assets/gifs/video1.gif",
    "/assets/gifs/video2.gif",
    "/assets/gifs/video3.gif",
  ];

  const groupRef = useRef(null); // reference to the first group (one set)
  const innerRef = useRef(null); // the flex wrapper that contains group1 + group2
  const [groupWidth, setGroupWidth] = useState(0);

  useEffect(() => {
    if (!groupRef.current) return;

    // Watch for size changes (handles loading images / responsive)
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.round(entry.contentRect.width);
        setGroupWidth(w);
      }
    });

    ro.observe(groupRef.current);
    return () => ro.disconnect();
  }, [groupRef]);

  // Inline CSS custom properties set here: --marquee-distance (px) and --marquee-duration (s)
  const cssVars = {
    ["--marquee-distance"]: `${groupWidth}px`,
    ["--marquee-duration"]: `${ANIMATION_DURATION}s`,
  };

  return (
    <div className="overflow-hidden w-full">
      <div
        className={`marquee ${direction === "left" ? "marquee-left" : "marquee-right"}`}
        style={cssVars}
      >
        {/* inner contains two identical groups side-by-side */}
        <div className="marquee__inner" ref={innerRef}>
          <div className="marquee__group" ref={groupRef}>
            {gifs.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Vibe GIF ${i + 1}`}
                className="vibe-gif w-[350px] h-auto"
                draggable={false}
              />
            ))}
          </div>

          {/* duplicate group for seamless looping */}
          <div className="marquee__group" aria-hidden="true">
            {gifs.map((src, i) => (
              <img
                key={`dup-${i}`}
                src={src}
                alt={`Vibe GIF duplicate ${i + 1}`}
                className="vibe-gif w-[350px] h-auto"
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* container */
        .marquee {
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        /* the moving element: it contains group + duplicate group */
        .marquee__inner {
          display: flex;
          align-items: center;
          gap: 7px;
          will-change: transform;
        }

        /* each group (one set of gifs) is a flex row */
        .marquee__group {
          display: flex;
          align-items: center;
          gap: 7px;
          /* keep it as natural width (auto) so ResizeObserver can measure it */
        }

        .vibe-gif {
          flex-shrink: 0;
          margin-right: 7px;
          user-select: none;
          -webkit-user-drag: none;
        }

        /* default transforms to avoid initial flicker:
           - left row starts at 0 (so it can animate to -distance)
           - right row starts at -distance (so it can animate to 0)
        */
        .marquee-left .marquee__inner {
          transform: translateX(0);
        }
        .marquee-right .marquee__inner {
          transform: translateX(calc(-1 * var(--marquee-distance, 0px)));
        }

        /* Keyframes use the measured pixel distance (CSS var --marquee-distance) */
        @keyframes scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-1 * var(--marquee-distance, 0px)));
          }
        }

        @keyframes scroll-right {
          from {
            transform: translateX(calc(-1 * var(--marquee-distance, 0px)));
          }
          to {
            transform: translateX(0);
          }
        }

        /* apply animations; duration comes from --marquee-duration */
        .marquee-left .marquee__inner {
          animation: scroll-left var(--marquee-duration, ${ANIMATION_DURATION}s) linear infinite;
        }

        .marquee-right .marquee__inner {
          animation: scroll-right var(--marquee-duration, ${ANIMATION_DURATION}s) linear infinite;
        }

        /* small accessibility / performance helpers */
        .marquee__group img {
          display: block;
        }
      `}</style>
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
        {/* top: move right -> left */}
        <Row direction="left" />
        {/* bottom: move left -> right */}
        <Row direction="right" />
      </div>
    </section>
  );
}