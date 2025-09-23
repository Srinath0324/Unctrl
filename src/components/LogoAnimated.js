"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

// Public asset paths
const BASE_GIF = "/assets/gifs/logo-nocoin.gif";
const OVERLAY_BIG = "/images/logo-big.png";
const OVERLAY_BLACK = "/images/logo-black.png";
const OVERLAY_FLIP = "/assets/gifs/logo-flip.gif";

export default function LogoAnimated({
	// BACKWARD COMPAT: size previously controlled the whole container
	// Now treated as alias to baseSize if baseSize is not provided
	size,
	// Size of the square base container (base gif area) in pixels
	baseSize,
	// Size of the overlay (png/black/gif) square in pixels (can differ from base)
	overlaySize,
	// Pixel offsets to position overlay relative to the container center
	overlayOffsetX = 0,
	overlayOffsetY = 0,
	// Optional extra classes for the outer container and overlay wrapper
	containerClassName = "",
	overlayClassName = "",
	// ARIA label and title for accessibility
	label = "UNCTRL logo",
}) {
	const resolvedBaseSize = (typeof baseSize === "number" && baseSize > 0)
		? baseSize
		: (typeof size === "number" && size > 0 ? size : 133);
	const resolvedOverlaySize = (typeof overlaySize === "number" && overlaySize > 0)
		? overlaySize
		: resolvedBaseSize; // default overlay matches base

	const [overlaySrc, setOverlaySrc] = useState(OVERLAY_BIG);
	const timeoutsRef = useRef([]);
	const isAnimatingRef = useRef(false);

	// Preload images/gifs to avoid flicker
	useEffect(() => {
		[BASE_GIF, OVERLAY_BIG, OVERLAY_BLACK, OVERLAY_FLIP].forEach((src) => {
			const img = new window.Image();
			img.src = src;
		});
	}, []);

	const clearAllTimers = useCallback(() => {
		timeoutsRef.current.forEach((id) => clearTimeout(id));
		timeoutsRef.current = [];
	}, []);

	const runSequence = useCallback((frames, durations) => {
		clearAllTimers();
		isAnimatingRef.current = true;
		let total = 0;
		frames.forEach((src, idx) => {
			const id = setTimeout(() => {
				setOverlaySrc(src);
				if (idx === frames.length - 1) {
					// Give the last frame a small dwell then unlock
					const endId = setTimeout(() => {
						isAnimatingRef.current = false;
					}, 20);
					timeoutsRef.current.push(endId);
				}
			}, total);
			timeoutsRef.current.push(id);
			total += durations[idx];
		});
	}, [clearAllTimers]);

	const playHoverCycle = useCallback(() => {
		// Cycle: big -> black -> big
		runSequence([OVERLAY_BIG, OVERLAY_BLACK, OVERLAY_BIG], [0, 160, 160]);
	}, [runSequence]);

	const playClickCycle = useCallback(() => {
		// Cycle: big -> flip.gif -> big
		runSequence([OVERLAY_BIG, OVERLAY_FLIP, OVERLAY_BIG], [0, 380, 420]);
	}, [runSequence]);

	const handleMouseEnter = () => {
		if (isAnimatingRef.current) return;
		playHoverCycle();
	};

	const handleMouseLeave = () => {
		// Stop current sequence and do not auto-play on leave
		clearAllTimers();
		isAnimatingRef.current = false;
		setOverlaySrc(OVERLAY_BIG);
	};

	const handleClick = (e) => {
		e.preventDefault();
		// Interrupt and play click cycle
		clearAllTimers();
		isAnimatingRef.current = false;
		playClickCycle();
	};

	useEffect(() => () => clearAllTimers(), [clearAllTimers]);

	const containerStyle = { width: `${resolvedBaseSize}px`, height: `${resolvedBaseSize}px` };
	const overlayWrapperStyle = {
		width: `${resolvedOverlaySize}px`,
		height: `${resolvedOverlaySize}px`,
		left: "50%",
		top: "50%",
		transform: `translate(calc(-50% + ${overlayOffsetX}px), calc(-50% + ${overlayOffsetY}px))`,
	};

	return (
		<div
			className={`relative select-none pointer-events-none ${containerClassName}`}
			style={containerStyle}
			aria-label={label}
			role="img"
		>
			{/* Base looping gif layer (fills the base container) */}
			<Image
				src={BASE_GIF}
				alt="UNCTRL base animation"
				fill
				priority
				sizes={`(max-width: 768px) ${resolvedBaseSize}px, ${resolvedBaseSize}px`}
				style={{ objectFit: "contain", pointerEvents: "none" }}
			/>

			{/* Overlay controllable image/gif with independent sizing/position */}
			<div
				className={`absolute pointer-events-auto cursor-pointer ${overlayClassName}`}
				style={overlayWrapperStyle}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}
			>
				<Image
					src={overlaySrc}
					alt="UNCTRL overlay"
					fill
					priority
					sizes={`${resolvedOverlaySize}px`}
					style={{ objectFit: "contain", pointerEvents: "none" }}
				/>
			</div>
		</div>
	);
} 