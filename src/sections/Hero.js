import UnCtrlButton from "@/components/UnCtrlButton";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden flex flex-col items-center justify-center bg-black"
    >
      {/* Desktop video (cropped top) */}
      <div className="hidden md:block relative w-full h-[100vh] overflow-hidden">
        <video
          className="absolute top-[-80px] left-0 w-full h-[calc(100vh+80px)] object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/assets/videos/mouth.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Mobile video (normal) */}
      <video
        className="w-full h-auto block md:hidden"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/rage-apng.png"
      >
        <source src="/assets/videos/mm.mp4" type="video/mp4" />
      </video>

      {/* Optional Button */}
      {/* <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <UnCtrlButton>ORDER NOW</UnCtrlButton>
      </div> */}
    </section>
  );
}
