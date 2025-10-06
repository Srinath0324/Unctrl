"use client";

export default function Story() {
  return (
    <section
      id="story"
      className="relative w-screen min-h-[100svh] bg-black overflow-x-hidden flex items-center justify-center"
      style={{ margin: 0, padding: 0 }}
    >
 {/* Desktop video */}
      <video
        className="w-full h-auto hidden md:block"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src="/assets/videos/rage-story.mp4" type="video/mp4" />
      </video>
      {/* Mobile video */}
      <video
        className="w-full h-auto block md:hidden"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/rage-apng.png"
      >
        <source src="/assets/videos/s2.mp4" type="video/mp4" />
      </video>
    </section>
  );
}