"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Renders() {
	return (
		<section className="relative bg-black pt-[72px] pb-16">
			<div className="max-w-[1200px] mx-auto container-px">
				<div className="relative w-full aspect-[21/9]">
					<Image src="/images/renders-frame.png" alt="controller renders" fill className="object-contain" />
				</div>
				<motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="h2 mt-4 text-center">Level up your gaming</motion.h2>
			</div>
		</section>
	);
} 