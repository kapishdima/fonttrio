import { motion } from "motion/react";
import { SPONSORS_PAGE } from "@/lib/sponsors";

export function SponsorHero() {
	return (
		<div className="h-auto min-h-[40vh] p-3">
			<section className="w-full h-full flex flex-col justify-center dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
					className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight dark:text-white text-neutral-900 text-balance max-w-3xl"
				>
					{SPONSORS_PAGE.title}
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.5,
						ease: [0.16, 1, 0.3, 1],
						delay: 0.1,
					}}
					className="mt-4 text-base md:text-lg dark:text-neutral-400 text-neutral-600 max-w-xl"
				>
					{SPONSORS_PAGE.description}
				</motion.p>
			</section>
		</div>
	);
}
