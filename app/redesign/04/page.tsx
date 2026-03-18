"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { BestPairs } from "@/app/components/v2/best-pairs";
import { Faq } from "@/app/components/v2/faq";
import { Footer } from "@/app/components/v2/footer";
import { Hero } from "@/app/components/v2/hero";
import { HowItWorks } from "@/app/components/v2/how-it-works";
import { SponsorsMarquee } from "@/app/components/v2/sponsors-marquee";
import { XTestimonials } from "@/app/components/v2/x-testimonials";

export default function Redesign04() {
	// Hide scrollbar + Lenis smooth scroll
	useEffect(() => {
		document.documentElement.style.scrollbarWidth = "none";
		document.body.style.overflow = "auto";
		const style = document.createElement("style");
		style.textContent = "html::-webkit-scrollbar { display: none !important; }";
		document.head.appendChild(style);

		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
			orientation: "vertical",
			gestureOrientation: "vertical",
			smoothWheel: true,
			touchMultiplier: 2,
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
			document.documentElement.style.scrollbarWidth = "";
			document.body.style.overflow = "";
			style.remove();
		};
	}, []);

	return (
		<main className="w-screen overflow-x-hidden bg-black">
			<Hero />
			<SponsorsMarquee />
			<HowItWorks />
			<BestPairs />
			<XTestimonials />
			<Faq />
			<Footer />
		</main>
	);
}
