"use client";

import Intro from "@/components/Intro";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Renders from "@/components/Renders";
import Usp from "@/components/Usp";
import Vibe from "@/components/Vibe";
import ComingSoon from "@/components/ComingSoon";
import Community from "@/components/Community";
import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<main className="w-full overflow-x-hidden">
			<Intro />
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
