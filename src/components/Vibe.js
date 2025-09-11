"use client";

function Row({ direction }) {
	const items = Array.from({ length: 10 });
	return (
		<div className={`marquee-wrap ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
			<div className="marquee-track">
				{items.map((_, i) => (
					<div key={i} className="placeholder-card" />
				))}
				{items.map((_, i) => (
					<div key={`dup-${i}`} className="placeholder-card" />
				))}
			</div>
		</div>
	);
}

export default function Vibe() {
	return (
		<section id="vibe" className="relative min-h-[100svh] bg-black flex flex-col justify-center gap-8">
			<div className="px-6 pt-8">
				<Row direction="right" />
			</div>
			<div className="px-6 pb-8">
				<Row direction="left" />
			</div>
		</section>
	);
} 