"use client";

import { Moon, Sun } from "lucide-react";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { GithubStars } from "@/app/components/github-stars";
import { Button } from "@/components/ui/button";
import { HEADER_TRANSITION } from "@/lib/constants";

export function Header() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return createPortal(
		<motion.header
			className="fixed top-6 left-1/2 z-9999 flex items-center gap-1
				bg-black/90 backdrop-blur-md rounded-full
				px-2 py-1.5 shadow-2xl border border-white/10"
			style={{ x: "-50%" }}
			variants={{
				hidden: { y: -80, opacity: 0, scale: 0.8, filter: "blur(8px)" },
				visible: { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
			}}
			initial="hidden"
			animate="visible"
			transition={HEADER_TRANSITION}
		>
			<HeaderContent />
		</motion.header>,
		document.body,
	);
}

export function InnerHeader({
	extraWhenScroll,
}: {
	extraWhenScroll?: React.ReactNode;
}) {
	const [mounted, setMounted] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, "change", (latest) => {
		setScrolled(latest > 200);
	});

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const slideEase = [0.23, 1, 0.32, 1] as const;
	const snappyTransition = { duration: 0.3, ease: slideEase };

	return createPortal(
		<>
			<AnimatePresence initial={false} mode="wait">
				{!scrolled && (
					<motion.header
						key="static"
						className="fixed top-6 left-24 z-100 flex items-center justify-between gap-1
							bg-neutral-950 backdrop-blur-md overflow-hidden
							w-[calc(100%-12rem)] px-2 py-1.5 border border-white/10 rounded-full"
						initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
						animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
						exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
						transition={snappyTransition}
					>
						<HeaderContent />
					</motion.header>
				)}
			</AnimatePresence>

			{/* Scroll header + Extra content — both in one AnimatePresence, appear/disappear together */}
			<AnimatePresence>
				{scrolled && (
					<motion.header
						key="scroll"
						className="fixed top-6 left-24 z-100 flex items-center gap-1
							bg-neutral-950 backdrop-blur-md overflow-hidden
							w-fit px-2 py-1.5 border border-white/10 rounded-full
							shadow-[0_20px_25px_-5px_rgba(0,0,0,0.25),0_8px_10px_-6px_rgba(0,0,0,0.2)]"
						initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
						animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
						exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
						transition={snappyTransition}
					>
						<HeaderContent />
					</motion.header>
				)}
				{scrolled && extraWhenScroll && (
					<motion.div
						key="extra"
						className="fixed top-6 z-100 right-24 flex items-center gap-1 shadow-2xl"
						initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
						animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
						exit={{ opacity: 0, x: 20, filter: "blur(4px)" }}
						transition={snappyTransition}
					>
						{extraWhenScroll}
					</motion.div>
				)}
			</AnimatePresence>
		</>,
		document.body,
	);
}

const HeaderContent = () => {
	return (
		<>
			<a
				href="/redesign/04"
				className="text-white font-['Manrope'] font-bold text-sm tracking-tight px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
			>
				Fonttrio
			</a>

			<div className="flex items-center pr-2">
				<nav className="flex items-center gap-0.5 pr-2">
					<a
						href="/redesign/04/pairs"
						className="text-white/60 hover:text-white text-xs font-['Manrope'] font-medium tracking-tight px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
					>
						Pairings
					</a>
					<a
						href="/redesign/04/fonts"
						className="text-white/60 hover:text-white text-xs font-['Manrope'] font-medium tracking-tight px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
					>
						Fonts
					</a>
				</nav>

				<div className="w-px h-5 bg-white/15 mr-2" />
				<Button size="xs" className="text-xs rounded-full tracking-tight">
					Sponsor
				</Button>

				<ThemeToggle />
				<GithubStars />
			</div>
		</>
	);
};

const ThemeToggle = () => {
	const { setTheme, resolvedTheme } = useTheme();

	const toggle = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};

	const isDark = resolvedTheme === "dark";

	return (
		<Button
			size="icon"
			variant="ghost"
			className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white cursor-pointer"
			onClick={toggle}
		>
			<AnimatePresence initial={false} mode="wait">
				<motion.span
					key={isDark ? "dark" : "light"}
					initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
					animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
					exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
					transition={{ type: "spring", duration: 0.3, bounce: 0 }}
					className="flex items-center justify-center"
				>
					{isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
				</motion.span>
			</AnimatePresence>
		</Button>
	);
};
