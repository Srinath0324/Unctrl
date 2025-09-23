export default function Footer() {
	return (
		<footer className="bg-black text-white">
			<div className="max-w-7xl mx-auto px-8 py-14">
				{/* Main content area */}
				<div className="flex justify-between items-start mb-14">
					{/* Logo section */}
					<div className="flex items-center gap-8">
						{/* Logo image */}
						<img 
							src="/images/group 1 1.png" 
							alt="UNCTRL Logo" 
							className="w-150 h-45"
						/>
						{/* Brand name */}
						{/* <h1 className="text-8xl font-black tracking-[0.15em] text-white">
							UNCTRL
						</h1> */}
					</div>

					{/* Right side navigation */}
					<div className="flex gap-24 text-xl">
						<div className="space-y-4">
							<a href="#" className="block hover:text-orange-500 transition-colors">Instagram</a>
							<a href="#" className="block hover:text-orange-500 transition-colors">Reddit</a>
							<a href="#" className="block hover:text-orange-500 transition-colors">Discord</a>
							<a href="#" className="block hover:text-orange-500 transition-colors">Blog</a>
						</div>
						<div className="space-y-4">
							<a href="#" className="block hover:text-orange-500 transition-colors">Sitemap</a>
							<a href="#" className="block hover:text-orange-500 transition-colors">Downloads</a>
							<a href="#" className="block hover:text-orange-500 transition-colors">Join the community</a>
						</div>
					</div>
				</div>

				{/* Bottom navigation */}
				<div className="border-t border-gray-800 pt-8">
					<div className="flex gap-12 text-base text-gray-400">
						<a href="#" className="hover:text-white transition-colors">Login</a>
						<a href="#" className="hover:text-white transition-colors">FAQs</a>
						<a href="#" className="hover:text-white transition-colors">Support</a>
						<a href="#" className="hover:text-white transition-colors">Privacy policy</a>
						<a href="#" className="hover:text-white transition-colors">Terms and conditions</a>
					</div>
				</div>
			</div>
		</footer>
	);
}