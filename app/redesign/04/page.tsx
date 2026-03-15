"use client";

import { Moon, Search, Sun } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Lenis from "lenis";
import React, { useEffect, useRef, useState } from "react";
import DotGrid from "@/components/DotGrid";
import { Button } from "@/components/ui/button";

const SCATTER_CONFIG = {
	count: 200,
	minDistance: 80,
	innerRadius: 1000, // px — пустота в центре (радиус)
	maxAttempts: 150,
};

// ChaosFont stagger: index * CHAOS_STAGGER, duration 0.5s
// Hero starts when last chaos font is near its end
const CHAOS_STAGGER = 0.003;
const CHAOS_DURATION = 0.1;
const HERO_DELAY =
	(SCATTER_CONFIG.count - 1) * CHAOS_STAGGER + CHAOS_DURATION * 0.6;
const HERO_STAGGER = 0.25;
const HEADER_DELAY = HERO_DELAY + HERO_STAGGER * 2;

const EFFECT_RADIUS = 150;
const MAX_REPULSE = 30;
const MAX_SCALE = 1.4;
const BASE_OPACITY = 0.25;
const MAX_OPACITY = 1.0;

const heroVariants = {
	hidden: { scale: 0.8, opacity: 0, filter: "blur(12px)" },
	visible: { scale: 1, opacity: 1, filter: "blur(0px)" },
};

const heroTransition = { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] } as const;

const FONT_ITEMS = [
	"Playfair Display",
	"Source Serif 4",
	"JetBrains Mono",
	"Inter",
	"Geist Mono",
	"IBM Plex Sans",
	"IBM Plex Mono",
	"Space Grotesk",
	"DM Sans",
	"Fira Code",
	"DM Serif Display",
	"Libre Baskerville",
	"Geist",
	"Manrope",
];

function generateScatterPositions(
	count: number,
	bounds: { width: number; height: number },
	config: typeof SCATTER_CONFIG,
): Array<{ x: number; y: number }> {
	const { minDistance, innerRadius, maxAttempts } = config;
	const cx = bounds.width / 2;
	const cy = bounds.height / 2;
	// outer radius — half the shorter dimension minus a small margin
	const outerRadius = Math.min(bounds.width, bounds.height) / 2 - 40;
	const positions: Array<{ x: number; y: number }> = [];

	for (let i = 0; i < count; i++) {
		let placed = false;
		for (let attempt = 0; attempt < maxAttempts; attempt++) {
			// uniform random point in annulus: r² is uniform in [inner², outer²]
			const r = Math.sqrt(
				Math.random() *
					(outerRadius * outerRadius - innerRadius * innerRadius) +
					innerRadius * innerRadius,
			);
			const angle = Math.random() * 2 * Math.PI;
			const x = cx + r * Math.cos(angle);
			const y = cy + r * Math.sin(angle);

			const tooClose = positions.some((pos) => {
				const dx = pos.x - x;
				const dy = pos.y - y;
				return Math.sqrt(dx * dx + dy * dy) < minDistance;
			});

			if (!tooClose) {
				positions.push({ x, y });
				placed = true;
				break;
			}
		}
		if (!placed) break;
	}

	return positions;
}

