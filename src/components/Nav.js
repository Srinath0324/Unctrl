"use client";

import Link from "next/link";
import { AnimatedLink } from "./AnimatedLink";
import UnCtrlButton from "./UnCtrlButton";
import LogoAnimated from "./LogoAnimated";

export default function Nav() {
  return (
    <header className="fixed z-[60] top-0 left-0 right-0 bg-black">
      <div className="h-full max-w-7xl mx-auto container-px">
        
        {/* === Mobile Layout === */}
        <div className="flex flex-col items-center md:hidden">
          {/* Logo (bigger on mobile) */}
          <div className="py-2">
            <LogoAnimated size={160} />
          </div>

          {/* Nav links */}
          <nav className="flex justify-center gap-4 pb-2 text-white">
            <Link href="#home" className="text-xs tracking-widest">
              <AnimatedLink value="HOME" />
            </Link>
            <Link href="#products" className="text-xs tracking-widest">
              <AnimatedLink value="PRODUCTS" />
            </Link>
            <Link href="#about" className="text-xs tracking-widest">
              <AnimatedLink value="ABOUT US" />
            </Link>
            <Link href="#community" className="text-xs tracking-widest">
              <AnimatedLink value="COMMUNITY" />
            </Link>
            <Link href="#blog" className="text-xs tracking-widest">
              <AnimatedLink value="BLOG" />
            </Link>
          </nav>
        </div>

        {/* === Desktop Layout (unchanged) === */}
        <div className="hidden md:flex items-center justify-between h-[78px]">
          {/* Logo */}
          <div className="flex items-center">
          <LogoAnimated baseSize={143} overlaySize={35} overlayOffsetX={-45} overlayOffsetY={0} />
          </div>

          {/* Links */}
          <nav className="flex items-center gap-10 text-white">
            <Link href="#home" className="text-sm tracking-widest">
              <AnimatedLink value="HOME" />
            </Link>
            <Link href="#products" className="text-sm tracking-widest">
              <AnimatedLink value="PRODUCTS" />
            </Link>
            <Link href="#about" className="text-sm tracking-widest">
              <AnimatedLink value="ABOUT US" />
            </Link>
            <Link href="#community" className="text-sm tracking-widest">
              <AnimatedLink value="COMMUNITY" />
            </Link>
            <Link href="#blog" className="text-sm tracking-widest">
              <AnimatedLink value="BLOG" />
            </Link>
            <UnCtrlButton>Pre-order</UnCtrlButton>
          </nav>
        </div>
      </div>
    </header>
  );
}