"use client";

import { useEffect } from "react";

export default function ScrollEffects({ children }) {
	useEffect(() => {
		const sections = Array.from(document.querySelectorAll("main > section, main > footer"));
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) entry.target.classList.add("is-in-view");
				});
			},
			{ threshold: 0.25 }
		);
		sections.forEach((s) => observer.observe(s));

		const navByKey = (e) => {
			if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(e.key)) return;
			const viewportSections = Array.from(document.querySelectorAll("main > section, main > footer"));
			const mid = window.scrollY + window.innerHeight / 2;
			const idx = Math.max(
				0,
				viewportSections.findIndex((s) => s.offsetTop <= mid && s.offsetTop + s.offsetHeight > mid)
			);
			let next = idx;
			if (e.key === "ArrowDown" || e.key === "PageDown") next = Math.min(idx + 1, viewportSections.length - 1);
			if (e.key === "ArrowUp" || e.key === "PageUp") next = Math.max(idx - 1, 0);
			if (e.key === "Home") next = 0;
			if (e.key === "End") next = viewportSections.length - 1;
			viewportSections[next].scrollIntoView({ behavior: "smooth", block: "start" });
		};
		window.addEventListener("keydown", navByKey);
		return () => {
			observer.disconnect();
			window.removeEventListener("keydown", navByKey);
		};
	}, []);
	return children;
} 