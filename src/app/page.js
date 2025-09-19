"use client";

import Hero from "@/sections/Hero";
import Story from "@/sections/Story";
import Renders from "@/sections/Renders";
import Usp from "@/sections/Usp";
import Vibe from "@/sections/Vibe";
import ComingSoon from "@/sections/ComingSoon";
import Community from "@/sections/Community";
import Faqs from "@/sections/Faqs";
import Footer from "@/components/Footer";
import IntroOverlay from "@/components/IntroOverlay";
import { useEffect, useState } from "react";

export default function Home() {
	const [showIntro, setShowIntro] = useState(false);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		// Ensure we're on the client side
		setIsClient(true);
		
		// Check if user has already seen the intro
		const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
		if (!hasSeenIntro) {
			setShowIntro(true);
		}
	}, []);

	const handleIntroFinished = () => {
		// Mark intro as seen
		sessionStorage.setItem("hasSeenIntro", "1");
		setShowIntro(false);
		
		// Smooth scroll to hero section
		requestAnimationFrame(() => {
			const hero = document.getElementById("home");
			if (hero) {
				hero.scrollIntoView({ behavior: "smooth" });
			}
		});
	};

	return (
		<main className="w-full overflow-x-hidden">
			{/* Only show intro overlay on client side and if user hasn't seen it */}
			{isClient && showIntro && (
				<IntroOverlay
					videoSrc="/assets/videos/intro.mp4"
					onFinished={handleIntroFinished}
				/>
			)}
			<Hero />
			<Story />
			<Renders />
			<Usp />
			<Vibe />
			<ComingSoon />
			<Community />
			<Faqs />
		</main>
	);
}