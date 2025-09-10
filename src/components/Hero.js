"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";

export default function Hero() {
	return (
		<section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
			<Nav />
			<Image src="/images/grid-bg.png" alt="grid" fill priority className="object-cover opacity-60" />
			<div className="absolute inset-0 bg-[#1f1f21]/60" />
			<div className="relative z-10 max-w-5xl w-full container-px">
				<div className="space-y-4">
					<motion.span initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="hero-label text-5xl sm:text-6xl font-extrabold">ENTER</motion.span>
					<div>
						<motion.span initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.05}} className="text-[var(--brand-orange)] text-5xl sm:text-6xl font-extrabold tracking-widest">CHAOS</motion.span>
					</div>
					<div className="flex items-end gap-3">
						<motion.span initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.1}} className="hero-label text-5xl sm:text-6xl font-extrabold">ESC</motion.span>
						<motion.span initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.15}} className="hero-label text-5xl sm:text-6xl font-extrabold">CTRL</motion.span>
					</div>
					<div className="hero-underline w-[60%]" />
				</div>
			</div>
		</section>
	);
} 