"use client";

import { useEffect, useState } from "react";
import DesktopNav from "@/components/DesktopNav";
import MobileNav from "@/components/MobileNav";

export default function SiteHeader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const intro = document.querySelector("#intro");
    if (!intro) { setShow(true); return; }

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setShow(!entry.isIntersecting || entry.intersectionRatio < 0.1);
    }, { threshold: [0, 0.1, 0.5, 1] });

    observer.observe(intro);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-[60] transition-transform duration-300 md:block hidden ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <DesktopNav />
      </div>

      {/* Mobile Navbar */}
      <div
        className={`fixed bottom-0 left-0 w-full z-[70] transition-transform duration-300 md:hidden ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <MobileNav />
      </div>
    </>
  );
}
