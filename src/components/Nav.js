"use client";

import Link from "next/link";
import Image from "next/image";

export default function Nav() {
	return (
		<header className="fixed z-[60] top-0 left-0 right-0 h-[72px] bg-black">
			<div className="h-full max-w-7xl mx-auto flex items-center justify-between container-px">
				<div className="flex items-center">
					<Image src="/images/logo.png" alt="UNCTRL" width={94} height={94} priority />
				</div>
				<nav className="hidden md:flex items-center gap-10 text-white">
					<Link href="#home" className="text-sm tracking-widest">HOME</Link>
					<Link href="#products" className="text-sm tracking-widest">PRODUCTS</Link>
					<Link href="#about" className="text-sm tracking-widest opacity-70 pointer-events-none">ABOUT US</Link>
					<Link href="#community" className="text-sm tracking-widest">COMMUNITY</Link>
					<Link href="#blog" className="text-sm tracking-widest opacity-70 pointer-events-none">BLOG</Link>
					<button className="btn-primary">Pre-order</button>
				</nav>
			</div>
		</header>
	);
} 