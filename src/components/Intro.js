"use client";

import Image from "next/image";

export default function Intro() {
	return (
		<section id="intro" className="relative min-h-[100svh] overflow-hidden flex items-center justify-center bg-black">
			<Image src="/assets/gifs/glitch-bg.gif" alt="glitch" fill priority className="object-cover" />
			<div className="absolute inset-0 bg-black/50" />
			<div className="relative z-10 max-w-4xl w-full container-px">
				<div className="space-y-6">
					<div className="inline-block border-2 border-white shadow-[0_0_0_8px_rgba(0,0,0,0.7)] px-6 py-3 bg-black">
						<span className="text-6xl sm:text-7xl font-extrabold tracking-widest">ENTER</span>
					</div>
					<div>
						<span className="text-[var(--brand-orange)] text-6xl sm:text-7xl font-extrabold tracking-[0.2em]">CHAOS</span>
					</div>
					<div className="flex items-end gap-4">
						<div className="inline-block border-2 border-white shadow-[0_0_0_8px_rgba(0,0,0,0.7)] px-6 py-3 bg-black">
							<span className="text-6xl sm:text-7xl font-extrabold tracking-widest">ESC</span>
						</div>
						<div className="inline-block border-2 border-white shadow-[0_0_0_8px_rgba(0,0,0,0.7)] px-6 py-3 bg-black">
							<span className="text-6xl sm:text-7xl font-extrabold tracking-widest">CTRL</span>
						</div>
					</div>
					<div className="h-4 bg-[var(--brand-yellow)] w-[60%]" />
				</div>
			</div>
		</section>
	);
} 