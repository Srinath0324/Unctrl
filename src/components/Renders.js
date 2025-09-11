"use client";

export default function Renders() {
  return (
    <section
      id="renders"
      className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center"
    >
      <img
        src="/assets/gifs/3d-controller.gif"
        alt="3D controller"
        className="absolute inset-0 w-full h-full object-contain"
      />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
        <span className="text-white text-[clamp(20px,3.5vw,42px)] font-extrabold tracking-wider drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]">
          Level up your gaming
        </span>
      </div>
    </section>
  );
}
