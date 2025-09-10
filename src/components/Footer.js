export default function Footer() {
	return (
		<footer className="bg-black text-white border-t border-white/10">
			<div className="max-w-7xl mx-auto py-12 container-px grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
				<div className="flex items-center gap-4">
					<div className="size-16 bg-[var(--brand-orange)]" />
					<div className="text-5xl font-extrabold tracking-[0.2em]">UNCTRL</div>
				</div>
				<div className="space-y-3 text-right md:text-left">
					<p>Instagram</p>
					<p>Reddit</p>
					<p>Discord</p>
					<p>Blog</p>
				</div>
				<div className="space-y-3 text-right">
					<p>Sitemap</p>
					<p>Downloads</p>
					<p>Join the community</p>
				</div>
			</div>
			<div className="border-t border-white/10">
				<div className="max-w-7xl mx-auto container-px py-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm opacity-80">
					<p>Login</p>
					<p>FAQs</p>
					<p>Support</p>
					<p>Privacy policy</p>
					<p>Terms and conditions</p>
				</div>
			</div>
		</footer>
	);
} 