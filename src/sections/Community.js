"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import UnCtrlButton from "@/components/UnCtrlButton";
export default function Community() {
	return (
		<section id="community" className="relative min-h-[100svh] flex items-end justify-center overflow-hidden">
			<video
				className="absolute inset-0 w-full h-full object-cover"
				autoPlay
				loop
				muted
				playsInline
				preload="auto"
			>
				<source src="/assets/videos/community.mp4" type="video/mp4" />
				{/* Optional fallback text */}
				Your browser does not support the video tag.
			</video>
			<div className="absolute inset-0 pointer-events-none " />
			<div className="relative z-10 w-full max-w-6xl container-px pb-16 sm:pb-24 flex justify-center">
				<motion.a
					href="#community"
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}>
						<UnCtrlButton>Join the CHAOS</UnCtrlButton>
						
					</motion.a>
			</div>
		</section>
	);
} 