"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Vibe() {
	return (
		<section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
			<Image src="/images/vibe-video-cover.png" alt="vibe" fill className="object-cover" />
			<div className="absolute inset-0 bg-black/30" />
			<div className="relative z-10 flex flex-col items-center gap-6">
				<motion.button
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4 }}
					className="bg-[#FF5900] px-8 py-4 rounded text-black font-semibold">
					Pre order
				</motion.button>
			</div>
		</section>
	);
} 