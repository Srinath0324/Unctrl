"use client";

import { useEffect, useState } from "react";
import DesktopNav from "@/components/DesktopNav";
import MobileNav from "@/components/MobileNav";

export default function SiteHeader({ children }) {
  const [show, setShow] = useState(false);

  // You can adjust these to match actual navbar heights
  const desktopNavHeight = 64; // px
  const mobileNavHeight = 64; // px

  useEffect(() => {
    const intro = document.querySelector("#intro");
    if (!intro) { setShow(true); return; }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setShow(!entry.isIntersecting || entry.intersectionRatio < 0.1);
      }, 
      { threshold: [0, 0.1, 0.5, 1] }
    );

    observer.observe(intro);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <div
        className={`desktop-navbar fixed top-0 inset-x-0 z-[60] transition-transform duration-300 md:block hidden ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ height: `${desktopNavHeight}px` }}
      >
        <DesktopNav />
      </div>

      {/* Mobile Navbar */}
      <div
        className={`mobile-navbar fixed bottom-0 inset-x-0 z-[70] transition-transform duration-300 md:hidden ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: `${mobileNavHeight}px` }}
      >
        <MobileNav />
      </div>

      {/* Wrapper around content so nothing is under the navbars */}
      <div
        className="relative"
        style={{
          paddingTop: `${desktopNavHeight}px`, // space for desktop top navbar
          paddingBottom: `${mobileNavHeight}px`, // space for mobile bottom navbar
        }}
      >
        {children}
      </div>
    </>
  );
}
