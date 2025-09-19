"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const StickyImage = () => {
  const container = useRef(null);

  useGSAP(() => {
    const image = document.querySelector(".animated-image");
    ScrollTrigger.create({
      trigger: image,
      start: "top bottom",
      end: "+=100%",
      scrub: true,
      onEnter: () => {
        // Set initial state: small scale and rotated
        gsap.set(image, {
          scale: 0.75,
          rotation: 30,
          "--after-opacity": 0,
        });
      },
      onUpdate: (self) => {
        const progress = self.progress;
        console.log(progress);
        // Start small and grow to normal size
        const scale = 0.75 + progress * 0.25; // 0.75 to 1
        const rotation = 30 * (1 - progress); // 30deg to 0deg
        const afterOpacity = progress;
        gsap.set(image, {
          scale,
          rotation,
          "--after-opacity": afterOpacity,
        });
      },
    });
    // Animate scale, rotation, and overlay both up and down
    ScrollTrigger.create({
      trigger: image,
      start: "top top",
      end: "+=100%",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        console.log(progress);
        // Animate scale and rotation for both directions
        const scale = 1 - progress * 0.25; // Starts at 1, ends at 0.75
        const rotation = progress * 30; // Starts at 0, ends at 30 degrees
        const afterOpacity = progress;
        gsap.set(image, {
          scale,
          rotation,
          "--after-opacity": afterOpacity,
        });
      },
    });
  }, { scope: container });

  return (
    <div ref={container} style={{ width: "100%", height: "100svh" }}>
      <div
        className="animated-image"
        style={{
          position: "relative",
          width: "80%",
          height: "100%",
          margin: "0 auto", // Center horizontally
        }}
      >
        <img
          src="/usp.png"
          alt="Animated"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center", // Ensures the image is centered
          }}
        />
      </div>
    </div>
  );
};

export default StickyImage;