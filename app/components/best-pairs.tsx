"use client";

import { motion, useReducedMotion } from "motion/react";
import { PairCard } from "@/app/components/pair-card";
import type { PairingData } from "@/lib/pairings";
import { POPULAR_PAIRING_NAMES } from "@/lib/popular-pairings";

const titleVariants = {
	hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { duration: 0.6, ease: "easeOut" },
	},
} as const;

const gridVariants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.1 },
	},
} as const;

const cardVariants = {
	hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { duration: 0.5, ease: "easeOut" },
	},
} as const;

export function BestPairs({ pairings: allPairings }: { pairings: PairingData[] }) {
	const pairings = allPairings.filter((p) => POPULAR_PAIRING_NAMES.has(p.name));
	const prefersReducedMotion = useReducedMotion();
	const reducedVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

	return (
		<section className="py-16 pt-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden dark:bg-black bg-white relative">
			<motion.h2
				className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl dark:text-white text-neutral-800 font-medium tracking-tight text-balance mb-10"
				variants={prefersReducedMotion ? reducedVariants : titleVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
			>
				Popular font pairs
				<br />
				loved by the community
			</motion.h2>

			<motion.div
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4"
				variants={prefersReducedMotion ? reducedVariants : gridVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
			>
				{pairings.map((pairing) => (
					<motion.div
						key={pairing.name}
						variants={prefersReducedMotion ? reducedVariants : cardVariants}
					>
						<PairCard pairing={pairing} />
					</motion.div>
				))}
			</motion.div>
		</section>
	);
}
