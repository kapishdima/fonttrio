"use client";

import { ArrowDown } from "lucide-react";
import {
	motion,
	useReducedMotion,
	useScroll,
	useTransform,
} from "motion/react";
import { useRef } from "react";
import { ChaosFonts } from "@/app/components/chaos-fonts";
import DotGrid from "@/components/DotGrid";
import { Button } from "@/components/ui/button";
import { HERO_TRANSITION } from "@/lib/constants";
import chaosFonts from "@/lib/data/chaos-fonts";

const heroVariants = {
	hidden: { scale: 0.8, opacity: 0, filter: "blur(12px)" },
	visible: { scale: 1, opacity: 1, filter: "blur(0px)" },
};

const heroVariantsReduced = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

export function Hero() {
	const prefersReducedMotion = useReducedMotion();
	const heroRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"],
	});

	const titleY = useTransform(scrollYProgress, [0, 0.6], [0, -300]);
	const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
	const titleBlur = useTransform(scrollYProgress, [0, 0.4], [0, 20]);
	const buttonY = useTransform(scrollYProgress, [0, 0.6], [0, -180]);
	const buttonOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
	const buttonBlur = useTransform(scrollYProgress, [0, 0.3], [0, 12]);
	const titleFilter = useTransform(titleBlur, (v) => `blur(${v}px)`);
	const buttonFilter = useTransform(buttonBlur, (v) => `blur(${v}px)`);
	const dotOpacity = useTransform(scrollYProgress, [0, 0.4], [0.2, 0]);

	return (
		<div ref={heroRef} style={{ height: "100vh", position: "relative" }}>
			<div className="sticky top-0 h-screen p-3">
				<div className="w-full h-full dark:bg-neutral-950 bg-white rounded-4xl">
					<motion.div
						style={{
							width: "100%",
							height: "100vh",
							position: "absolute",
							top: 0,
							left: 0,
							padding: "20px",
							opacity: dotOpacity,
						}}
					>
						<DotGrid
							dotSize={2}
							gap={30}
							baseColor="#1c1c1c"
							activeColor="#a1a1a1"
							proximity={200}
							shockRadius={10}
							shockStrength={10}
							resistance={100}
							returnDuration={2.9}
						/>
					</motion.div>

					<div className="size-full flex flex-col items-center justify-center relative z-40 py-[5vh] md:py-[10vh]">
						<motion.div
							style={{
								y: titleY,
								opacity: titleOpacity,
								filter: titleFilter,
							}}
						>
							<motion.h1
								id="title"
								className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight dark:text-white text-[#2C2C2A] text-center leading-tight lg:leading-26 text-balance"
								variants={
									prefersReducedMotion ? heroVariantsReduced : heroVariants
								}
								initial="hidden"
								animate="visible"
								transition={HERO_TRANSITION}
							>
								Fonts paired for you
								<br />
								Install with one{" "}
								<span className="italic font-['Playfair_Display'] dark:text-white text-[#2C2C2A]">
									command
								</span>
							</motion.h1>
						</motion.div>

						<motion.div
							style={{
								y: buttonY,
								opacity: buttonOpacity,
								filter: buttonFilter,
							}}
						>
							<motion.div
								id="button"
								variants={
									prefersReducedMotion ? heroVariantsReduced : heroVariants
								}
								initial="hidden"
								animate="visible"
								transition={{
									...HERO_TRANSITION,
									delay: HERO_TRANSITION.delay + HERO_TRANSITION.stagger,
								}}
							>
								<div className="flex items-center gap-3 mt-10">
									<motion.div
										whileTap={{ scale: 0.96 }}
										transition={{ type: "spring", duration: 0.15, bounce: 0 }}
									>
										<Button
											className="text-base justify-between font-medium h-12 w-full sm:w-48 px-6 rounded-full cursor-pointer"
											onClick={() => {
												document
													.querySelector('[aria-label="Playground"]')
													?.scrollIntoView({ behavior: "smooth" });
											}}
										>
											Try it now
											<ArrowDown aria-hidden="true" className="shrink-0" />
										</Button>
									</motion.div>
								</div>
							</motion.div>
						</motion.div>
					</div>

					<div className="size-full absolute top-0 left-0 z-10 overflow-hidden hidden md:block">
						<ChaosFonts fonts={chaosFonts} scrollYProgress={scrollYProgress} />
					</div>
				</div>
			</div>
		</div>
	);
}
