"use client";

export default function Renders() {
  return (
    <section
      id="renders"
      className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center"
    >
      <video
				className="absolute inset-0 w-full h-full object-contain"
				autoPlay
				loop
				muted
				playsInline
				preload="auto"
			>
				<source src="/assets/videos/controller.mp4" type="video/mp4" />
				{/* Optional fallback text */}
				Your browser does not support the video tag.
			</video>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
        <span className="text-white text-[clamp(20px,3.5vw,42px)] font-extrabold tracking-wider drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]">
          Level up your gaming
        </span>
      </div>
    </section>
  );
}
