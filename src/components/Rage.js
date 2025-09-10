"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Rage() {
	return (
		<section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black">
			<Image src="/images/rage-bg.jpg" alt="rage bg" fill className="object-cover opacity-30" />
			<div className="absolute inset-0" />
			<div className="relative z-10 text-center">
				<div className="w-56 h-56 rounded-full bg-[#c2f412] mx-auto mb-10 opacity-80" />
			</div>
			<motion.div initial={{y:40,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{once:true}} transition={{duration:0.5}} className="absolute bottom-10 left-1/2 -translate-x-1/2">
				<span className="bg-[var(--brand-orange)] text-white px-4 py-3 text-xl sm:text-2xl font-bold tracking-wide">
					The World Wants to Own You. We Say <span className="text-white">RAGE</span>
				</span>
			</motion.div>
		</section>
	);
} 