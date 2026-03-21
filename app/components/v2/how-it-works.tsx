"use client";

import {
	motion,
	useAnimation,
	useInView,
	useReducedMotion,
} from "motion/react";
import { useEffect, useRef } from "react";
import { RotatingSpecimen } from "@/app/components/v2/rotating-specimen";
import { Button } from "@/components/ui/button";

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.12,
		},
	},
};

const cardVariants = {
	hidden: { y: 40, opacity: 0, filter: "blur(4px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: {
			duration: 0.55,
			ease: [0.16, 1, 0.3, 1],
		},
	},
} as const;

const titleVariants = {
	hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
	},
} as const;

/* ── Card 2: Preview mockup ── */

const previewLineVariants = {
	hidden: { opacity: 0, y: 8 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
	},
} as const;

const previewContainerVariants = {
	hidden: {
		transition: {
			staggerChildren: 0.06,
			staggerDirection: -1,
		},
	},
	visible: {
		transition: {
			staggerChildren: 0.18,
			delayChildren: 0.3,
		},
	},
} as const;

/* ── Card 3: Terminal mockup ── */

const terminalLineVariants = {
	hidden: { opacity: 0, x: -6 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
	},
} as const;

const terminalContainerVariants = {
	hidden: {
		transition: {
			staggerChildren: 0.04,
			staggerDirection: -1,
		},
	},
	visible: {
		transition: {
			staggerChildren: 0.22,
			delayChildren: 0.4,
		},
	},
} as const;

/* ── Looping animation hook ── */

function useLoopingAnimation({
	isInView,
	visibleDuration = 5000,
	hiddenDuration = 1200,
}: {
	isInView: boolean;
	visibleDuration?: number;
	hiddenDuration?: number;
}) {
	const controls = useAnimation();
	const shouldReduceMotion = useReducedMotion();

	useEffect(() => {
		if (!isInView || shouldReduceMotion) {
			controls.start("hidden");
			return;
		}

		let cancelled = false;
		const wait = (ms: number) =>
			new Promise<void>((r) => {
				const id = setTimeout(r, ms);
				if (cancelled) clearTimeout(id);
			});

		async function loop() {
			while (!cancelled) {
				await controls.start("visible");
				await wait(visibleDuration);
				if (cancelled) break;
				await controls.start("hidden");
				await wait(hiddenDuration);
			}
		}

		loop();
		return () => {
			cancelled = true;
		};
	}, [isInView, controls, shouldReduceMotion, visibleDuration, hiddenDuration]);

	return controls;
}

/* ── Preview Mockup (Card 2) ── */

function PreviewMockup() {
	const ref = useRef(null);
	const isInView = useInView(ref, { margin: "-100px" });
	const controls = useLoopingAnimation({
		isInView,
		visibleDuration: 5000,
		hiddenDuration: 1500,
	});

	return (
		<motion.div
			ref={ref}
			className="w-full h-full rounded-xl dark:bg-neutral-900/50 bg-neutral-50 border dark:border-neutral-800 border-neutral-200 overflow-hidden mb-1"
			variants={previewContainerVariants}
			initial="hidden"
			animate={controls}
		>
			<div className="flex items-center gap-1.5 px-4 h-9 border-b dark:border-neutral-800 border-neutral-200 dark:bg-neutral-900/60 bg-neutral-100/80">
				<div className="size-2 rounded-full bg-red-400" />
				<div className="size-2 rounded-full bg-yellow-400" />
				<div className="size-2 rounded-full bg-green-400" />
				<div className="flex-1 mx-3 h-4 rounded-full dark:bg-neutral-800 bg-neutral-200" />
			</div>
			<div className="p-4">
				<motion.p
					variants={previewLineVariants}
					className="font-['Manrope'] text-2xl font-bold dark:text-neutral-100 text-neutral-900 tracking-tight"
				>
					The quick fox
				</motion.p>
				<motion.p
					variants={previewLineVariants}
					className="font-['Manrope'] text-xs dark:text-neutral-400 text-neutral-500 mt-1 leading-relaxed"
				>
					Typography defines the voice of your content. Choose a pair that
					speaks for your brand.
				</motion.p>
				<motion.p
					variants={previewLineVariants}
					className="font-['Manrope'] text-xs font-medium p-2 rounded-md mt-2 dark:bg-neutral-950/50 bg-neutral-200/50 dark:text-white text-neutral-800"
				>
					bun shadcn@latest add @fonttrio/editorial
				</motion.p>
			</div>
		</motion.div>
	);
}

/* ── Terminal Mockup (Card 3) ── */

