"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { Header } from "@/app/components/header";

const RotatingSpecimen = dynamic(
	() =>
		import("@/app/components/rotating-specimen").then(
			(m) => m.RotatingSpecimen,
		),
	{ ssr: false },
);

const EASE = [0.16, 1, 0.3, 1] as const;

export function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<main className="h-screen bg-black p-3 flex gap-3">
			<Header />

			<div className="flex-1 dark:bg-neutral-950 bg-white rounded-4xl flex items-center justify-center px-6 sm:px-12 overflow-y-auto">
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: EASE }}
					className="w-full max-w-sm py-12"
				>
					{children}
				</motion.div>
			</div>

			<div className="hidden lg:flex w-[45%] dark:bg-neutral-950 bg-white rounded-4xl items-center justify-center overflow-hidden">
				<RotatingSpecimen
					containerClassName="!flex !w-full h-full items-center justify-center !mb-0 !rounded-none"
					interval={4000}
				/>
			</div>
		</main>
	);
}
