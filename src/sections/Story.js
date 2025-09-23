"use client";

export default function Story() {
	return (
		<section
			id="story"
			className="relative min-h-[100svh] bg-black text-black overflow-hidden"
		>
			{/* Background Video */}
			<video
				className="absolute inset-0 w-full h-full object-contain"
				autoPlay
				loop
				muted
				playsInline
				preload="auto"
			>
				<source src="/assets/videos/rage-story.mp4" type="video/mp4" />
				{/* Optional fallback text */}
				Your browser does not support the video tag.
			</video>
		</section>
	);
}
