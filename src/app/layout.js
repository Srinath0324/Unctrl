import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import RootWrapper from "./RootWrapper";

const chakra = Chakra_Petch({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-chakra-petch",
});

export const metadata = {
  title: "UNCTRL — Enter Chaos",
  description: "Landing experience for UNCTRL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Preload both video variants */}
        <link
          rel="preload"
          as="video"
          href="/assets/videos/intro.mp4"
          type="video/mp4"
        />
        <link
          rel="preload"
          as="video"
          href="/assets/videos/Introvertical.mp4"
          type="video/mp4"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${chakra.variable} antialiased bg-black text-white`}
      >
        {/* ✅ Client wrapper handles hooks */}
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}