"use client";

import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Renders from "@/components/Renders";
import Usp from "@/components/Usp";
import Vibe from "@/components/Vibe";
import ComingSoon from "@/components/ComingSoon";
import Community from "@/components/Community";
import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";
import IntroOverlay from "@/components/IntroOverlay";
import { useEffect, useState } from "react";

export default function Home() {
	const [showIntro, setShowIntro] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
		if (!hasSeenIntro) {
			setShowIntro(true);
		}
	}, []);

	return (
		<main className="w-full overflow-x-hidden">
			{showIntro && (
				<IntroOverlay
					gifSrc="/assets/gifs/intro.gif"
					onFinished={() => {
						sessionStorage.setItem("hasSeenIntro", "1");
						setShowIntro(false);
						const hero = document.getElementById("home");
						if (hero) hero.scrollIntoView({ behavior: "smooth" });
					}}
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
			<footer>
				<Footer />
			</footer>
		</main>
	);
}