function Header({
	darkIcon,
	setDarkIcon,
}: {
	darkIcon: boolean;
	setDarkIcon: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<motion.header
			className="fixed top-6 left-1/2 z-50 flex items-center gap-1
				bg-black/90 backdrop-blur-md rounded-full
				px-2 py-1.5 shadow-2xl border border-white/10"
			style={{ x: "-50%" }}
			variants={{
				hidden: { y: -80, opacity: 0, scale: 0.8, filter: "blur(8px)" },
				visible: { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
			}}
			initial="hidden"
			animate="visible"
			transition={{ ...heroTransition, delay: HEADER_DELAY }}
		>
			<a
				href="/"
				className="text-white font-['Manrope'] font-bold text-sm tracking-tight px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
			>
				Fonttrio
			</a>

			{/* <div className="w-px h-5 bg-white/15" /> */}

			<nav className="flex items-center gap-0.5 pl-20 pr-2">
				<a
					href="/pairings"
					className="text-white/60 hover:text-white text-xs font-['Manrope'] font-medium tracking-tight px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
				>
					Pairings
				</a>
				<a
					href="/fonts"
					className="text-white/60 hover:text-white text-xs font-['Manrope'] font-medium tracking-tight px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
				>
					Fonts
				</a>
			</nav>

			<div className="w-px h-5 bg-white/15 mr-2" />
			<Button
				size="xs"
				className="rounded-full text-foreground bg-muted hover:bg-muted/80 transition-colors cursor-pointer text-xs font-['Manrope'] font-medium tracking-tight"
			>
				Sponsor
			</Button>

			<Button
				size="icon"
				variant="ghost"
				className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white cursor-pointer"
				onClick={() => setDarkIcon((d) => !d)}
			>
				{darkIcon ? <Moon className="size-4" /> : <Sun className="size-4" />}
			</Button>
		</motion.header>
	);
}

export default function Redesign04() {
	const [fonts, setItems] = useState<
		Array<{
			x: number;
			y: number;
			label: string;
			rotation: number;
			floatDuration: number;
			floatDelay: number;
			floatAmplitude: number;
		}>
	>([]);

	const [darkIcon, setDarkIcon] = useState(false);
	const elemsRef = useRef<HTMLDivElement[]>([]);
	const gradientRef = useRef<HTMLDivElement>(null);
	const heroRef = useRef<HTMLDivElement>(null);
	const chaosContainerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"],
	});

	const titleY = useTransform(scrollYProgress, [0, 0.6], [0, -300]);
	const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
	const titleBlur = useTransform(scrollYProgress, [0, 0.4], [0, 20]);
	const buttonY = useTransform(scrollYProgress, [0, 0.6], [0, -180]);
	const buttonOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
	const buttonBlur = useTransform(scrollYProgress, [0, 0.3], [0, 12]);
	const titleFilter = useTransform(titleBlur, (v) => `blur(${v}px)`);
	const buttonFilter = useTransform(buttonBlur, (v) => `blur(${v}px)`);
	const dotOpacity = useTransform(scrollYProgress, [0, 0.4], [0.2, 0]);

	// Single CSS variable drives all 200 ChaosFont scroll animations —
	// no per-component useTransform, no React overhead, pure compositor work
	useEffect(() => {
		const unsubscribe = scrollYProgress.on("change", (v) => {
			chaosContainerRef.current?.style.setProperty("--scroll-p", `${v}`);
		});
		return unsubscribe;
	}, [scrollYProgress]);

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

	useEffect(() => {
		const bounds = { width: window.innerWidth, height: window.innerHeight };
		const positions = generateScatterPositions(
			SCATTER_CONFIG.count,
			bounds,
			SCATTER_CONFIG,
		);
		setItems(
			positions.map((pos, i) => ({
				...pos,
				label: FONT_ITEMS[i % FONT_ITEMS.length],
				rotation: (Math.random() - 0.5) * 60,
				floatDuration: 3 + Math.random() * 5,
				floatDelay: -(Math.random() * 8),
				floatAmplitude: 4 + Math.random() * 10,
			})),
		);
	}, []);

	// Pointer-driven repulsion + progressive scale/opacity.
	// rAF-throttled so at most one DOM write per frame.
	useEffect(() => {
		if (!fonts.length) return;

		let rafId = 0;
		let px = 0;
		let py = 0;

		const tick = () => {
			rafId = 0;
			elemsRef.current.forEach((el, i) => {
				const font = fonts[i];
				if (!el || !font) return;
				const dx = font.x - px;
				const dy = font.y - py;
				const dist = Math.sqrt(dx * dx + dy * dy) || 1;

				if (dist > EFFECT_RADIUS) {
					el.style.setProperty("--repulse-x", "0px");
					el.style.setProperty("--repulse-y", "0px");
					el.style.setProperty("--cursor-scale", "1");
					el.style.setProperty("--cursor-opacity", `${BASE_OPACITY}`);
					return;
				}

				const t = 1 - dist / EFFECT_RADIUS;
				const eased = 1 - (1 - t) ** 3;

				const repulseX = (dx / dist) * eased * MAX_REPULSE;
				const repulseY = (dy / dist) * eased * MAX_REPULSE;
				const scale = 1 + eased * (MAX_SCALE - 1);
				const opacity = BASE_OPACITY + eased * (MAX_OPACITY - BASE_OPACITY);

				el.style.setProperty("--repulse-x", `${repulseX}px`);
				el.style.setProperty("--repulse-y", `${repulseY}px`);
				el.style.setProperty("--cursor-scale", `${scale}`);
				el.style.setProperty("--cursor-opacity", `${opacity}`);
			});
		};

		const onPointerMove = (e: PointerEvent) => {
			px = e.x;
			py = e.y;
			if (gradientRef.current) {
				gradientRef.current.style.setProperty("--cursor-x", `${e.x}px`);
				gradientRef.current.style.setProperty("--cursor-y", `${e.y}px`);
				gradientRef.current.style.opacity = "1";
			}
			if (!rafId) rafId = requestAnimationFrame(tick);
		};

		const onPointerLeave = () => {
			if (gradientRef.current) {
				gradientRef.current.style.opacity = "0";
			}
			elemsRef.current.forEach((el) => {
				if (!el) return;
				el.style.setProperty("--repulse-x", "0px");
				el.style.setProperty("--repulse-y", "0px");
				el.style.setProperty("--cursor-scale", "1");
				el.style.setProperty("--cursor-opacity", `${BASE_OPACITY}`);
			});
		};

		window.addEventListener("pointermove", onPointerMove, { passive: true });
		document.documentElement.addEventListener("pointerleave", onPointerLeave);
		return () => {
			window.removeEventListener("pointermove", onPointerMove);
			document.documentElement.removeEventListener(
				"pointerleave",
				onPointerLeave,
			);
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, [fonts]);

	return (
		<main className="w-screen overflow-x-hidden bg-black">
			<div ref={heroRef} style={{ height: "200vh", position: "relative" }}>
				<div className="sticky top-0 h-screen p-3">
					<div className="w-full h-full bg-white rounded-4xl">
						<Header darkIcon={darkIcon} setDarkIcon={setDarkIcon} />

						<motion.div
							style={{
								width: "100%",
								height: "100vh",
								position: "absolute",
								top: 0,
								left: 0,
								padding: "20px",
								opacity: dotOpacity,
							}}
						>
							<DotGrid
								dotSize={2}
								gap={30}
								baseColor="#1c1c1c"
								activeColor="#a1a1a1"
								proximity={200}
								shockRadius={10}
								shockStrength={10}
								resistance={100}
								returnDuration={2.9}
							/>
						</motion.div>

						<div className="size-full flex flex-col items-center justify-center relative z-40 py-[10vh]">
							<motion.h1
								id="title"
								className="text-9xl font-medium tracking-tight text-[#2C2C2A] font-['Manrope'] text-center leading-30"
								variants={heroVariants}
								initial="hidden"
								animate="visible"
								transition={{ ...heroTransition, delay: HERO_DELAY }}
								style={{
									y: titleY,
									opacity: titleOpacity,
									filter: titleFilter,
								}}
							>
								Three fonts
								<br />
								One{" "}
								<span className="italic font-['Playfair_Display'] text-[#2C2C2A]">
									command
								</span>
							</motion.h1>

							<motion.div
								id="button"
								variants={heroVariants}
								initial="hidden"
								animate="visible"
								transition={{
									...heroTransition,
									delay: HERO_DELAY + HERO_STAGGER,
								}}
								style={{ y: buttonY, opacity: buttonOpacity, filter: buttonFilter }}
							>
								<Button className="text-md font-['Manrope'] justify-between font-medium h-12 w-[15vw] px-6 rounded-full mt-10 cursor-pointer">
									Find font
									<Search />
								</Button>
							</motion.div>
						</div>

						<div
							ref={chaosContainerRef}
							className="size-full absolute top-0 left-0 z-10 overflow-hidden"
							style={{ "--scroll-p": "0" } as React.CSSProperties}
						>
							<div
								ref={gradientRef}
								className="absolute inset-0 pointer-events-none z-0"
								style={
									{
										"--cursor-x": "-9999px",
										"--cursor-y": "-9999px",
										background: `radial-gradient(circle ${EFFECT_RADIUS}px at var(--cursor-x) var(--cursor-y),
										transparent 0%,
										transparent 60%,
										rgba(0, 0, 0, 0.03) 80%,
										rgba(0, 0, 0, 0.05) 92%,
										transparent 100%
									)`,
										opacity: 0,
										transition: "opacity 0.4s ease-out",
									} as React.CSSProperties
								}
							/>
							{fonts.map((item, i) => (
								<ChaosFont
									item={item}
									index={i}
									key={i}
									ref={(el) => {
										if (el) elemsRef.current[i] = el;
									}}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			<section className="relative z-20 bg-black min-h-screen p-3">
				<div className="bg-white rounded-4xl min-h-screen flex items-center justify-center">
					<p className="text-4xl font-['Manrope'] text-[#2C2C2A]">
						Next section
					</p>
				</div>
			</section>
		</main>
	);
}

// Scroll exit uses CSS calc() with inherited --scroll-p from parent container.
// This means 0 useTransform hooks × 200 items = 0 motion subscriptions.
// Only opacity + scale are animated (compositor-friendly, no blur repaint).
const ChaosFont = React.forwardRef<
	HTMLDivElement,
	{
		item: {
			x: number;
			y: number;
			label: string;
			rotation: number;
			floatDuration: number;
			floatDelay: number;
			floatAmplitude: number;
		};
		index: number;
	}
>(({ item, index }, ref) => {
	return (
		<div
			className="absolute pointer-events-none"
			style={
				{
					left: item.x,
					top: item.y,
					translate: "-50% -50%",
					"--exit-scale":
						"clamp(0, (0.5 - var(--scroll-p)) / 0.45, 1)",
					scale: "var(--exit-scale)",
					"--exit-opacity":
						"clamp(0, (0.45 - var(--scroll-p)) / 0.35, 1)",
					opacity: "var(--exit-opacity)",
					willChange: "transform, opacity",
				} as React.CSSProperties
			}
		>
			<motion.div
				initial={{ scale: 0, opacity: 0, filter: "blur(8px)" }}
				animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
				transition={{
					delay: index * CHAOS_STAGGER,
					duration: CHAOS_DURATION,
					ease: [0.34, 1.56, 0.64, 1],
				}}
			>
			<div
				ref={ref}
				style={{
					"--rotate": `${item.rotation}deg`,
					"--float-amp": `${item.floatAmplitude}px`,
					"--repulse-x": "0px",
					"--repulse-y": "0px",
					"--cursor-scale": "1",
					"--cursor-opacity": `${BASE_OPACITY}`,
					animation: `levitate ${item.floatDuration}s ease-in-out ${item.floatDelay}s infinite`,
					transform:
						"rotate(var(--rotate)) translate(var(--repulse-x), var(--repulse-y)) scale(var(--cursor-scale))",
					transition: "transform 0.3s ease-out",
				}}
			>
				<p
					className="text-sm text-black whitespace-nowrap select-none"
					style={{
						opacity: "var(--cursor-opacity)",
						transition: "opacity 0.3s ease-out",
					}}
				>
					{item.label}
				</p>
			</div>
			</motion.div>
		</div>
	);
});
ChaosFont.displayName = "ChaosFont";
