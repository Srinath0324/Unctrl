"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Community() {
	return (
		<section id="community" className="relative min-h-[100svh] flex items-end justify-center overflow-hidden">
			<Image src="/assets/gifs/community-bg.gif" alt="community background" fill priority className="object-cover" />
			<div className="absolute inset-0 pointer-events-none bg-black/30" />
			<div className="relative z-10 w-full max-w-6xl container-px pb-16 sm:pb-24 flex justify-center">
				<motion.a
					href="#community"
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
					className="btn-primary text-base sm:text-lg px-7 sm:px-10 py-4 sm:py-5">
						Join the CHAOS
					</motion.a>
			</div>
		</section>
	);
} 