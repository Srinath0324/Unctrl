"use client";

const ANIMATION_DURATION = 30; // doubled (half the speed)

function Row({ direction }) {
  const gifs = [
    "/assets/gifs/video1.gif",
    "/assets/gifs/video2.gif",
    "/assets/gifs/video3.gif",
  ];

  return (
    <div className="overflow-hidden w-full">
      <div
        className={`flex ${
          direction === "left" ? "marquee-left" : "marquee-right"
        }`}
      >
        {/* Original set */}
        {gifs.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Vibe GIF ${i + 1}`}
            className="vibe-gif w-[350px] h-auto"
          />
        ))}
        {/* Duplicate set for seamless loop */}
        {gifs.map((src, i) => (
          <img
            key={`dup-${i}`}
            src={src}
            alt={`Vibe GIF duplicate ${i + 1}`}
            className="vibe-gif w-[300px] h-auto"
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

      {/* Inline CSS for quick testing */}
      <style jsx global>{`
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

        .marquee-left {
          animation: marquee-left ${ANIMATION_DURATION}s linear infinite;
        }

        .marquee-right {
          animation: marquee-right ${ANIMATION_DURATION}s linear infinite;
        }

        .vibe-gif {
          flex-shrink: 0;
          margin-right: 7px; /* tiny spacing */
        }
      `}</style>
    </section>
  );
}
