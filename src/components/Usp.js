"use client";

import { motion } from "framer-motion";

export default function Usp() {
	return (
		<section className="relative bg-[#0b0b0c] py-24">
			<div className="max-w-[1200px] mx-auto container-px grid grid-cols-12 gap-3">
				{/* Row 1 */}
				<motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className="col-span-7 aspect-[16/9] bg-[#d9d9d9]" />
				<motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className="col-span-4 col-start-9 aspect-[16/9] bg-[#d9d9d9]" />
				<motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className="col-span-1 col-start-12 aspect-[16/9] bg-[#d9d9d9]" />
				{/* Row 2 */}
				<motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className="col-span-5 aspect-[16/9] bg-[#d9d9d9]" />
				<motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className="col-span-7 aspect-[16/9] bg-[#d9d9d9]" />
			</div>
		</section>
	);
} 