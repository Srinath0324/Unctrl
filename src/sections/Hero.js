export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Desktop video */}
      <video
        className="absolute inset-0 w-full h-full hidden md:block"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/rage-apng.png"
      >
        <source src="/assets/videos/rage.webm" type="video/webm" />
        <source src="/assets/videos/rage.mp4" type="video/mp4" />
      </video>

      {/* Mobile video */}
      <video
        className="absolute inset-0 w-full h-full block md:hidden"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/rage-apng.png"
      >
        <source src="/assets/videos/verticalHero.webm" type="video/webm" />
        <source src="/assets/videos/mouse.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* Add hero text / buttons here */}
      </div>
    </section>
  );
}
