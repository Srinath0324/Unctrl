"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Updated import for the new file
const ControllerScene = dynamic(
  () => import("../components/ControllerModel/ControllerScene"),
  { ssr: false } // disable server-side rendering
);

export default function Usp() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="usp"
      ref={sectionRef}
      className="relative min-h-[100svh] bg-black flex items-center justify-center"
    >
      <div className="w-full sm:w-[95vw] aspect-[16/9] max-w-[1600px] flex justify-center items-center overflow-hidden">
        <ControllerScene animateIn={isVisible} />
      </div>
    </section>
  );
}
