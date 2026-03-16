"use client";

import {
	type MotionValue,
	motion,
	useMotionTemplate,
	useSpring,
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

	// Cursor gradient: useMotionTemplate builds reactive radial-gradient string,
	// useSpring smooths the binary 0/1 active signal into a 0.4s fade
	const gradientOpacity = useSpring(cursor.active, {
		duration: 0.4,
		bounce: 0,
	});

	const gradientBackground = useMotionTemplate`radial-gradient(
		circle ${REPULSOR.radius}px at ${cursor.x}px ${cursor.y}px,
		transparent 0%,
		transparent 60%,
		rgba(0, 0, 0, 0.03) 80%,
		rgba(0, 0, 0, 0.05) 92%,
		transparent 100%
	)`;

	return (
		<>
			<motion.div
				className="absolute inset-0 pointer-events-none z-0"
				style={{
					background: gradientBackground,
					opacity: gradientOpacity,
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
							className="text-sm text-black whitespace-nowrap select-none"
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
