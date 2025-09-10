"use client";

import Link from "next/link";

export default function Nav() {
	return (
		<header className="fixed z-50 top-0 left-0 right-0 h-[72px] bg-gradient-to-b from-black/70 to-transparent">
			<div className="h-full max-w-7xl mx-auto flex items-center justify-between container-px">
				<div className="flex items-center gap-3">
					<div className="size-8 rounded bg-[var(--brand-orange)]" />
					<div className="font-extrabold tracking-widest">UNCTRL</div>
				</div>
				<nav className="hidden md:flex items-center gap-8">
					<Link href="#" className="hover:opacity-90">HOME</Link>
					<Link href="#products" className="hover:opacity-90">PRODUCTS</Link>
					<button className="btn-primary">Pre-order</button>
				</nav>
			</div>
		</header>
	);
} 