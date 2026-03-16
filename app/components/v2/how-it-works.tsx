import {
	Delete02Icon,
	Relieved01Icon,
	SearchList01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.15,
		},
	},
};

const cardVariants = {
	hidden: { y: 50, opacity: 0, filter: "blur(3px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: {
			duration: 0.5,
			ease: "easeOut",
			staggerChildren: 0.2,
		},
	},
} as const;

const iconVariants = {
	hidden: { opacity: 0, filter: "blur(3px)" },
	visible: {
		opacity: 1,
		filter: "blur(0px)",
		transition: { duration: 0.4, ease: "easeOut" },
	},
} as const;

const textVariants = {
	hidden: { y: 10, opacity: 0, filter: "blur(3px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { duration: 0.4, ease: "easeOut" },
	},
} as const;

const titleVariants = {
	hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { duration: 0.6, ease: "easeOut" },
	},
} as const;

export function HowItWorks() {
	return (
		<section
			aria-label="How It Works"
			className="py-16 px-24 overflow-hidden bg-black dark:bg-white"
		>
			<motion.h2
				className="font-['Manrope'] text-5xl text-white dark:text-neutral-800 font-medium tracking-tight text-balance"
				variants={titleVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-250px" }}
			>
				How it works
			</motion.h2>

			<motion.div
				className="grid grid-cols-3 gap-x-4 mt-10"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-250px" }}
			>
				<motion.div
					className="flex flex-col items-center gap-y-6 rounded-2xl bg-neutral-900 min-h-[60vh] px-8 py-30 relative overflow-hidden"
					variants={cardVariants}
				>
					<motion.div className="text-red-300" variants={iconVariants}>
						<HugeiconsIcon icon={Delete02Icon} size={48} color="currentColor" />
					</motion.div>

					<motion.h3
						className="text-center text-3xl text-white font-medium font-['Manrope'] tracking-tighter"
						variants={textVariants}
					>
						Delete and forget about Google Fonts
					</motion.h3>

					<div className="absolute bottom-0 left-0 w-full h-[10vh] bg-neutral-800/30 px-6 flex items-center justify-center">
						<p className="opacity-20 font-['Manrope'] text-md font-bold tracking-tighter text-white">
							I'm so tired of being angry with Google Fonts!
						</p>
					</div>
				</motion.div>

				<motion.div
					className="flex flex-col items-center gap-y-6 rounded-2xl bg-neutral-900 min-h-[60vh] px-8 py-30 relative overflow-hidden"
					variants={cardVariants}
				>
					<motion.div className="text-green-300" variants={iconVariants}>
						<HugeiconsIcon
							icon={SearchList01Icon}
							size={48}
							color="currentColor"
						/>
					</motion.div>

					<motion.h3
						className="text-center text-3xl text-white font-medium font-['Manrope'] tracking-tighter"
						variants={textVariants}
					>
						Find a ready-made font pair that you like
					</motion.h3>

					<div className="absolute bottom-0 left-0 w-full h-[10vh] bg-neutral-800/30 px-6 flex items-center justify-center">
						<Button className="rounded-xl ">Explore fonts</Button>
					</div>
				</motion.div>

				<motion.div
					className="flex flex-col items-center gap-y-6 rounded-2xl bg-neutral-900 min-h-[60vh] px-8 py-30 relative overflow-hidden"
					variants={cardVariants}
				>
					<motion.div className="text-yellow-300" variants={iconVariants}>
						<HugeiconsIcon
							icon={Relieved01Icon}
							size={48}
							color="currentColor"
						/>
					</motion.div>

					<motion.h3
						className="text-center text-3xl text-white font-medium font-['Manrope'] tracking-tighter"
						variants={textVariants}
					>
						Relax and enjoy your new fonts
					</motion.h3>

					<div className="absolute bottom-0 left-0 w-full h-[10vh] bg-neutral-800/30 px-6 flex items-center justify-center">
						<p className="font-['Google Sans Code'] text-md font-medium text-white">
							bun shadcn@latest add @fonttio/agency
						</p>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
