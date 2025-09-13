"use client";

import Image from "next/image";

export default function Usp() {
  return (
    <section
      id="usp"
      className="relative min-h-[100svh] bg-black flex items-center justify-center"
    >
      <div className="p-6 sm:p-10 md:p-14 flex justify-center w-full">
        <div className="w-full max-w-[900px]">
          <Image
            src="/images/usp.png"
            alt="USP"
            width={800} 
            height={400} 
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
