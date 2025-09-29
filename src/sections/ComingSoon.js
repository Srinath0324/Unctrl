"use client";

export default function ComingSoon() {
  return (
    <section
      id="coming-soon"
      className="relative min-h-[100svh] bg-black flex flex-col items-center justify-center text-white"
    >
      <h1 className="text-4xl font-bold mb-15 text-center pt-10">
        <span>Unleashing</span>
        <span className="text-orange-500"> soon</span>
      </h1>

      <div className="w-full max-w-[1200px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10">
        <video
          src="/assets/videos/keyboard.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="aspect-[4/2] object-cover w-full h-auto"
        />
        <video
          src="/assets/videos/mouse.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="aspect-[4/2] object-cover w-full h-auto"
        />
      </div>
    </section>
  );
}
