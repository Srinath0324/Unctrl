"use client";

const ANIMATION_DURATION = 30; // seconds

function Row({ direction }) {
  const videos = [
    "/assets/videos/video1.mp4",
    "/assets/videos/video2.mp4",
    "/assets/videos/video3.mp4",
  ];

  return (
    <div className="marquee-wrap">
      <div
        className={`marquee-track ${
          direction === "left" ? "marquee-left" : "marquee-right"
        }`}
      >
        {/* Track 1 */}
        {videos.map((src, i) => (
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
        {/* Track 2 (duplicate for seamless loop) */}
        {videos.map((src, i) => (
          <video
            key={`dup-${i}`}
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
        <Row direction="left" />
        <Row direction="right" />
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
        }

        .marquee-left {
          animation: marquee-left ${ANIMATION_DURATION}s linear infinite;
        }

        .marquee-right {
          animation: marquee-right ${ANIMATION_DURATION}s linear infinite;
        }

        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
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

        @media (prefers-reduced-motion: reduce) {
          .marquee-left,
          .marquee-right {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
