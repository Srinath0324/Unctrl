"use client";

import ControllerModel from "../components/ControllerModel";

export default function Usp() {
  return (
    <section
      id="usp"
      className="relative min-h-[100svh] bg-black flex items-center justify-center"
    >
      <div className="p-6 sm:p-10 md:p-14 flex justify-center w-full">
        <div className="w-full max-w-[900px] h-[500px]"> 
          <ControllerModel />
        </div>
      </div>
    </section>
  );
}
