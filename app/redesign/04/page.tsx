"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { Hero } from "@/app/components/v2/hero";
import { SponsorsMarquee } from "@/app/components/v2/sponsors-marquee";

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
		<main className="w-screen overflow-x-hidden dark:bg-black">
			<Hero />
			<SponsorsMarquee />
			<div className="h-[200vh]"></div>
		</main>
	);
}
