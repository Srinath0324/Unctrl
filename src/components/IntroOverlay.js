"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroOverlay({ videoSrc, onFinished }) {
	const videoRef = useRef(null);
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);
	const [videoDuration, setVideoDuration] = useState(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		// Prevent body scroll while intro is visible
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		// Video event handlers
		const handleLoadedMetadata = () => {
			const duration = video.duration;
			setVideoDuration(duration);
			setIsVideoLoaded(true);
			
			// Start playing the video once metadata is loaded
			const playPromise = video.play();
			if (playPromise !== undefined) {
				playPromise.catch(error => {
					console.error("Error playing video:", error);
					// Fallback: if autoplay fails, finish intro after 3 seconds
					setTimeout(() => {
						onFinished?.();
					}, 3000);
				});
			}
		};

		const handleVideoEnd = () => {
			onFinished?.();
		};

		const handleVideoError = (e) => {
			console.error("Video loading error:", e);
			// Fallback: finish intro after 3 seconds if video fails
			setTimeout(() => {
				onFinished?.();
			}, 3000);
		};

		const handleCanPlayThrough = () => {
			// Video is fully loaded and can play without interruption
			setIsVideoLoaded(true);
		};

		// Add event listeners
		video.addEventListener("loadedmetadata", handleLoadedMetadata);
		video.addEventListener("ended", handleVideoEnd);
		video.addEventListener("error", handleVideoError);
		video.addEventListener("canplaythrough", handleCanPlayThrough);

		// Cleanup function
		return () => {
			document.body.style.overflow = originalOverflow;
			if (video) {
				video.removeEventListener("loadedmetadata", handleLoadedMetadata);
				video.removeEventListener("ended", handleVideoEnd);
				video.removeEventListener("error", handleVideoError);
				video.removeEventListener("canplaythrough", handleCanPlayThrough);
				video.pause();
			}
		};
	}, [onFinished]);

	return (
		<div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
			{/* Loading indicator */}
			{!isVideoLoaded && (
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
				</div>
			)}
			
			{/* Video element */}
			<video
				ref={videoRef}
				src={videoSrc}
				className={`w-full h-full object-cover transition-opacity duration-500 ${
					isVideoLoaded ? "opacity-100" : "opacity-0"
				}`}
				muted
				playsInline
				preload="metadata"
				onLoadStart={() => setIsVideoLoaded(false)}
			/>
		</div>
	);
}