import UnCtrlButton from "@/components/UnCtrlButton";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-x-hidden flex flex-col items-center justify-center bg-black"
    >
      {/* Desktop video */}
      <video
        className="w-full h-auto hidden md:block"
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
        className="w-full h-auto block md:hidden"
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

<div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
  <UnCtrlButton>Order Now</UnCtrlButton>
</div>
    </section>
  );
}
