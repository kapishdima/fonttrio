"use client";

import { Search } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ChaosFonts } from "@/app/components/v2/chaos-fonts";
import { Header } from "@/app/components/v2/header";
import DotGrid from "@/components/DotGrid";
import { Button } from "@/components/ui/button";
import { HERO_TRANSITION } from "@/lib/constants";
import chaosFonts from "@/lib/data/chaos-fonts";

const heroVariants = {
	hidden: { scale: 0.8, opacity: 0, filter: "blur(12px)" },
	visible: { scale: 1, opacity: 1, filter: "blur(0px)" },
};

export function Hero() {
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
				<div className="w-full h-full bg-white rounded-4xl">
					<Header />

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

					<div className="size-full flex flex-col items-center justify-center relative z-40 py-[10vh]">
					<motion.div
						style={{
							y: titleY,
							opacity: titleOpacity,
							filter: titleFilter,
						}}
					>
						<motion.h1
							id="title"
							className="text-9xl font-medium tracking-tight text-[#2C2C2A] font-['Manrope'] text-center leading-30 [text-wrap:balance]"
							variants={heroVariants}
							initial="hidden"
							animate="visible"
							transition={HERO_TRANSITION}
						>
							Three fonts
							<br />
							One{" "}
							<span className="italic font-['Playfair_Display'] text-[#2C2C2A]">
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
							variants={heroVariants}
							initial="hidden"
							animate="visible"
							transition={{
								...HERO_TRANSITION,
								delay: HERO_TRANSITION.delay + HERO_TRANSITION.stagger,
							}}
						>
							<motion.div
								whileTap={{ scale: 0.96 }}
								transition={{ type: "spring", duration: 0.15, bounce: 0 }}
							>
								<Button className="text-md font-['Manrope'] justify-between font-medium h-12 w-[15vw] px-6 rounded-full mt-10 cursor-pointer">
									Find font
									<Search />
								</Button>
							</motion.div>
						</motion.div>
					</motion.div>
					</div>

					<div className="size-full absolute top-0 left-0 z-10 overflow-hidden">
						<ChaosFonts fonts={chaosFonts} scrollYProgress={scrollYProgress} />
					</div>
				</div>
			</div>
		</div>
	);
}
