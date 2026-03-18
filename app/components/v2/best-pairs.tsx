"use client";

import { motion } from "motion/react";
import { PairCard } from "@/app/components/v2/pair-card";
import { getAllPairings } from "@/lib/pairings";

const FEATURED_COUNT = 10;

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

export function BestPairs() {
	const pairings = getAllPairings().slice(0, FEATURED_COUNT);

	return (
		<section className="py-16 pt-24 px-6 md:px-12 lg:px-24 overflow-hidden dark:bg-black bg-white relative">
			<motion.h2
				className="font-['Manrope'] text-4xl md:text-5xl dark:text-white text-neutral-800 font-medium tracking-tight text-balance mb-10"
				variants={titleVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-200px" }}
			>
				Popular font pairs
				<br />
				loved by the community
			</motion.h2>

			<motion.div
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4"
				variants={gridVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
			>
				{pairings.map((pairing) => (
					<motion.div key={pairing.name} variants={cardVariants}>
						<PairCard pairing={pairing} />
					</motion.div>
				))}
			</motion.div>
		</section>
	);
}
