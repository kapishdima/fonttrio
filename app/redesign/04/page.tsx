"use client";

import { Search } from "lucide-react";
import { motion } from "motion/react";
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

const EFFECT_RADIUS = 250;
const MAX_REPULSE = 30;
const MAX_SCALE = 1.4;
const BASE_OPACITY = 0.4;
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

	const elemsRef = useRef<HTMLDivElement[]>([]);

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
			if (!rafId) rafId = requestAnimationFrame(tick);
		};

		const onPointerLeave = () => {
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
			document.documentElement.removeEventListener("pointerleave", onPointerLeave);
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, [fonts]);

	return (
		<main className="w-screen overflow-x-hidden bg-black">
			<div className="w-screen h-screen relative p-3">
				<div className="w-full h-full bg-white rounded-4xl">
					{/* <header className="w-full flex justify-center sticky z-10">
						<nav className="w-[50vw] px-8 py-5 rounded-xl bg-black rounded-tr-none rounded-tl-none shadow-xl">
							<a href="/" className="text-white mb-1 text-2xl font-bold">
								Fonttrio
							</a>
						</nav>
					</header> */}
					<div
						style={{
							width: "100%",
							height: "100vh",
							position: "absolute",
							top: 0,
							left: 0,
							padding: "20px",
							opacity: 0.2,
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
					</div>

					<div className="size-full flex flex-col items-center justify-center relative z-10 py-[10vh]">
						<motion.h1
							id="title"
							className="text-9xl font-medium tracking-tight text-[#2C2C2A] font-['Manrope'] text-center leading-30"
							variants={heroVariants}
							initial="hidden"
							animate="visible"
							transition={{ ...heroTransition, delay: HERO_DELAY }}
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
						>
							<Button className="text-md font-['Manrope'] justify-between font-medium h-12 w-[15vw] px-6 rounded-full mt-10 cursor-pointer">
								Find font
								<Search />
							</Button>
						</motion.div>
					</div>

					<div className="size-full absolute top-0 left-0 z-10 pointer-events-none overflow-hidden">
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
		</main>
	);
}

// Two-layer structure keeps motion (entrance) and CSS (levitate + rotate) independent:
// motion.div  → handles position + staggered entrance (opacity, scale, filter)
// inner div   → holds ref for JS --rotate tracking + CSS levitate animation
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
		<motion.div
			className="absolute"
			style={{
				left: item.x,
				top: item.y,
				translateX: "-50%",
				translateY: "-50%",
			}}
			initial={{ scale: 0, opacity: 0, filter: "blur(8px)" }}
			animate={{ scale: 1, opacity: 1, filter: "blur(1px)" }}
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
					transform: "rotate(var(--rotate)) translate(var(--repulse-x), var(--repulse-y)) scale(var(--cursor-scale))",
					transition: "transform 0.3s ease-out",
				}}
			>
				<p
					className="text-sm text-black whitespace-nowrap select-none"
					style={{ opacity: "var(--cursor-opacity)", transition: "opacity 0.3s ease-out" }}
				>
					{item.label}
				</p>
			</div>
		</motion.div>
	);
});
ChaosFont.displayName = "ChaosFont";
