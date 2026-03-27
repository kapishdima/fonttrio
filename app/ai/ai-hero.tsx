"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AnimateIn({
	children,
	delay = 0,
	className,
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: EASE, delay }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export function AnimateInView({
	children,
	delay = 0,
	className,
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-60px" }}
			transition={{ duration: 0.5, ease: EASE, delay }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
