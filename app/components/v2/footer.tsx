"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Footer() {
	const shouldReduceMotion = useReducedMotion();

	return (
		<footer className="h-[50vh] relative overflow-hidden">
			<motion.p
				initial={shouldReduceMotion ? false : { opacity: 0, y: 80 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-100px" }}
				transition={{
					duration: 0.6,
					ease: [0.22, 1, 0.36, 1],
				}}
				className="leading-none text-center text-[40vh] absolute -bottom-9 left-1/2 transform -translate-x-1/2 text-white pt-40 font-['Manrope'] font-extrabold tracking-tighter"
			>
				FONTTRIO
			</motion.p>
		</footer>
	);
}
