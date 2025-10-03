import { useRef, useState, useEffect } from "react";
import ControllerModel from "../components/ControllerModel";

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
      <div className="p-6 sm:p-10 md:p-14 flex justify-center w-full">
        <div className="w-full max-w-[900px] h-[500px]">
          <ControllerModel animateIn={isVisible} />
        </div>
      </div>
    </section>
  );
}
