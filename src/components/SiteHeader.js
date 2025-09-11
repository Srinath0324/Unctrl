"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";

export default function SiteHeader() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const intro = document.querySelector("#intro");
		if (!intro) { setShow(true); return; }
		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0];
			// Hide header while Intro is intersecting at least 10% of viewport
			setShow(!entry.isIntersecting || entry.intersectionRatio < 0.1);
		}, { threshold: [0, 0.1, 0.5, 1] });
		observer.observe(intro);
		return () => observer.disconnect();
	}, []);

	if (!show) return null;
	return <Nav />;
} 