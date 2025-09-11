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

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body suppressHydrationWarning className={`${chakra.variable} antialiased bg-[#020104] text-white`}>
				<ScrollEffects>
					<SiteHeader />
					{children}
				</ScrollEffects>
			</body>
		</html>
	);
}
