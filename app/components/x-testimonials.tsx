"use client";

import { motion, useReducedMotion } from "motion/react";
import { TestimonialMarquee } from "@/app/components/testimonials";
import { testimonials } from "@/lib/config/testimonials";

const titleVariants = {
	hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { duration: 0.6, ease: "easeOut" },
	},
} as const;

export function XTestimonials() {
	const prefersReducedMotion = useReducedMotion();

	return (
		<section className="py-16 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden dark:bg-black bg-white">
			<motion.h2
				className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl dark:text-white text-neutral-800 font-medium tracking-tight text-balance mb-10"
				variants={
					prefersReducedMotion
						? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
						: titleVariants
				}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-250px" }}
			>
				What our users say
			</motion.h2>

			<TestimonialMarquee testimonials={testimonials} />
		</section>
	);
}
