import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

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
		<html lang="en">
			<body className={`${chakra.variable} antialiased bg-[#020104] text-white`}> 
				<LenisProvider>{children}</LenisProvider>
			</body>
		</html>
	);
}