function TerminalMockup() {
	const ref = useRef(null);
	const isInView = useInView(ref, { margin: "-100px" });
	const controls = useLoopingAnimation({
		isInView,
		visibleDuration: 5500,
		hiddenDuration: 1500,
	});

	return (
		<motion.div
			ref={ref}
			className="w-full rounded-xl dark:bg-neutral-900/50 bg-neutral-50 border dark:border-neutral-800 border-neutral-200 overflow-hidden mb-1"
			variants={terminalContainerVariants}
			initial="hidden"
			animate={controls}
		>
			<div className="flex items-center gap-1.5 px-4 h-9 border-b dark:border-neutral-800 border-neutral-200 dark:bg-neutral-900/60 bg-neutral-100/80">
				<div className="size-2 rounded-full bg-red-400" />
				<div className="size-2 rounded-full bg-yellow-400" />
				<div className="size-2 rounded-full bg-green-400" />
			</div>
			<div className="p-4 font-['Manrope'] text-xs font-semibold tracking-tight space-y-1.5">
				<motion.p
					variants={terminalLineVariants}
					className="dark:text-neutral-200 text-neutral-700"
				>
					<span className="dark:text-emerald-400 text-emerald-700">$</span>{" "}
					bunx shadcn@latest add @fonttrio/editorial
				</motion.p>
				<motion.p
					variants={terminalLineVariants}
					className="dark:text-amber-400 text-amber-700 leading-relaxed"
				>
					You are about to install a new style. Existing CSS variables and
					components will be overwritten. Continue?{" "}
					<span className="dark:text-neutral-500 text-neutral-400">(y/N)</span>
				</motion.p>
				<motion.p
					variants={terminalLineVariants}
					className="dark:text-neutral-200 text-neutral-700"
				>
					<span className="dark:text-emerald-400 text-emerald-700 mr-1">
						✔
					</span>
					Checking registry.
				</motion.p>
				<motion.p
					variants={terminalLineVariants}
					className="dark:text-neutral-200 text-neutral-700"
				>
					<span className="dark:text-emerald-400 text-emerald-700 mr-1">
						✔
					</span>
					Installing dependencies.
				</motion.p>
				<motion.p
					variants={terminalLineVariants}
					className="dark:text-neutral-200 text-neutral-700"
				>
					<span className="dark:text-emerald-400 text-emerald-700 mr-1">
						✔
					</span>
					Updating{" "}
					<span className="dark:text-blue-400 text-blue-600">
						src/styles.css
					</span>
				</motion.p>
			</div>
		</motion.div>
	);
}

/* ── Main Section ── */

export function HowItWorks() {
	return (
		<section
			aria-label="How It Works"
			className="py-16 pt-24 px-6 md:px-12 lg:px-24 overflow-hidden dark:bg-black bg-white relative"
		>
			<motion.h2
				className="font-['Manrope'] text-4xl md:text-5xl dark:text-white text-neutral-800 font-medium tracking-tight text-balance"
				variants={titleVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-250px" }}
			>
				How it works
			</motion.h2>

			<motion.div
				className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-200px" }}
			>
				{/* Card 1 — Browse */}
				<motion.div
					className="flex flex-col items-start gap-y-5 rounded-2xl dark:bg-neutral-950 bg-white border dark:border-neutral-900/50 border-neutral-200 px-7 py-7 relative overflow-hidden"
					variants={cardVariants}
				>
					<span className="text-xs font-bold font-['Manrope'] tracking-widest dark:text-neutral-500 text-neutral-400 uppercase">
						01
					</span>

					<RotatingSpecimen containerClassName="w-full" />

					<h3 className="font-['Manrope'] text-2xl dark:text-white text-neutral-900 font-semibold tracking-tight leading-snug">
						Browse curated pairs
					</h3>
					<p className="font-['Manrope'] text-sm dark:text-neutral-400 text-neutral-500 leading-relaxed -mt-3">
						Hand-picked heading, body, and mono combinations tested for
						contrast, rhythm, and legibility across every size.
					</p>
					<Button size="default">Explore pairs</Button>
				</motion.div>

				{/* Card 2 — Preview */}
				<motion.div
					className="flex flex-col items-start gap-y-5 rounded-2xl dark:bg-neutral-950 bg-white border dark:border-neutral-900/50 border-neutral-200 px-7 py-7 relative overflow-hidden"
					variants={cardVariants}
				>
					<span className="text-xs font-bold font-['Manrope'] tracking-widest dark:text-neutral-500 text-neutral-400 uppercase">
						02
					</span>

					<h3 className="font-['Manrope'] text-2xl dark:text-white text-neutral-900 font-semibold tracking-tight leading-snug">
						Preview with your content
					</h3>
					<p className="font-['Manrope'] text-sm dark:text-neutral-400 text-neutral-500 leading-relaxed -mt-3">
						See headings, body copy, and code blocks rendered side by side
						before committing to a pair.
					</p>

					<PreviewMockup />
				</motion.div>

				{/* Card 3 — Install */}
				<motion.div
					className="flex flex-col items-start gap-y-5 rounded-2xl dark:bg-neutral-950 bg-white border dark:border-neutral-900/50 border-neutral-200 px-7 py-7 relative overflow-hidden"
					variants={cardVariants}
				>
					<span className="text-xs font-bold font-['Manrope'] tracking-widest dark:text-neutral-500 text-neutral-400 uppercase">
						03
					</span>

					<TerminalMockup />

					<h3 className="font-['Manrope'] text-2xl dark:text-white text-neutral-900 font-semibold tracking-tight leading-snug">
						Install with one command
					</h3>
					<p className="font-['Manrope'] text-sm dark:text-neutral-400 text-neutral-500 leading-relaxed -mt-3">
						One shadcn command adds fonts, CSS variables, and a full typography
						scale. Nothing manual — everything configured.
					</p>
				</motion.div>
			</motion.div>
		</section>
	);
}
