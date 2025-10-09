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
        {/* Highest priority: 3D model for ControllerScene */}
        <link rel="preload" href="/models/c3.glb" as="fetch" crossOrigin="anonymous" />
        {/* Preload Hero videos so Hero is seamless after intro */}
        <link rel="preload" as="video" href="/assets/videos/mouth.mp4" />
        <link rel="preload" as="video" href="/assets/videos/mm.mp4" media="(max-width: 768px)" />
        {/* Keep intro videos as prefetch to reduce contention */}
        <link rel="prefetch" as="video" href="/assets/videos/intro.mp4" />
        <link rel="prefetch" as="video" href="/assets/videos/introVertical.mp4" media="(max-width: 768px)" />
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
