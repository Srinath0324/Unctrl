"use client";

export default function Renders() {
  return (
    <section
      id="renders"
      className="relative w-screen min-h-screen overflow-x-hidden bg-black flex items-center justify-center"
      style={{ margin: 0, padding: 0 }}
    >
      {/* Background Video */}
      <video
        style={{ width: "100vw", height: "auto", display: "block" }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/assets/videos/controller.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Text */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
        <span className="text-white text-[clamp(20px,3.5vw,42px)] font-extrabold tracking-wider drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]">
          Level up your gaming
        </span>
      </div>
    </section>
  );
}
