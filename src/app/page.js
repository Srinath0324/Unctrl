"use client";

import Hero from "@/sections/Hero";
import Story from "@/sections/Story";
import Renders from "@/sections/Renders";
import Usp from "@/sections/Usp";
import Vibe from "@/sections/Vibe";
import ComingSoon from "@/sections/ComingSoon";
import Community from "@/sections/Community";
import Faqs from "@/sections/Faqs";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <Story />
      <Renders />
      <Usp />
      <Vibe />
      <ComingSoon />
      <Community />
      <Faqs />
    </main>
  );
}
