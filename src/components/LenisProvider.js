"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }) {
	useEffect(() => {
		const lenis = new Lenis({
			smoothWheel: true,
			duration: 1.1,
			easing: (x) => 1 - Math.pow(1 - x, 3),
		});
		let raf;
		const rafLoop = (time) => {
			lenis.raf(time);
			raf = requestAnimationFrame(rafLoop);
		};
		raf = requestAnimationFrame(rafLoop);
		return () => cancelAnimationFrame(raf);
	}, []);
	return children;
} 