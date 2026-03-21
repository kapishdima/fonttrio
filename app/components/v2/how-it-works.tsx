"use client";

import { motion } from "motion/react";
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

					{/* Font specimen preview */}
					<div className="w-full rounded-xl dark:bg-neutral-900/50 bg-neutral-50 border dark:border-neutral-800 border-neutral-200 p-5 mb-1 relative overflow-hidden">
						{/* Baseline guide lines */}
						<div className="absolute inset-0 flex flex-col justify-around pointer-events-none">
							{[0, 1, 2, 3].map((i) => (
								<div
									key={i}
									className="w-full border-dashed border-t dark:border-neutral-800/30 border-neutral-200"
								/>
							))}
						</div>
						<p className="font-['Playfair_Display'] text-6xl dark:text-neutral-100 text-neutral-800 text-center relative z-10 tracking-tight leading-tight">
							Aa
						</p>
						<div className="flex items-center justify-center gap-2 mt-3 relative z-10">
							{["Heading", "Body", "Mono"].map((label) => (
								<span
									key={label}
									className="text-[10px] font-['Manrope'] font-semibold tracking-wider dark:text-neutral-500 text-neutral-400 uppercase"
								>
									{label}
								</span>
							))}
						</div>
					</div>

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

					<div className="w-full rounded-xl dark:bg-neutral-900/50 bg-neutral-50 border dark:border-neutral-800 border-neutral-200 overflow-hidden mb-1">
						<div className="flex items-center gap-1.5 px-4 h-9 border-b dark:border-neutral-800 border-neutral-200 dark:bg-neutral-900/60 bg-neutral-100/80">
							<div className="size-2 rounded-full bg-red-400" />
							<div className="size-2 rounded-full bg-yellow-400" />
							<div className="size-2 rounded-full bg-green-400" />
							<div className="flex-1 mx-3 h-4 rounded-full dark:bg-neutral-800 bg-neutral-200" />
						</div>
						<div className="p-4">
							<p className="font-['Manrope'] text-2xl font-bold dark:text-neutral-100 text-neutral-900 tracking-tight">
								The quick fox
							</p>
							<p className="font-['Manrope'] text-xs dark:text-neutral-400 text-neutral-500 mt-1 leading-relaxed">
								Typography defines the voice of your content. Choose a pair that
								speaks for your brand.
							</p>
							<p className="font-['Manrope'] text-xs font-medium p-2 rounded-md mt-2 dark:bg-neutral-950/50 bg-neutral-200/50 dark:text-white text-neutral-800">
								bunx --bun shadcn@latest add @fonttrio/editorial
							</p>
						</div>
					</div>
				</motion.div>

				<motion.div
					className="flex flex-col items-start gap-y-5 rounded-2xl dark:bg-neutral-950 bg-white border dark:border-neutral-900/50 border-neutral-200 px-7 py-7 relative overflow-hidden"
					variants={cardVariants}
				>
					<span className="text-xs font-bold font-['Manrope'] tracking-widest dark:text-neutral-500 text-neutral-400 uppercase">
						03
					</span>

					<div className="w-full rounded-xl dark:bg-neutral-900/50 bg-neutral-50 border dark:border-neutral-800 border-neutral-200 overflow-hidden mb-1">
						<div className="flex items-center gap-1.5 px-4 h-9 border-b dark:border-neutral-800 border-neutral-200 dark:bg-neutral-900/60 bg-neutral-100/80">
							<div className="size-2 rounded-full bg-red-400" />
							<div className="size-2 rounded-full bg-yellow-400" />
							<div className="size-2 rounded-full bg-green-400" />
						</div>
						<div className="p-4 font-['Manrope'] text-xs font-semibold tracking-tight space-y-1.5">
							<p className="dark:text-neutral-200 text-neutral-700">
								<span className="dark:text-emerald-400 text-emerald-700">
									$
								</span>{" "}
								bunx shadcn@latest add @fonttrio/editorial
							</p>
							<p className="dark:text-amber-400 text-amber-700 leading-relaxed">
								You are about to install a new style. Existing CSS variables and
								components will be overwritten. Continue?{" "}
								<span className="dark:text-neutral-500 text-neutral-400">
									(y/N)
								</span>
							</p>
							<p className="dark:text-neutral-200 text-neutral-700">
								<span className="dark:text-emerald-400 text-emerald-700 mr-1">
									✔
								</span>
								Checking registry.
							</p>
							<p className="dark:text-neutral-200 text-neutral-700">
								<span className="dark:text-emerald-400 text-emerald-700 mr-1">
									✔
								</span>
								Installing dependencies.
							</p>
							<p className="dark:text-neutral-200 text-neutral-700">
								<span className="dark:text-emerald-400 text-emerald-700 mr-1">
									✔
								</span>
								Updating{" "}
								<span className="dark:text-blue-400 text-blue-600">
									src/styles.css
								</span>
							</p>
						</div>
					</div>

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
