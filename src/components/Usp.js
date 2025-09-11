"use client";

import Image from "next/image";

export default function Usp() {
	return (
		<section id="usp" className="relative min-h-[100svh] overflow-hidden bg-black flex items-center justify-center">
			<div className="absolute inset-0 p-6 sm:p-10 md:p-14">
				<Image src="/images/usp.png" alt="USP" fill className="object-contain object-center" />
			</div>
		</section>
	);
} 