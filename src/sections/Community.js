"use client";
import Image from "next/image";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";
import UnCtrlButton from "@/components/UnCtrlButton";

export default function Community() {
	const sectionRef = useRef(null);
	const y = useMotionValue(200); // Start from below screen
	const scale = useMotionValue(1);
	
	// Add spring physics
	const springY = useSpring(y, {
		stiffness: 150,
		damping: 20,
		mass: 1
	});
	
	const springScale = useSpring(scale, {
		stiffness: 200,
		damping: 15,
		mass: 1
	});

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// Section is in view - animate button to its normal position
						y.set(0);
						scale.set(1);
					} else {
						// Section is out of view - animate button below screen
						y.set(300); // Send it way below the screen
						scale.set(0.8);
					}
				});
			},
			{ 
				threshold: [0, 0.1, 0.5, 0.9, 1],
				rootMargin: "-50px 0px -50px 0px"
			}
		);

		observer.observe(section);

		// Also listen for keyboard navigation
		const handleKeydown = (e) => {
			if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(e.key)) {
				// Small delay to let the scroll happen, then check if we're still in view
				setTimeout(() => {
					const rect = section.getBoundingClientRect();
					const isInView = rect.top < window.innerHeight && rect.bottom > 0;
					
					if (!isInView) {
						// We're out of view - send button below screen
						y.set(300);
						scale.set(0.8);
					} else if (isInView) {
						// We're back in view - bring button up
						y.set(0);
						scale.set(1);
					}
				}, 100);
			}
		};

		window.addEventListener('keydown', handleKeydown);

		return () => {
			observer.disconnect();
			window.removeEventListener('keydown', handleKeydown);
		};
	}, [y, scale]);

	return (
		<>
			<section 
				ref={sectionRef}
				id="community" 
				className="relative min-h-[100svh] flex items-end justify-center overflow-hidden"
			>
				<video
					className="absolute inset-0 w-full h-full object-cover"
					autoPlay
					loop
					muted
					playsInline
					preload="auto"
				>
					<source src="/assets/videos/community.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<div className="absolute inset-0 pointer-events-none " />
			</section>

			{/* Fixed position button that can appear over any section */}
			<motion.a
				href="#community"
				className="fixed bottom-16 sm:bottom-24 left-1/2 transform -translate-x-1/2 z-50"
				initial={{ opacity: 0, y: 300 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4 }}
				style={{
					y: springY,
					scale: springScale
				}}
			>
				<UnCtrlButton>Join the CHAOS</UnCtrlButton>
			</motion.a>
		</>
	);
}