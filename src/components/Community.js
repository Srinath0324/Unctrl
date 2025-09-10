"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Community() {
	return (
		<section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
			<Image src="/images/launching-soon.jpg" alt="community" fill className="object-cover" />
			<div className="absolute inset-0 bg-black/50" />
			<div className="relative z-10 w-full max-w-6xl container-px">
				<div className="flex justify-center mb-8">
					<motion.button
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4 }}
						className="bg-[#FF5900] px-8 py-4 rounded text-black font-semibold">
						Pre order
					</motion.button>
				</div>
				<h2 className="text-center text-3xl font-bold mb-6 text-black">FAQs</h2>
			</div>
		</section>
	);
} 