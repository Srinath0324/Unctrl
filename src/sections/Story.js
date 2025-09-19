"use client";

import Image from "next/image";

export default function Story() {
	return (
		<section id="story" className="relative min-h-[100svh] bg-white text-black overflow-hidden">
			<Image src="/assets/gifs/glitch-bg.gif" alt="glitch" fill className="object-cover mix-blend-multiply opacity-70" />
			<div className="relative z-10 min-h-[100svh] flex items-center justify-center">
				<div className="absolute inset-0 bg-white/80" />
			</div>
		</section>
	);
} 