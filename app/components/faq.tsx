"use client";

import { motion, useReducedMotion } from "motion/react";
import FAQs from "@/components/faqs-1";

export function Faq() {
	const prefersReducedMotion = useReducedMotion();

	return (
		<section
			aria-label="Frequently Asked Questions"
			className="py-16 pt-24 px-6 md:px-12 lg:px-24 overflow-hidden dark:bg-black bg-white"
		>
			<motion.h2
				className="font-['Manrope'] text-4xl md:text-5xl dark:text-white text-neutral-800 font-medium tracking-tight text-balance mb-10"
				initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
				whileInView={{ y: 0, opacity: 1 }}
				viewport={{ once: true, margin: "-250px" }}
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				Frequently Asked
				<br />
				Questions
			</motion.h2>

			<FAQs />
		</section>
	);
}
