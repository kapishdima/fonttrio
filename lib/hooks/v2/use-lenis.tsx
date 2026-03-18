"use client";

import { useEffect } from "react";

export const useLenis = () => {
	useEffect(() => {
		const initLenis = async () => {
			const Lenis = (await import("lenis")).default;

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
		};

		const cleanup = initLenis();
		return () => {
			cleanup.then((cleanupFn) => cleanupFn?.());
		};
	}, []);
};
