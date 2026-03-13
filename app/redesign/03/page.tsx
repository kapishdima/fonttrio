"use client";

import {
	MotionValue,
	motion,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import Lenis from "lenis";
import { ArrowRight, Check, Copy, MousePointer2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { SPONSORS } from "@/lib/sponsors";
import Magnet from "./components/Magnet";

// --- THEME COLORS ---
const THEME = {
	bg: "#F7F7F5",
	text: "#2C2C2A",
	textMuted: "#737370",
	accent: "#EAE8E1",
	accentHover: "#DCE0D9",
	border: "#E5E3DB",
};

// --- DATA ---
const CHAOS_FONTS_BASE = [
	{ name: "Arial", font: "sans-serif", weight: 400 },
	{ name: "Times New Roman", font: "serif", weight: 400 },
	{ name: "Comic Sans", font: "cursive", weight: 400 },
	{ name: "Impact", font: "sans-serif", weight: 900 },
	{ name: "Courier New", font: "monospace", weight: 400 },
	{ name: "Verdana", font: "sans-serif", weight: 400 },
	{ name: "Georgia", font: "serif", weight: 400 },
	{ name: "Trebuchet MS", font: "sans-serif", weight: 400 },
	{ name: "Papyrus", font: "fantasy", weight: 400 },
	{ name: "Brush Script", font: "cursive", weight: 400 },
	{ name: "Tahoma", font: "sans-serif", weight: 400 },
	{ name: "Palatino", font: "serif", weight: 400 },
	{ name: "Helvetica", font: "sans-serif", weight: 700 },
	{ name: "Garamond", font: "serif", weight: 400 },
	{ name: "Lucida Console", font: "monospace", weight: 400 },
];

const COLS = 10;
const ROWS = 10;
const CHAOS_FONTS = Array.from({ length: 100 }).map((_, i) => {
	const base = CHAOS_FONTS_BASE[i % CHAOS_FONTS_BASE.length];

	const col = i % COLS;
	const row = Math.floor(i / COLS);

	const cellWidth = 110 / COLS;
	const cellHeight = 110 / ROWS;

	const baseX = -5 + col * cellWidth + cellWidth / 2;
	const baseY = -5 + row * cellHeight + cellHeight / 2;

	const jitterX = ((i * 17) % 20) - 10;
	const jitterY = ((i * 23) % 20) - 10;

	const angle = Math.atan2(baseY + jitterY - 50, baseX + jitterX - 50);
	const distance = 800 + ((i * 197) % 1500);

	return {
		...base,
		id: `chaos-${i}`,
		initialX: baseX + jitterX,
		initialY: baseY + jitterY,
		scale: 0.6 + ((i * 13) % 15) / 10, // Slightly more varied scale
		rotation: -30 + ((i * 41) % 60),
		scatterX: Math.cos(angle) * distance,
		scatterY: Math.sin(angle) * distance,
	};
});

const PAIRINGS = [
	{
		id: "agency",
		name: "Agency",
		heading: "Syne",
		body: "Inter",
		headingFont: "'Syne', sans-serif",
		bodyFont: "'Inter', sans-serif",
	},
	{
		id: "editorial",
		name: "Editorial",
		heading: "Playfair Display",
		body: "Space Mono",
		headingFont: "'Playfair Display', serif",
		bodyFont: "'Space Mono', monospace",
	},
	{
		id: "modern",
		name: "Modern",
		heading: "Bodoni Moda",
		body: "Helvetica",
		headingFont: "'Bodoni Moda', serif",
		bodyFont: "sans-serif",
	},
	{
		id: "brutal",
		name: "Brutal",
		heading: "Bebas Neue",
		body: "Inter",
		headingFont: "'Bebas Neue', sans-serif",
		bodyFont: "'Inter', sans-serif",
	},
];

const TWEETS = [
	{
		handle: "@dev_designer",
		name: "Sarah K.",
		text: "Spent 4 hours tweaking layout.tsx font loading yesterday. Found FontTrio today. I am both angry and relieved.",
	},
	{
		handle: "@ui_engineer",
		name: "Tom M.",
		text: "npx shadcn add @fonttrio/editorial just saved my freelance project. The typography is *chef's kiss*.",
	},
	{
		handle: "@frontend_ninja",
		name: "Elena R.",
		text: "Why wasn't typography always this easy? The registry pattern is undefeated.",
	},
	{
		handle: "@nextjs_fan",
		name: "Marcus T.",
		text: "No more wrestling with Next/Font config. Copy, paste, beautiful.",
	},
	{
		handle: "@css_wizard",
		name: "Alex B.",
		text: "FontTrio is the shadcn/ui of typography. Game changer.",
	},
	{
		handle: "@design_dev",
		name: "Nina W.",
		text: "Finally, I don't have to pretend I know how to pair serif fonts anymore.",
	},
];

// --- COMPONENTS ---

const FloatingHeader = () => {
	return (
		<motion.header
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
			className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 w-[90%] max-w-2xl bg-[#F7F7F5]/80 backdrop-blur-xl border border-[#E5E3DB] rounded-full shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]"
		>
			<Magnet padding={20} magnetStrength={0.2}>
				<Link href="/redesign/03" className="flex items-center gap-2 cursor-pointer p-2">
					<div className="w-6 h-6 rounded-full bg-[#2C2C2A]" />
					<span className="font-medium text-sm tracking-tight text-[#2C2C2A]">
						FontTrio
					</span>
				</Link>
			</Magnet>

			<nav className="hidden md:flex items-center gap-2">
				<Magnet padding={20} magnetStrength={0.2}>
					<Link
						href="/redesign/03/pairs"
						className="block text-sm text-[#737370] hover:text-[#2C2C2A] transition-colors px-4 py-2"
					>
						Pairs
					</Link>
				</Magnet>
				<Magnet padding={20} magnetStrength={0.2}>
					<Link
						href="/redesign/03/fonts"
						className="block text-sm text-[#737370] hover:text-[#2C2C2A] transition-colors px-4 py-2"
					>
						Fonts
					</Link>
				</Magnet>
				<Magnet padding={20} magnetStrength={0.2}>
					<Link
						href="#"
						className="block text-sm text-[#737370] hover:text-[#2C2C2A] transition-colors px-4 py-2"
					>
						Docs
					</Link>
				</Magnet>
			</nav>

			<Magnet padding={20} magnetStrength={0.2}>
				<button
					type="button"
					className="px-4 py-2 bg-[#2C2C2A] text-[#F7F7F5] rounded-full text-sm font-medium hover:bg-[#40403e] transition-colors"
				>
					Get Started
				</button>
			</Magnet>
		</motion.header>
	);
};

type ChaosFontType = {
	id: string;
	name: string;
	font: string;
	weight: number;
	initialX: number;
	initialY: number;
	scale: number;
	rotation: number;
	scatterX: number;
	scatterY: number;
};

const ChaosFont = ({
	font,
	progress,
	mousePos,
}: {
	font: ChaosFontType;
	progress: MotionValue<number>;
	mousePos: { x: number; y: number };
}) => {
	const scrollX = useTransform(progress, [0, 0.2], [0, font.scatterX]);
	const scrollY = useTransform(progress, [0, 0.2], [0, font.scatterY]);
	const scrollOpacity = useTransform(progress, [0, 0.2], [0.35, 0]);

	// Magnetic Repel Calculation
	const elX =
		typeof window !== "undefined"
			? (window.innerWidth * font.initialX) / 100
			: 0;
	const elY =
		typeof window !== "undefined"
			? (window.innerHeight * font.initialY) / 100
			: 0;
	const dx = mousePos.x - elX;
	const dy = mousePos.y - elY;
	const dist = Math.sqrt(dx * dx + dy * dy);

	const isScrolled = progress.get() > 0.01;
	const repulseForce = !isScrolled && dist < 200 ? (200 - dist) / 1.5 : 0;
	const repulseX = dist > 0 ? -(dx / dist) * repulseForce : 0;
	const repulseY = dist > 0 ? -(dy / dist) * repulseForce : 0;

	// Spring physics for repel
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const finalX = useSpring(
		useTransform(() => scrollX.get() + repulseX),
		{ stiffness: 100, damping: 20 },
	);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const finalY = useSpring(
		useTransform(() => scrollY.get() + repulseY),
		{ stiffness: 100, damping: 20 },
	);

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 0.35, scale: font.scale }}
			transition={{
				duration: 1.5,
				ease: "easeOut",
				delay: ((font.initialX * font.initialY) % 50) / 100,
			}}
			className="absolute origin-center"
			style={{
				left: `${font.initialX}%`,
				top: `${font.initialY}%`,
			}}
		>
			<motion.div
				className="text-2xl md:text-3xl lg:text-4xl text-[#2C2C2A] whitespace-nowrap"
				style={{
					fontFamily: font.font,
					fontWeight: font.weight,
					x: finalX,
					y: finalY,
					rotate: font.rotation,
					opacity: scrollOpacity,
				}}
				animate={{
					y: [0, -10, 0], // Idle floating
					rotate: [font.rotation, font.rotation + 2, font.rotation],
				}}
				transition={{
					repeat: Infinity,
					duration: 3 + (font.initialX % 10) / 2, // Randomize idle float duration
					ease: "easeInOut",
				}}
			>
				{font.name}
			</motion.div>
		</motion.div>
	);
};

