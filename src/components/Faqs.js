"use client";

import { useState } from "react";

const faqs = [
	{ q: "What is UNCTRL?", a: "A new gaming controller experience." },
	{ q: "When is pre-order?", a: "Coming soon. Join our community for updates." },
	{ q: "What platforms are supported?", a: "PC to start; consoles under exploration." },
];

export default function Faqs() {
	return (
		<section className="bg-white text-black py-16">
			<div className="max-w-3xl mx-auto container-px">
				<h2 className="text-3xl font-bold mb-8 text-center">FAQs</h2>
				<div className="space-y-4">
					{faqs.map((item, idx) => (
						<Item key={idx} {...item} />
					))}
				</div>
			</div>
		</section>
	);
}

function Item({ q, a }) {
	const [open, setOpen] = useState(false);
	return (
		<div className="border border-black/10 rounded-lg overflow-hidden">
			<button
				onClick={() => setOpen((v) => !v)}
				className="w-full text-left p-4 font-semibold flex justify-between">
				<span>{q}</span>
				<span>{open ? "−" : "+"}</span>
			</button>
			{open && <div className="p-4 pt-0 text-sm text-black/80">{a}</div>}
		</div>
	);
} 