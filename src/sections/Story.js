"use client";

export default function Story() {
  return (
    <section
      id="story"
      className="relative w-screen min-h-[100svh] bg-black overflow-x-hidden flex items-center justify-center"
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
        <source src="/assets/videos/rage-story.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}