const HeroChaos = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 50,
		damping: 20,
	});

	// Typography Reveal Logic (Fixed)
	// Show it remotely blurred initially to encourage scrolling
	const textOpacity = useTransform(
		smoothProgress,
		[0, 0.05, 0.8, 1],
		[0.3, 1, 1, 0],
	);

	const textBlurString = useTransform(
		smoothProgress,
		[0, 0.05],
		["blur(25px)", "blur(0px)"],
	);

  // Instead of a massive scale, just a gentle parallax upward while fading
  // Also start slightly smaller so it feels distant
	const textScale = useTransform(smoothProgress, [0, 0.05], [0.8, 1]);
	const textY = useTransform(smoothProgress, [0.5, 1], [0, -200]);

	const indicatorOpacity = useTransform(smoothProgress, [0, 0.02], [1, 0]);

	const handleMouseMove = (e: React.MouseEvent) => {
		setMousePos({ x: e.clientX, y: e.clientY });
	};

	return (
		<div
			ref={containerRef}
			className="relative w-full h-[250vh] flex flex-col items-center justify-start bg-[#F7F7F5]"
		>
			{/* Put onMouseMove on a div that covers the screen but isn't static text to avoid ARIA warnings */}
			<div 
				className="absolute inset-0 z-50 pointer-events-auto cursor-default" 
				onMouseMove={handleMouseMove}
        onKeyDown={() => {}}
        role="presentation"
			/>
			<div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pointer-events-none">
				{/* Background chaotic fonts */}
				<div className="absolute inset-0 pointer-events-none z-0">
					{CHAOS_FONTS.map((font) => (
						<ChaosFont
							key={font.id}
							font={font}
							progress={smoothProgress}
							mousePos={mousePos}
						/>
					))}
				</div>

				{/* Main Copy */}
				<div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 pointer-events-none overflow-visible">
					<motion.div
						className="flex flex-col items-center justify-center origin-center"
						style={{
							opacity: textOpacity,
							filter: textBlurString,
							y: textY,
							scale: textScale,
						}}
					>
						<h1 className="text-5xl md:text-7xl lg:text-9xl font-medium tracking-tight text-[#2C2C2A] mb-6 font-['Inter'] text-center leading-tight">
							Stop guessing.
							<br />
							Start{" "}
							<span className="italic font-['Playfair_Display'] text-[#2C2C2A]">
								shipping.
							</span>
						</h1>
						<p className="text-lg md:text-2xl text-[#737370] max-w-2xl mx-auto leading-relaxed text-center">
							Scroll to blow away the noise and discover the typography registry
							for modern developers.
						</p>
					</motion.div>

					<motion.div
						className="absolute bottom-12 flex flex-col items-center gap-2 text-[#737370]"
						style={{ opacity: indicatorOpacity }}
						animate={{ y: [0, 10, 0] }}
						transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
					>
						<MousePointer2 className="w-5 h-5" />
						<span className="text-xs uppercase tracking-widest font-medium">
							Scroll
						</span>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

const ScrollRevealText = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const words = [
		{ text: "Choosing", id: "w1" },
		{ text: "fonts", id: "w2" },
		{ text: "takes", id: "w3" },
		{ text: "hours.", id: "w4" },
		{ text: "Adjusting", id: "w5" },
		{ text: "line", id: "w6" },
		{ text: "heights", id: "w7" },
		{ text: "takes", id: "w8" },
		{ text: "longer.", id: "w9" },
		{ text: "You", id: "w10" },
		{ text: "write", id: "w11" },
		{ text: "the", id: "w12" },
		{ text: "logic.", id: "w13" },
		{ text: "Let", id: "w14" },
		{ text: "us", id: "w15" },
		{ text: "handle", id: "w16" },
		{ text: "the", id: "w17" },
		{ text: "aesthetics.", id: "w18" },
	];

	return (
		<section
			ref={containerRef}
			className="h-[200vh] bg-[#F7F7F5] relative z-20"
		>
			<div className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-12 max-w-5xl mx-auto">
				<h2 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight text-[#2C2C2A] flex flex-wrap justify-center gap-x-3 md:gap-x-4 gap-y-2">
					{words.map((word) => {
						return (
							<Word
								key={`word-${word.id}`}
								word={word.text}
								index={words.indexOf(word)}
								total={words.length}
								scrollYProgress={scrollYProgress}
							/>
						);
					})}
				</h2>
			</div>
		</section>
	);
};

const Word = ({
	word,
	index,
	total,
	scrollYProgress,
}: {
	word: string;
	index: number;
	total: number;
	scrollYProgress: MotionValue<number>;
}) => {
	const revealRange = 0.7;
	const start = (index / total) * revealRange;
	const end = start + (1 / total) * revealRange;

	const rawOpacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
	const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 30 });

	return (
		<motion.span style={{ opacity }} className="inline-block">
			{word}
		</motion.span>
	);
};

