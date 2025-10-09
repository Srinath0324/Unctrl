import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import ScrollEffects from "@/components/ScrollEffects";
import SiteHeader from "@/components/SiteHeader";

const chakra = Chakra_Petch({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-chakra-petch",
});

export const metadata = {
  title: "UNCTRL — Enter Chaos",
  description: "Landing experience for UNCTRL",
};

export default function RootLayout({ children, showIntroOverlay }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Highest priority: intro videos for first paint */}
        <link rel="preload" as="video" href="/assets/videos/intro.mp4" />
        <link rel="preload" as="video" href="/assets/videos/introVertical.mp4" media="(max-width: 768px)" />
        {/* Keep 3D model low priority to avoid contention */}
        <link rel="prefetch" href="/models/c3.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body
        suppressHydrationWarning
        className={`${chakra.variable} antialiased bg-[#020104] text-white`}
      >
        {/* Intro overlay rendered ABOVE everything */}
        {showIntroOverlay}

        {/* Rest of the site */}
        <ScrollEffects>
          <SiteHeader />
          {children}
        </ScrollEffects>
      </body>
    </html>
  );
}
