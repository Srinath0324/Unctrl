"use client";

import Hero from "@/components/Hero";
import Rage from "@/components/Rage";
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
			<Hero />
			<Rage />
			<Story />
			<Renders />
			<Usp />
			<Vibe />
			<ComingSoon />
			<Community />
			<Faqs />
			<Footer />
		</main>
	);
}
