"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
	const [videoSupported, setVideoSupported] = useState(true);

	useEffect(() => {
		// Check if browser supports webm video
		const video = document.createElement("video");
		if (!video.canPlayType("video/webm")) {
			setVideoSupported(false);
		}
	}, []);

	return (
		<section
			id="home"
			className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black"
		>
			{/* Background Media */}
			{videoSupported ? (
				<video
					className="absolute inset-0 w-full h-full object-contain"
					autoPlay
					loop
					muted
					playsInline
					preload="auto"
				>
					<source src="/assets/videos/rage.webm" type="video/webm" />
				</video>
			) : (
				<Image
					src="/images/rage-apng.png"
					alt="rage background"
					fill
					priority
					className="object-contain"
				/>
			)}

			{/* Overlay */}
			<div className="absolute inset-0 pointer-events-none" />

			{/* Foreground content */}
			<div className="relative z-10 w-full h-full flex items-center justify-center">
				{/* Add your hero text / buttons here */}
			</div>
		</section>
	);
}
