"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

function HoverCycleImage({
	images,
	alt,
	className,
	frameDurationMs = 50,
}) {
	const [index, setIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const timeoutsRef = useRef([]);

	const clearTimers = useCallback(() => {
		timeoutsRef.current.forEach((id) => clearTimeout(id));
		timeoutsRef.current = [];
	}, []);

	useEffect(() => clearTimers, [clearTimers]);

	const handleMouseEnter = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		// Run exactly one cycle from current first index through all frames and back to first
		// The provided arrays should already include the full sequence (e.g., [1,2,3,0])
		for (let step = 1; step < images.length; step += 1) {
			const timeoutId = setTimeout(() => {
				setIndex(step);
				if (step === images.length - 1) {
					// Final step complete; reset animating flag shortly after to allow re-trigger
					setTimeout(() => setIsAnimating(false), frameDurationMs);
				}
			}, step * frameDurationMs);
			timeoutsRef.current.push(timeoutId);
		}
	};

	const handleMouseLeave = () => {
		// Cancel mid-sequence and reset to first frame
		if (isAnimating) {
			clearTimers();
			setIsAnimating(false);
		}
		setIndex(0);
	};

	return (
		<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={className}>
			{/* Use next/image for performance with a tiny fade to mimic ease-in */}
			<div className="relative">
				<Image
					key={images[index]}
					src={images[index]}
					alt={alt}
					width={800}
					height={200}
					priority
					className="h-auto w-full transition-opacity duration-100 ease-in"
				/>
			</div>
		</div>
	);
}

export default function Intro() {
	return (
		<section id="intro" className="relative min-h-[100svh] overflow-hidden flex items-center justify-center bg-black">
			{/* Background grid image to match reference */}
			<Image src="/assets/gifs/glitch-bg.gif" alt="grid background" fill priority className="object-cover" />
			<div className="absolute inset-0 bg-black/40" />

			<div className="relative z-10 w-full max-w-5xl container-px ml-40">
				<div className="space-y-1">
					{/* ENTER */}
					<HoverCycleImage
						alt="ENTER"
						images={[
							"/images/enter-text-1.png",
							"/images/enter-text-2.png",
							"/images/enter-text-3.png",
							"/images/enter-text-1.png",
						]}
						className="max-w-[240px]"
						frameDurationMs={200}
					/>

					{/* CHAOS + Bomb */}
					<div className="relative flex items-center ">
						<HoverCycleImage
							alt="CHAOS"
							images={[
								"/images/chaos-text-1.png",
								"/images/chaos-text-2.png",
								"/images/chaos-text-3.png",
								"/images/chaos-text-1.png",
							]}
							className="max-w-[520px]"
							frameDurationMs={200}
						/>
						<Image src="/images/bomb-icon.png" alt="bomb" width={48} height={48} className="h-10 w-10 sm:h-12 sm:w-12" />
					</div>

					{/* ESC + CTRL with yellow rectangle below */}
					<div className="relative inline-block">
						{/* Yellow rectangle positioned under the two items */}
						<Image
							src="/images/yellow-rectangle.png"
							alt="highlight bar"
							width={900}
							height={60}
							className="absolute left-0 bottom-[-12px] w-[70%] h-auto select-none pointer-events-none"
							priority
						/>

						<div className="relative z-10 flex items-end gap-4">
							<HoverCycleImage
								alt="ESC"
								images={[
									"/images/esc-text-1.png",
									"/images/esc-text-2.png",
									"/images/esc-text-1.png",
								]}
								className="max-w-[360px]"
								frameDurationMs={200}
							/>

							{/* CTRL rendered as styled box text due to missing asset */}
							<div className="relative inline-block border-2 border-white bg-black px-4 py-2 shadow-[0_0_0_8px_rgba(0,0,0,0.7)]">
								<span className="text-white text-3xl sm:text-4xl font-extrabold tracking-widest">CTRL</span>
								{/* Middle finger icon positioned near the 'R' */}
								<Image src="/images/middle-finger-icon.png" alt="middle finger" width={40} height={40} className="absolute -bottom-8 right-6 h-10 w-10" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
} 