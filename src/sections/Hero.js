
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Video with fallback */}
      <video
        className="absolute inset-0 w-full h-full "
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/rage-apng.png"
      >
        {/* Modern browsers pick WebM first */}
        <source src="/assets/videos/rage.webm" type="video/webm" />
        {/* Universal fallback */}
        <source src="/assets/videos/rage.mp4" type="video/mp4" />
        {/* Final fallback image */}
       
      </video> 

      {/* Foreground content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* Add hero text / buttons here */}
      </div>
    </section>
  );
}
