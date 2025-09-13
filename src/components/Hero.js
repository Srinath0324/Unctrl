"use client";

import Image from "next/image";

export default function Hero() {
	return (
		<section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black">
			<Image src="/assets/gifs/rage.gif" alt="rage background" fill priority className="object-contain" />
			<div className="absolute inset-0 pointer-events-none" />
			<div className="relative z-10 w-full h-full flex items-center justify-center" />
			{/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
				<span className="bg-[var(--brand-orange)] text-white px-5 py-3 text-lg sm:text-2xl font-extrabold tracking-widest">
					The World Wants to Own You. We Say <span className="text-white">RAGE</span>
				</span>
			</div> */}
		</section>
	);
} 