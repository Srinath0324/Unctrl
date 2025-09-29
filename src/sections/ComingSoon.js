"use client";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function ComingSoon() {
  const y = useMotionValue(0); // vertical position
  const x = useMotionValue(0); // horizontal position
  const rotation = useMotionValue(0); // rotation in degrees

  const springY = useSpring(y, { stiffness: 120, damping: 20 });
  const springX = useSpring(x, { stiffness: 120, damping: 20 });
  const springRotation = useSpring(rotation, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const community = document.querySelector("#community");
    if (!community) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate fall to bottom and rotate 1.5 turns (540deg)
            rotation.set(450); // rotate
            y.set(window.innerHeight * 1.2); 
          } else {
            // Reset position next to 2nd video
            rotation.set(0);
            y.set(0);
            x.set(0);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(community);
    return () => observer.disconnect();
  }, [y, x, rotation]);

  return (
    <section
      id="coming-soon"
      className="relative min-h-[100svh] bg-black flex flex-col items-center justify-center text-white px-5"
    >
      <div className="w-full max-w-[1100px] mx-50">
        <h1 className="text-4xl font-bold mb-10 text-center pt-10">
          <span>Unleashing</span>
          <span className="text-orange-500"> soon</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center m-10 relative">
          {/* First video with yellow shadow */}
          <video
            src="/assets/videos/keyboard.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover 
                       aspect-square 2xl:aspect-[4/2] 
                       shadow-[6px_6px_0px_0px_rgba(255,255,0,1)]"
          />

          {/* Second video with violet shadow */}
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              src="/assets/videos/mouse.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover 
                         aspect-square 2xl:aspect-[4/2] 
                         shadow-[6px_6px_0px_0px_rgba(138,43,226,1)]"
            />
</div>
            {/* Violet pixel motion */}
            <motion.div
              className="absolute top-1/2 z-20"
              style={{
                y: springY,             // vertical motion
                x: springX,             // horizontal motion
                rotate: springRotation,  // rotation
                left: "60%",             // reference center
               // start centered
              }}
            >
              <Image
                src="/images/violetPixel.png"
                width={150}
                height={150}
                alt="violet pixel"
              />
            </motion.div>
          
        </div>
      </div>
    </section>
  );
}
