"use client";

import { motion } from "motion/react";
import DotGrid from "@/components/DotGrid";
import FAQs from "@/components/faqs-1";

const titleVariants = {
	hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { duration: 0.6, ease: "easeOut" },
	},
} as const;

export function Faq() {
	return (
		<section
			aria-label="How It Works"
			className="py-20 px-24 overflow-hidden bg-black dark:bg-white  relative"
		>
			<div
				style={{
					width: "100vw",
					height: "100vh",
					position: "absolute",
					bottom: 0,
					left: 0,
					zIndex: 0,
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
			<motion.h2
				className="font-['Manrope'] text-5xl text-white dark:text-neutral-800 font-medium tracking-tight text-balance"
				variants={titleVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-250px" }}
			>
				Frequently Asked <br /> Questions
			</motion.h2>

			<FAQs />
		</section>
	);
}