const ThePainVsSolution = () => {
	const [copied, setCopied] = useState(false);
	const command = "npx shadcn add @fonttrio/agency";

	const handleCopy = () => {
		navigator.clipboard.writeText(command);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<section className="py-24 px-6 relative z-20 bg-[#F7F7F5]">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h3 className="text-3xl md:text-5xl font-medium tracking-tight text-[#2C2C2A] mb-4">
						The manual way is broken.
					</h3>
					<p className="text-[#737370] text-lg">
						Stop polluting your globals.css and layout.tsx with boilerplate.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
					{/* THE PAIN */}
					<div className="relative bg-white border border-[#E5E3DB] rounded-3xl p-6 md:p-8 flex flex-col overflow-hidden h-[400px]">
						<div className="absolute top-4 right-6 bg-[#FFEDED] text-[#FF4545] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
							Manual Labor
						</div>

						<div className="flex gap-2 mb-6 border-b border-[#E5E3DB] pb-4">
							<div className="px-3 py-1 bg-[#F7F7F5] rounded-md text-xs font-mono text-[#737370] border border-[#E5E3DB]">
								layout.tsx
							</div>
							<div className="px-3 py-1 bg-white rounded-md text-xs font-mono text-[#2C2C2A] border-t border-l border-r border-[#E5E3DB] -mb-[17px] z-10 shadow-[0_-2px_4px_rgba(0,0,0,0.02)]">
								globals.css
							</div>
						</div>

						<div className="font-mono text-xs md:text-sm text-[#737370] leading-relaxed overflow-hidden opacity-50 relative">
							<pre>
								{`:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-serif: 'Playfair Display', Georgia;
  --font-mono: 'Space Mono', monospace;

  --base-size: 16px;
  --scale-ratio: 1.25;
  --h1-size: calc(var(--base-size) * ...);
  /* Wait, what was the optimal line height? */
}

body {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: var(--font-serif);
  letter-spacing: -0.02em;
}`}
							</pre>
							<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
						</div>
					</div>

					{/* THE SOLUTION */}
					<div className="relative bg-[#EAE8E1] border border-[#DCE0D9] rounded-3xl p-6 md:p-8 flex flex-col justify-center items-center h-[400px]">
						<div className="absolute top-4 right-6 bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
							FontTrio
						</div>

						<motion.div
							className="w-full max-w-md bg-white rounded-2xl p-6 border border-[#E5E3DB] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] cursor-pointer group hover:border-[#2C2C2A] transition-colors"
							onClick={handleCopy}
							whileHover={{ scale: 1.02 }}
						>
							<div className="flex items-center gap-4">
								<span className="text-[#737370] font-mono">$</span>
								<code className="font-mono text-[#2C2C2A] text-sm md:text-base font-semibold">
									{command}
								</code>
							</div>
							<div className="mt-6 flex justify-between items-center pt-4 border-t border-[#E5E3DB]">
								<span className="text-xs text-[#737370] flex items-center gap-2">
									<Check className="w-3 h-3 text-[#2E7D32]" /> Automatically
									configures Tailwind
								</span>
								{copied ? (
									<Check className="w-4 h-4 text-[#2C2C2A]" />
								) : (
									<Copy className="w-4 h-4 text-[#737370] group-hover:text-[#2C2C2A] transition-colors" />
								)}
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

const TypographyTransformation = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	// Widen the scroll range and add spring physics to the clipping
	const rawClipPercentage = useTransform(scrollYProgress, [0.1, 0.9], [100, 0]);
	const clipPercentage = useSpring(rawClipPercentage, {
		stiffness: 40,
		damping: 20,
	});

	const clipPath = useTransform(
		clipPercentage,
		(val) => `inset(0 ${val}% 0 0)`,
	);
	const lineRight = useTransform(clipPercentage, (val) => `${val}%`);

	return (
		<section
			ref={containerRef}
			className="h-[200vh] relative z-20 bg-[#F7F7F5] py-24"
		>
			<div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
				<div className="text-center mb-12">
					<h3 className="text-3xl md:text-4xl font-medium tracking-tight text-[#2C2C2A] mb-4">
						The difference is in the details.
					</h3>
					<p className="text-[#737370] text-lg">
						Scroll to transform system defaults into a premium reading
						experience.
					</p>
				</div>

				<div className="relative w-full max-w-5xl aspect-[4/5] md:aspect-[16/9] rounded-3xl overflow-hidden border border-[#E5E3DB] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] bg-white">
					{/* Mock Browser Header */}
					<div className="absolute top-0 left-0 right-0 h-12 bg-[#F7F7F5] border-b border-[#E5E3DB] flex items-center px-4 gap-2 z-30">
						<div className="w-3 h-3 rounded-full bg-[#E5E3DB]" />
						<div className="w-3 h-3 rounded-full bg-[#E5E3DB]" />
						<div className="w-3 h-3 rounded-full bg-[#E5E3DB]" />
						<div className="mx-auto w-1/2 h-6 bg-white border border-[#E5E3DB] rounded-md flex items-center justify-center text-[10px] text-[#737370] font-mono">
							fonttrio.com/showcase
						</div>
					</div>

					{/* BAD TYPOGRAPHY (Base layer) */}
					<div className="absolute inset-0 pt-24 p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white">
						<span className="font-['Arial'] text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">
							Before (System Defaults)
						</span>
						<h3 className="font-['Impact'] text-5xl md:text-7xl text-black mb-4 leading-[0.9] tracking-tighter">
							THE EVOLUTION OF DIGITAL INTERFACES
						</h3>
						<p className="font-['Times_New_Roman'] text-base md:text-lg text-black leading-none mt-2 max-w-3xl">
							In the early days of the web, typography was an afterthought.
							Designers were constrained by standard system fonts like Arial,
							Times New Roman, and Courier. Text was crammed together, leading
							to terrible readability and a poor user experience. Good
							typography is invisible, but bad typography screams at you.
						</p>
					</div>

					{/* GOOD TYPOGRAPHY (Overlay with clip-path) */}
					<motion.div
						style={{ clipPath }}
						className="absolute inset-0 pt-24 p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-[#EAE8E1] z-10"
					>
						<span className="font-mono text-[10px] font-bold text-[#737370] mb-4 uppercase tracking-widest">
							After (FontTrio Curated)
						</span>
						<h3 className="font-['Playfair_Display'] italic text-5xl md:text-7xl text-[#2C2C2A] mb-8 leading-[1.1] tracking-tight">
							The Evolution of Digital Interfaces
						</h3>
						<p className="font-['Inter'] text-sm md:text-base text-[#737370] leading-relaxed max-w-3xl font-light">
							In the early days of the web, typography was an afterthought.
							Designers were constrained by standard system fonts like Arial,
							Times New Roman, and Courier. Text was crammed together, leading
							to terrible readability and a poor user experience. Good
							typography is invisible, but bad typography screams at you.
						</p>
					</motion.div>

					{/* Floating Line / Indicator */}
					<motion.div
						className="absolute top-12 bottom-0 w-[2px] bg-[#2C2C2A]/10 z-20 pointer-events-none"
						style={{ right: lineRight }}
					>
						<div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white border border-[#E5E3DB] text-[#2C2C2A] rounded-full flex items-center justify-center shadow-lg px-4 py-2 font-mono text-[10px] uppercase tracking-widest whitespace-nowrap gap-2">
							<ArrowRight className="w-3 h-3 rotate-180" />
							Drag
							<ArrowRight className="w-3 h-3" />
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

const Testimonials = () => {
	return (
		<section className="py-24 px-6 border-t border-[#E5E3DB] bg-[#F7F7F5]">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h3 className="text-3xl font-medium tracking-tight text-[#2C2C2A] mb-4">
						Loved by engineers.
					</h3>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{TWEETS.map((tweet) => (
						<motion.div
							key={`tweet-${tweet.handle}`}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5 }}
							className="bg-white border border-[#E5E3DB] rounded-3xl p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.02)]"
						>
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 rounded-full bg-[#EAE8E1]" />
								<div>
									<div className="text-sm font-semibold text-[#2C2C2A]">
										{tweet.name}
									</div>
									<div className="text-xs text-[#737370]">{tweet.handle}</div>
								</div>
							</div>
							<p className="text-[#2C2C2A] text-sm leading-relaxed">
								{tweet.text}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

const PairingsGrid = () => {
	return (
		<section className="py-24 px-6 bg-[#F7F7F5]">
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-end mb-12">
					<h3 className="text-3xl md:text-4xl font-medium tracking-tight text-[#2C2C2A]">
						Featured Pairings
					</h3>
					<Link
						href="#"
						className="hidden md:flex items-center gap-2 text-[#737370] hover:text-[#2C2C2A] transition-colors font-medium"
					>
						Explore all pairs <ArrowRight className="w-4 h-4" />
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{PAIRINGS.map((pair, i) => (
						<motion.div
							key={pair.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.6, delay: i * 0.1 }}
							whileHover="hover"
							className="group bg-[#EAE8E1] rounded-3xl p-8 md:p-10 border border-[#E5E3DB] flex flex-col justify-between aspect-square md:aspect-[4/3] cursor-pointer overflow-hidden relative"
						>
							{/* Soft hover background fill */}
							<motion.div
								className="absolute inset-0 bg-[#DCE0D9] origin-bottom"
								initial={{ scaleY: 0 }}
								variants={{ hover: { scaleY: 1 } }}
								transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
							/>

							<div className="relative z-10">
								<div className="flex justify-between items-start mb-12">
									<span className="px-3 py-1 bg-[#F7F7F5] text-[#2C2C2A] rounded-full text-xs font-medium border border-[#E5E3DB]">
										{pair.name}
									</span>
								</div>

								<div className="space-y-4">
									<h4
										className="text-4xl md:text-5xl lg:text-6xl text-[#2C2C2A] tracking-tight leading-none"
										style={{ fontFamily: pair.headingFont }}
									>
										{pair.heading}
									</h4>
									<p
										className="text-lg md:text-xl text-[#737370] leading-relaxed max-w-sm"
										style={{ fontFamily: pair.bodyFont }}
									>
										The quick brown fox jumps over the lazy dog. A perfect match
										for readability.
									</p>
								</div>
							</div>

							{/* Reveal copy button on hover */}
							<motion.div
								className="relative z-10 flex items-center justify-between pt-6 border-t border-[#E5E3DB]/50 mt-auto"
								variants={{ hover: { y: 0, opacity: 1 } }}
								initial={{ y: 20, opacity: 0 }}
								transition={{ duration: 0.3 }}
							>
								<span className="font-['Space_Mono'] text-xs text-[#2C2C2A] tracking-widest uppercase">
									npx shadcn add @fonttrio/{pair.id}
								</span>
								<div className="w-8 h-8 rounded-full bg-[#2C2C2A] flex items-center justify-center text-[#F7F7F5]">
									<Copy className="w-3 h-3" />
								</div>
							</motion.div>
						</motion.div>
					))}
				</div>

				<div className="mt-8 flex justify-center md:hidden">
					<Link
						href="#"
						className="px-6 py-3 bg-[#EAE8E1] rounded-full text-[#2C2C2A] font-medium border border-[#E5E3DB] flex items-center gap-2"
					>
						Explore all pairs <ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</div>
		</section>
	);
};

// Skiper28 Style Curtain Reveal Footer
const CurtainFooter = () => {
	return (
		<footer className="fixed bottom-0 left-0 w-full h-screen bg-[#2C2C2A] flex flex-col items-center justify-center -z-10 px-6">
			<div className="max-w-4xl mx-auto text-center w-full flex flex-col items-center">
				<h2 className="text-6xl md:text-8xl lg:text-9xl text-[#F7F7F5] font-['Playfair_Display'] italic mb-12">
					Ready to explore?
				</h2>

        <Magnet padding={50} magnetStrength={0.3}>
          <Link
            href="/redesign/03/pairs"
            className="inline-block px-8 py-4 bg-[#F7F7F5] text-[#2C2C2A] rounded-full text-lg font-medium hover:scale-105 transition-transform duration-300"
          >
            Open the Registry
          </Link>
        </Magnet>

				<div className="mt-32 flex justify-between items-center text-[#F7F7F5]/40 text-sm font-medium w-full border-t border-[#F7F7F5]/10 pt-8">
					<span>© 2026 FontTrio.</span>
					<div className="flex gap-6">
						<Link href="#" className="hover:text-[#F7F7F5] transition-colors">
							Twitter
						</Link>
						<Link href="#" className="hover:text-[#F7F7F5] transition-colors">
							GitHub
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default function SoftNarrativeLanding() {
	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: "vertical",
			gestureOrientation: "vertical",
			wheelMultiplier: 1,
			touchMultiplier: 2,
			infinite: false,
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	}, []);

	return (
		<>
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;1,6..96,400&family=Inter:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;1,400&family=Space+Mono&family=Syne:wght@400;700&family=Bebas+Neue&display=swap');

        body {
          background-color: #2C2C2A; /* Match footer so the reveal looks seamless */
          color: #2C2C2A;
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* Soft rounded scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #F7F7F5;
        }
        ::-webkit-scrollbar-thumb {
          background: #DCE0D9;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #C4C9C1;
        }

        /* Hide scrollbar on specific elements */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

			<div className="relative z-10 bg-[#F7F7F5] mb-[100vh] rounded-b-[40px] md:rounded-b-[80px] shadow-[0_20px_0_0_rgba(0,0,0,0.1)]">
				<FloatingHeader />
				<HeroChaos />
				<ScrollRevealText />
				<ThePainVsSolution />
				<TypographyTransformation />
				<Testimonials />
				<PairingsGrid />
			</div>

			<CurtainFooter />
		</>
	);
}
