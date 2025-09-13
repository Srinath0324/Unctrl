"use client";

function Row({ direction }) {
	const gifs = [
		"/assets/gifs/video1.gif",
		"/assets/gifs/video2.gif",
		"/assets/gifs/video3.gif",
	];

	return (
		<div className={`marquee-wrap ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
			<div className="marquee-track">
				{gifs.map((src, i) => (
					<img key={i} src={src} alt={`Vibe GIF ${i + 1}`} className="vibe-gif" />
				))}
				{gifs.map((src, i) => (
					<img key={`dup-${i}`} src={src} alt={`Vibe GIF duplicate ${i + 1}`} className="vibe-gif" />
				))}
			</div>
		</div>
	);
}

export default function Vibe() {
	return (
		<section
			id="vibe"
			className="relative min-h-[80vh] bg-black flex flex-col justify-center items-center pt-24 pb-10"
		>
			<div className="w-full max-w-[1600px] px-6 space-y-4">
				<Row direction="right" />
				<Row direction="left" />
			</div>
		</section>
	);
}
