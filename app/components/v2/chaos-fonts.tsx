"use client";

import {
	type MotionValue,
	motion,
	useMotionTemplate,
	useTransform,
} from "motion/react";
import { REPULSOR } from "@/lib/constants";
import {
	type RepulsorItemStyle,
	useRepulsor,
} from "@/lib/hooks/v2/use-repulsor";

const CHAOS_STAGGER = 0.003;
const CHAOS_DURATION = 0.1;

export interface ChaosFontItem {
	x: number;
	y: number;
	label: string;
	rotation: number;
	floatDuration: number;
	floatDelay: number;
	floatAmplitude: number;
}

interface ChaosFontsProps {
	fonts: ChaosFontItem[];
	scrollYProgress: MotionValue<number>;
}

export function ChaosFonts({ fonts, scrollYProgress }: ChaosFontsProps) {
	const { items, cursor } = useRepulsor(fonts.map((f) => ({ x: f.x, y: f.y })));

	// Scroll exit
	const exitScale = useTransform(scrollYProgress, [0.05, 0.5], [1, 0]);
	const exitOpacity = useTransform(scrollYProgress, [0.1, 0.45], [1, 0]);

	const gradientExitOpacity = useTransform(
		scrollYProgress,
		[0.05, 0.5],
		[1, 0],
	);

	// Light mode: dark vignette on light bg
	const gradientLight = useMotionTemplate`radial-gradient(
		circle ${REPULSOR.radius}px at ${cursor.x}px ${cursor.y}px,
		transparent 0%,
		transparent 55%,
		rgba(0, 0, 0, 0.04) 78%,
		rgba(0, 0, 0, 0.09) 92%,
		transparent 100%
	)`;

	// Dark mode: light vignette on dark bg
	const gradientDark = useMotionTemplate`radial-gradient(
		circle ${REPULSOR.radius}px at ${cursor.x}px ${cursor.y}px,
		transparent 0%,
		transparent 55%,
		rgba(255, 255, 255, 0.04) 78%,
		rgba(255, 255, 255, 0.09) 92%,
		transparent 100%
	)`;

	return (
		<>
			<motion.div
				className="absolute inset-0 pointer-events-none z-0 block dark:hidden"
				style={{
					background: gradientLight,
					opacity: gradientExitOpacity,
					willChange: "background, opacity, transform",
				}}
			/>
			<motion.div
				className="absolute inset-0 pointer-events-none z-0 hidden dark:block"
				style={{
					background: gradientDark,
					opacity: gradientExitOpacity,
					willChange: "background, opacity, transform",
				}}
			/>
			{fonts.map((item, i) => (
				<ChaosFont
					key={i}
					item={item}
					index={i}
					repulsor={items[i]}
					exitScale={exitScale}
					exitOpacity={exitOpacity}
				/>
			))}
		</>
	);
}

function ChaosFont({
	item,
	index,
	repulsor,
	exitScale,
	exitOpacity,
}: {
	item: ChaosFontItem;
	index: number;
	repulsor: RepulsorItemStyle;
	exitScale: MotionValue<number>;
	exitOpacity: MotionValue<number>;
}) {
	return (
		<motion.div
			className="absolute pointer-events-none"
			style={{
				left: item.x,
				top: item.y,
				x: "-50%",
				y: "-50%",
				scale: exitScale,
				opacity: exitOpacity,
				willChange: "transform, opacity",
			}}
		>
			<motion.div
				initial={{ scale: 0, opacity: 0, filter: "blur(8px)" }}
				animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
				transition={{
					delay: index * CHAOS_STAGGER,
					duration: CHAOS_DURATION,
					ease: [0.34, 1.56, 0.64, 1],
				}}
			>
				<div
					style={
						{
							"--float-amp": `${item.floatAmplitude}px`,
							animation: `levitate ${item.floatDuration}s ease-in-out ${item.floatDelay}s infinite`,
						} as React.CSSProperties
					}
				>
					<motion.div
						style={{
							x: repulsor.x,
							y: repulsor.y,
							scale: repulsor.scale,
							rotate: item.rotation,
						}}
					>
						<motion.p
							className="text-sm dark:text-white/40 text-black/40 whitespace-nowrap select-none"
							style={{ opacity: repulsor.opacity }}
						>
							{item.label}
						</motion.p>
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
	);
}
