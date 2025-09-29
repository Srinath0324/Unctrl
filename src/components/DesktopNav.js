// DesktopNav.jsx
import Link from "next/link";
import { AnimatedLink } from "./AnimatedLink";
import UnCtrlButton from "./UnCtrlButton";
import LogoAnimated from "./LogoAnimated";

export default function DesktopNav() {
  return (
    <div className="hidden md:block w-screen bg-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[78px] px-6">
        <LogoAnimated baseSize={140} overlaySize={40} overlayOffsetX={-45} overlayOffsetY={0} />
        <nav className="flex items-center gap-10 text-white">
          {["HOME", "PRODUCTS", "ABOUT US", "COMMUNITY", "BLOG"].map((item) => (
            <Link key={item} href={`#${item.toLowerCase().replace(/\s+/g, "")}`} className="text-sm tracking-widest">
              <AnimatedLink value={item} />
            </Link>
          ))}
          <UnCtrlButton>Order Now</UnCtrlButton>
        </nav>
      </div>
    </div>
  );
}
