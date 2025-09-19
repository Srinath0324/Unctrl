"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";

const FAQ_ITEMS = [
	{ q: "What is UNCTRL?", a: "UNCTRL is a next-gen modular controller designed for precision and creativity in games and beyond." },
	{ q: "When can I pre-order?", a: "Pre-orders open soon. Join the community to be notified the second it goes live." },
	{ q: "Which platforms are supported?", a: "We are focused on PC at launch with broader platform support under exploration." },
	{ q: "Is there software?", a: "Yes. Our config app lets you map inputs, save profiles, and share setups with the community." },
];

export default function Faqs() {
	return (
		<section id="faqs" className="relative bg-white text-black overflow-hidden">
			{/* Glitch background ONLY behind FAQ content */}
			<div className="relative min-h-[100svh]">
				<Image
					src="/assets/gifs/glitch-bg.gif"
					alt="glitch"
					fill
					className="absolute inset-0 -z-10 object-cover mix-blend-multiply opacity-70"
				/>
				<div className="absolute inset-0 bg-white/85 -z-10" />

				<div className="relative z-10 max-w-5xl mx-auto container-px py-16 sm:py-24">
					<h2 className="h2 text-center mb-10">FAQs</h2>
					<div className="space-y-4">
						{FAQ_ITEMS.map((item, idx) => (
							<AccordionItem key={idx} index={idx + 1} q={item.q} a={item.a} />
						))}
					</div>
				</div>
			</div>

			{/* Footer outside glitch container */}
			<Footer className="relative z-10" />
		</section>
	);
}

function AccordionItem({ index, q, a }) {
	const [open, setOpen] = useState(index === 1);

	return (
		<div className="rounded-md overflow-hidden bg-[#FF5900] text-white shadow-[0_4px_0_0_rgba(0,0,0,0.25)]">
			<button
				onClick={() => setOpen((v) => !v)}
				className="w-full px-6 py-6 flex items-center justify-between gap-6"
			>
				<span className="flex items-center gap-6">
					<span className="text-2xl sm:text-3xl font-extrabold tabular-nums w-10">
						{String(index).padStart(2, "0")}
					</span>
					<span className="text-xl sm:text-2xl font-bold">{q}</span>
				</span>
				<span
					aria-hidden
					className="size-9 sm:size-10 grid place-items-center rounded-full bg-white text-black text-xl font-bold"
				>
					{open ? "−" : "+"}
				</span>
			</button>

			<div
				className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
					open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
				}`}
			>
				<div className="overflow-hidden">
					<div className="px-6 pb-6 pt-0 text-white/95">
						<p className="text-[15px] leading-relaxed max-w-3xl">{a}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
