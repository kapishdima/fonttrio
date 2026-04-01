"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ComponentsPreview } from "@/app/components/playground/components-preview";
import { TextsPreview } from "@/app/components/playground/texts-preview";
import { PairsListSelection } from "@/app/components/pairs/pairs-list-selection";
import { useInstallCopy } from "@/hooks/use-install-copy";
import { loadFontUrl } from "@/lib/hooks/font-load-registry";
import type { PairingData } from "@/lib/pairings";

const titleVariants = {
	hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
	},
} as const;

const contentVariants = {
	hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
	},
} as const;

const reducedVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

export function Playground({ pairings, showHeader = true }: { pairings: PairingData[]; showHeader?: boolean }) {
	const [activePairing, setActivePairing] = useState(pairings[0]);
	const prefersReducedMotion = useReducedMotion();

	// Load fonts for the active pairing eagerly (no IntersectionObserver needed)
	useEffect(() => {
		if (activePairing.googleFontsUrl) {
			loadFontUrl(activePairing.googleFontsUrl);
		}
	}, [activePairing.googleFontsUrl]);

	const {
		command,
		state: copyState,
		copyCommand,
	} = useInstallCopy(activePairing.name);

	return (
		<section
			aria-label="Playground"
			className="py-16 pt-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden dark:bg-black bg-white relative"
		>
			{/* Heading */}
			{showHeader && (
				<>
					<motion.h2
						className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl dark:text-white text-neutral-800 font-medium tracking-tight text-balance"
						variants={prefersReducedMotion ? reducedVariants : titleVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-200px" }}
					>
						Try it with your text
					</motion.h2>
					<motion.p
						className="text-base dark:text-neutral-400 text-neutral-500 mt-3 mb-10 max-w-xl"
						variants={prefersReducedMotion ? reducedVariants : titleVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-200px" }}
					>
						Type anything and see how it looks across different font pairings.
					</motion.p>
				</>
			)}

			<motion.div
				variants={prefersReducedMotion ? reducedVariants : contentVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
			>
				{/* Browser Chrome */}
				<div className="rounded-xl dark:bg-neutral-950 bg-white border dark:border-neutral-900/50 border-neutral-200 overflow-hidden">
					{/* Title bar */}
					<div className="flex items-center gap-3 px-4 py-3 border-b dark:border-neutral-900/50 border-neutral-200 dark:bg-neutral-950 bg-neutral-50">
						{/* Traffic lights — monochrome */}
						<div className="flex items-center gap-1.5">
							<span className="size-3 rounded-full dark:bg-neutral-700 bg-neutral-300" />
							<span className="size-3 rounded-full dark:bg-neutral-700 bg-neutral-300" />
							<span className="size-3 rounded-full dark:bg-neutral-700 bg-neutral-300" />
						</div>

						{/* Address bar */}
						<div className="flex-1 flex justify-start pl-2">
							<div className="flex items-center gap-2 px-4 py-1 rounded-md dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 max-w-md w-full">
								<span className="text-xs dark:text-neutral-500 text-neutral-400 truncate select-all">
									fonttrio.xyz/{activePairing.name}
								</span>
							</div>
						</div>

						{/* Right side — copy command */}
						<button
							type="button"
							onClick={() => copyCommand()}
							className="flex items-center gap-2 shrink-0 px-3 py-1 rounded-md dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 dark:hover:bg-neutral-800/50 hover:bg-neutral-200 transition-colors cursor-copy"
							aria-label={`Copy install command: ${command}`}
						>
							<code className="text-xs font-medium dark:text-neutral-300 text-neutral-600">
								{copyState === "done" ? "Copied!" : command}
							</code>
						</button>
					</div>

					{/* Browser content */}
					<div className="flex">
						{/* Pairs sidebar */}
						<PairsListSelection
							pairings={pairings}
							onSelectPair={(name: string) => {
								const pairing = pairings.find((p) => p.name === name);
								if (pairing) setActivePairing(pairing);
							}}
							active={activePairing}
							searchable
							direction="vertical"
							className="w-56 shrink-0 border-r dark:border-neutral-900/50 border-neutral-200 p-3 lg:max-h-150"
						/>

						{/* Specimens */}
						<AnimatePresence mode="wait">
							<div className="flex flex-1 min-w-0">
								<TextsPreview
									key={activePairing.name}
									activePairing={activePairing}
								/>
								<ComponentsPreview activePairing={activePairing} />
							</div>
						</AnimatePresence>
					</div>
				</div>
			</motion.div>
		</section>
	);
}

