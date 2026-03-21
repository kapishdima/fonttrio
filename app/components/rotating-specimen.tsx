import {
	AnimatePresence,
	motion,
	useCycle,
	useReducedMotion,
} from "motion/react";
import { useEffect } from "react";

const SPECIMEN_FONTS = [
	{ name: "Playfair Display", family: "'Playfair Display', serif" },
	{ name: "Space Grotesk", family: "'Space Grotesk', sans-serif" },
	{ name: "DM Serif Display", family: "'DM Serif Display', serif" },
	{ name: "Cormorant Garamond", family: "'Cormorant Garamond', serif" },
];

type RotatingSpecimenProps = {
	containerClassName?: string;
	/** Delay in ms between font switches. Defaults to 5500 (matches terminal animation). */
	interval?: number;
};

export function RotatingSpecimen({
	containerClassName,
	interval: intervalMs = 5500,
}: RotatingSpecimenProps) {
	const [current, cycle] = useCycle(...SPECIMEN_FONTS);
	const shouldReduceMotion = useReducedMotion();

	useEffect(() => {
		if (shouldReduceMotion) return;
		const id = setInterval(cycle, intervalMs);
		return () => clearInterval(id);
	}, [cycle, shouldReduceMotion, intervalMs]);

	return (
		<div
			className={`hidden md:flex w-[30%] rounded-xl mb-1 relative overflow-hidden flex-col items-center ${containerClassName}`}
			aria-hidden="true"
			style={{
				maskImage:
					"linear-gradient(to right, transparent, black 40%, black 80%, transparent)",
				WebkitMaskImage:
					"linear-gradient(to right, transparent, black 40%, black 80%, transparent)",
			}}
		>
			<div className="absolute inset-y-[-20%] inset-x-0 flex flex-col justify-around pointer-events-none">
				{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
					<div
						key={i}
						className="w-full border-dashed border-t dark:border-neutral-700/30 border-neutral-200"
					/>
				))}
			</div>

			<div className="flex items-center justify-center">
				<AnimatePresence mode="wait">
					<motion.p
						key={current.name}
						initial={
							shouldReduceMotion
								? false
								: { opacity: 0, y: 12, filter: "blur(4px)" }
						}
						animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						exit={
							shouldReduceMotion
								? { opacity: 0 }
								: { opacity: 0, y: -12, filter: "blur(4px)" }
						}
						transition={{
							duration: shouldReduceMotion ? 0.15 : 0.4,
							ease: [0.23, 1, 0.32, 1],
						}}
						className="text-[clamp(3rem,10vw,7.5rem)] dark:text-neutral-100 text-neutral-800 text-center tracking-tight leading-tight"
						style={{ fontFamily: current.family }}
					>
						Aa
					</motion.p>
				</AnimatePresence>
			</div>

			<AnimatePresence mode="wait">
				<motion.span
					key={current.name}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.25, ease: "easeOut" }}
					className="text-xs font-medium dark:text-neutral-500 text-neutral-400"
				>
					{current.name}
				</motion.span>
			</AnimatePresence>
		</div>
	);
}
