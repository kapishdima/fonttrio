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
	{ name: "Times New", font: "serif", weight: 400 },
	{ name: "Comic Sans", font: "cursive", weight: 400 },
	{ name: "Impact", font: "sans-serif", weight: 900 },
	{ name: "Courier", font: "monospace", weight: 400 },
	{ name: "Verdana", font: "sans-serif", weight: 400 },
	{ name: "Georgia", font: "serif", weight: 400 },
	{ name: "Trebuchet", font: "sans-serif", weight: 400 },
	{ name: "Papyrus", font: "fantasy", weight: 400 },
	{ name: "Brush Script", font: "cursive", weight: 400 },
	{ name: "Tahoma", font: "sans-serif", weight: 400 },
	{ name: "Palatino", font: "serif", weight: 400 },
	{ name: "Helvetica", font: "sans-serif", weight: 700 },
	{ name: "Garamond", font: "serif", weight: 400 },
	{ name: "Lucida Console", font: "monospace", weight: 400 },
];

// Generate fonts evenly distributed on a tighter grid with more density
const COLS = 8;
const ROWS = 8;
const CHAOS_FONTS = Array.from({ length: COLS * ROWS }).map((_, i) => {
	const base = CHAOS_FONTS_BASE[i % CHAOS_FONTS_BASE.length];

	const col = i % COLS;
	const row = Math.floor(i / COLS);

	// Extend grid slightly beyond 100% to ensure edges are fully covered
	const cellWidth = 120 / COLS;
	const cellHeight = 120 / ROWS;

	// Base position in the center of the cell, starting from -10% to cover edges
	const baseX = -10 + col * cellWidth + cellWidth / 2;
	const baseY = -10 + row * cellHeight + cellHeight / 2;

	// Random jitter within the cell
	const jitterX = ((i * 17) % 20) - 10;
	const jitterY = ((i * 23) % 20) - 10;

	// Scatter direction (away from center of the screen)
	const angle = Math.atan2(baseY + jitterY - 50, baseX + jitterX - 50);
	const distance = 800 + ((i * 197) % 1500); // 800 to 2300px

	return {
		...base,
		id: `chaos-${i}`,
		initialX: baseX + jitterX,
		initialY: baseY + jitterY,
		scale: 0.6 + ((i * 13) % 9) / 10, // Readable scales: 0.6 to 1.4
		rotation: -25 + ((i * 41) % 50), // -25 to +25 deg
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

// --- COMPONENTS ---

const FloatingHeader = () => {
	return (
		<motion.header
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
			className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 w-[90%] max-w-2xl bg-[#F7F7F5]/80 backdrop-blur-xl border border-[#E5E3DB] rounded-full"
		>
			<div className="flex items-center gap-2">
				<div className="w-6 h-6 rounded-full bg-[#2C2C2A]" />
				<span className="font-medium text-sm tracking-tight text-[#2C2C2A]">
					FontTrio
				</span>
			</div>

			<nav className="hidden md:flex items-center gap-6">
				<Link
					href="#"
					className="text-sm text-[#737370] hover:text-[#2C2C2A] transition-colors"
				>
					Registry
				</Link>
				<Link
					href="#"
					className="text-sm text-[#737370] hover:text-[#2C2C2A] transition-colors"
				>
					Docs
				</Link>
				<Link
					href="#"
					className="text-sm text-[#737370] hover:text-[#2C2C2A] transition-colors"
				>
					Sponsors
				</Link>
			</nav>

			<button
				type="button"
				className="px-4 py-2 bg-[#2C2C2A] text-[#F7F7F5] rounded-full text-sm font-medium hover:bg-[#40403e] transition-colors"
			>
				Get Started
			</button>
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
}: {
	font: ChaosFontType;
	progress: MotionValue<number>;
}) => {
	// Phase 1 (0 to 0.4): fonts aggressively blow away
	const scrollX = useTransform(progress, [0, 0.4], [0, font.scatterX]);
	const scrollY = useTransform(progress, [0, 0.4], [0, font.scatterY]);

	// Removed animated blur from here to fix performance lagging
	const scrollOpacity = useTransform(progress, [0, 0.3], [0.35, 0]); // Fade out slightly slower, higher initial opacity

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 0.35, scale: font.scale }} // Start with higher opacity so it's not so pale
			transition={{
				duration: 1.5,
				ease: "easeOut",
				delay: ((font.initialX * font.initialY) % 50) / 100,
			}}
			className="absolute"
			style={{
				left: `${font.initialX}%`,
				top: `${font.initialY}%`,
			}}
		>
			<motion.div
				className="text-2xl md:text-3xl lg:text-4xl text-[#2C2C2A] whitespace-nowrap" // Slightly smaller base sizes for more density
				style={{
					fontFamily: font.font,
					fontWeight: font.weight,
					x: scrollX,
					y: scrollY,
					rotate: font.rotation,
					opacity: scrollOpacity,
				}}
			>
				{font.name}
			</motion.div>
		</motion.div>
	);
};

const HeroChaos = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 50,
		damping: 20,
	});

	// Continuous scaling instead of pausing
	const textScale = useTransform(
		smoothProgress,
		[0, 1],
		[0.7, 40], // Starts slightly smaller, continuously scales up
	);

	const textOpacity = useTransform(
		smoothProgress,
		[-2, -0.5, 0, 0.02, 0.3, 0.5],
		[-2, -0.5, 0, 1, 1, 0], // Fades in very early (0.05), stays visible longer
	);

	// Blur out earlier so it's readable right as fonts scatter
	const textBlurString = useTransform(
		smoothProgress,
		[0, 0.02],
		["blur(15px)", "blur(0px)"],
	);

	const indicatorOpacity = useTransform(smoothProgress, [0, 0.02], [1, 0]);

	return (
		<section
			ref={containerRef}
			className="relative w-full h-[250vh] flex flex-col items-center justify-start bg-[#F7F7F5]"
		>
			<div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
				{/* Background chaotic fonts */}
				<div className="absolute inset-0 pointer-events-none z-0">
					{CHAOS_FONTS.map((font) => (
						<ChaosFont key={font.id} font={font} progress={smoothProgress} />
					))}
				</div>

				{/* Main Copy (Fly-through Target) */}
				<div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 pointer-events-none overflow-visible">
					<motion.div
						className="flex flex-col items-center justify-center origin-center"
						style={{
							scale: textScale,
							opacity: textOpacity,
							filter: textBlurString,
						}}
					>
						<h1 className="text-5xl md:text-7xl lg:text-9xl font-medium tracking-tight text-[#2C2C2A] mb-6 font-['Inter'] text-center leading-tight">
							Stop guessing.
							<br />
							Start{" "}
							<span className="italic font-['Playfair_Display']">
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
		</section>
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
					{words.map((word, i) => {
						return (
							<Word
								key={word.id}
								word={word.text}
								index={i}
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
	// Compress the reveal range so the text is fully revealed by 70% scroll
	// leaving the remaining 30% for comfortable reading before the block unpins
	const revealRange = 0.7;
	const start = (index / total) * revealRange;
	const end = start + (1 / total) * revealRange;

	const rawOpacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
	const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 30 }); // Smooth the word reveal

	return (
		<motion.span style={{ opacity }} className="inline-block">
			{word}
		</motion.span>
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

				<div className="relative w-full max-w-4xl aspect-[4/5] md:aspect-[16/9] rounded-3xl overflow-hidden border border-[#E5E3DB] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)]">
					{/* BAD TYPOGRAPHY (Base layer) */}
					<div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center bg-white">
						<span className="font-['Arial'] text-xs font-bold text-gray-400 mb-2 uppercase">
							Before
						</span>
						<h3 className="font-['Arial'] text-3xl md:text-5xl font-bold text-black mb-4 tracking-tighter leading-none">
							The Evolution of Digital Interfaces
						</h3>
						<p className="font-['Times_New_Roman'] text-base md:text-xl text-black leading-tight mt-2">
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
						className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center bg-[#F7F7F5] z-10"
					>
						<span className="font-['Space_Mono'] text-xs font-bold text-[#DCE0D9] mb-4 uppercase tracking-widest">
							After (FontTrio)
						</span>
						<h3 className="font-['Playfair_Display'] italic text-4xl md:text-6xl text-[#2C2C2A] mb-6 leading-[1.1]">
							The Evolution of Digital Interfaces
						</h3>
						<p className="font-['Space_Mono'] text-sm md:text-base text-[#737370] leading-[1.8] max-w-2xl">
							In the early days of the web, typography was an afterthought.
							Designers were constrained by standard system fonts like Arial,
							Times New Roman, and Courier. Text was crammed together, leading
							to terrible readability and a poor user experience. Good
							typography is invisible, but bad typography screams at you.
						</p>
					</motion.div>

					{/* Floating Line / Indicator */}
					<motion.div
						className="absolute top-0 bottom-0 w-[2px] bg-[#E5E3DB] z-20 pointer-events-none"
						style={{ right: lineRight }}
					>
						<div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-[#2C2C2A] rounded-full flex items-center justify-center text-[#F7F7F5] shadow-lg">
							<ArrowRight className="w-4 h-4" />
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

const TerminalBlock = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start 80%", "end center"],
	});

	const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
	const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

	const [copied, setCopied] = useState(false);
	const command = "npx shadcn add @fonttrio/agency";

	const handleCopy = () => {
		navigator.clipboard.writeText(command);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<section ref={containerRef} className="py-24 px-6">
			<div className="max-w-4xl mx-auto flex flex-col items-center text-center">
				<h3 className="text-3xl md:text-5xl font-medium tracking-tight text-[#2C2C2A] mb-4">
					Like shadcn/ui, but for typography.
				</h3>
				<p className="text-[#737370] text-lg max-w-xl mb-12">
					Zero configuration. Just copy, paste, and your typography scales
					perfectly across all breakpoints.
				</p>

				<motion.div
					style={{ y, opacity }}
					className="w-full max-w-2xl bg-[#EAE8E1] rounded-3xl p-6 md:p-8 border border-[#E5E3DB] flex items-center justify-between group cursor-pointer"
					onClick={handleCopy}
					whileHover={{ scale: 1.02, backgroundColor: "#DCE0D9" }}
					transition={{ duration: 0.3 }}
				>
					<div className="flex items-center gap-4 overflow-hidden">
						<span className="text-[#737370] font-['Space_Mono']">$</span>
						<code className="font-['Space_Mono'] text-[#2C2C2A] text-sm md:text-lg whitespace-nowrap overflow-x-auto hide-scrollbar">
							{command}
						</code>
					</div>
					<div className="w-10 h-10 rounded-full bg-[#F7F7F5] flex items-center justify-center border border-[#E5E3DB] shrink-0 text-[#2C2C2A]">
						{copied ? (
							<Check className="w-4 h-4" />
						) : (
							<Copy className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
						)}
					</div>
				</motion.div>
			</div>
		</section>
	);
};

const PairingsGrid = () => {
	return (
		<section className="py-24 px-6">
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

const SponsorsMarquee = () => {
	// Filter out sponsors that don't have an empty name and a valid logo
	const validSponsors = SPONSORS.filter((s) => s.logo && s.logo !== "");

	// If there are too few, duplicate them for the marquee
	const displaySponsors =
		validSponsors.length < 5
			? [...validSponsors, ...validSponsors, ...validSponsors]
			: validSponsors;

	return (
		<section className="py-24 overflow-hidden border-y border-[#E5E3DB]">
			<div className="text-center mb-10">
				<span className="text-sm font-medium tracking-widest uppercase text-[#737370]">
					Backed by creators
				</span>
			</div>

			<div className="relative flex overflow-x-hidden group">
				<div className="animate-marquee whitespace-nowrap flex gap-8 px-4 items-center">
					{[1, 2].map((id) => (
						<React.Fragment key={`mq1-${id}`}>
							{displaySponsors.map((sponsor, idx) => (
								<div
									key={`mq1-${id}-${sponsor.id || idx}`}
									className="px-8 py-4 bg-[#EAE8E1] rounded-full border border-[#E5E3DB] flex items-center justify-center min-w-[160px] h-16"
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={sponsor.logo}
										alt="Sponsor Logo"
										className="max-h-8 max-w-[120px] object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
									/>
								</div>
							))}
						</React.Fragment>
					))}
				</div>
				<div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-8 px-4 items-center">
					{[1, 2].map((id) => (
						<React.Fragment key={`mq2-${id}`}>
							{displaySponsors.map((sponsor, idx) => (
								<div
									key={`mq2-${id}-${sponsor.id || idx}-alt`}
									className="px-8 py-4 bg-[#EAE8E1] rounded-full border border-[#E5E3DB] flex items-center justify-center min-w-[160px] h-16"
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={sponsor.logo}
										alt="Sponsor Logo"
										className="max-h-8 max-w-[120px] object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
									/>
								</div>
							))}
						</React.Fragment>
					))}
				</div>
			</div>

			<style>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 25s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
		</section>
	);
};

// Skiper28 Style Curtain Reveal Footer
const CurtainFooter = () => {
	return (
		<footer className="fixed bottom-0 left-0 w-full h-screen bg-[#2C2C2A] flex flex-col items-center justify-center -z-10 px-6">
			<div className="max-w-4xl mx-auto text-center w-full">
				<h2 className="text-6xl md:text-8xl lg:text-9xl text-[#F7F7F5] font-['Playfair_Display'] italic mb-12">
					Ready to explore?
				</h2>

				<button
					type="button"
					className="px-8 py-4 bg-[#F7F7F5] text-[#2C2C2A] rounded-full text-lg font-medium hover:scale-105 transition-transform duration-300"
				>
					Open the Registry
				</button>

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

			{/*
        The main content sits on top of the fixed footer.
        Margin-bottom is required to allow scrolling past the main content to reveal the footer.
      */}
			<div className="relative z-10 bg-[#F7F7F5] mb-[100vh] rounded-b-[40px] md:rounded-b-[80px] shadow-[0_20px_0_0_rgba(0,0,0,0.1)]">
				<FloatingHeader />
				<HeroChaos />
				<ScrollRevealText />
				<TypographyTransformation />
				<PairingsGrid />
				<TerminalBlock />
				<SponsorsMarquee />
			</div>

			<CurtainFooter />
		</>
	);
}
