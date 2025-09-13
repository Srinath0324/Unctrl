"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function IntroOverlay({ gifSrc, onFinished }) {
	const timeoutRef = useRef(null);

	useEffect(() => {
		// Prevent body scroll while intro is visible
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		// Fallback duration in case GIF length can't be detected
		// Set to 3.5s as a safe default; adjust if the actual GIF duration differs
		timeoutRef.current = setTimeout(() => {
			onFinished?.();
		}, 8600);

		return () => {
			document.body.style.overflow = originalOverflow;
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [onFinished]);

	return (
		<div className="fixed inset-0 z-[9999] bg-black">
			<Image
				src={gifSrc}
				alt="Intro"
				fill
				priority
				className="object-cover"
			/>
		</div>
	);
}
