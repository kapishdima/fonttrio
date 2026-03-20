"use client";

import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon, Sun } from "lucide-react";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from "motion/react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { HEADER_TRANSITION, SOCIAL_LINKS } from "@/lib/constants";

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
			<a
				href="/redesign/04"
				className="text-white font-['Manrope'] font-bold text-sm tracking-tight px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
			>
				Fonttrio
			</a>

			<nav className="flex items-center gap-0.5 pl-20 pr-2">
				<Link
					href="/redesign/04/pairs"
					className="text-white/60 hover:text-white text-xs font-['Manrope'] font-medium tracking-tight px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
				>
					Pairings
				</Link>
				<a
					href="/fonts"
					className="text-white/60 hover:text-white text-xs font-['Manrope'] font-medium tracking-tight px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
				>
					Fonts
				</a>
			</nav>

			<div className="w-px h-5 bg-white/15 mr-2" />
			<motion.div
				whileTap={{ scale: 0.96 }}
				transition={{ type: "spring", duration: 0.15, bounce: 0 }}
			>
				<Button size="xs" className="text-xs rounded-full tracking-tight mr-2">
					Sponsor
				</Button>
			</motion.div>

			<Link
				href={SOCIAL_LINKS.github.url}
				target="_blank"
				rel="noopener noreferrer"
				className="text-white/60 hover:text-white cursor-pointer"
				aria-label={SOCIAL_LINKS.github.label}
			>
				<HugeiconsIcon
					icon={GithubIcon}
					size={16}
					color="currentColor"
					strokeWidth={1.5}
					aria-hidden="true"
				/>
			</Link>
			<ThemeToggle />
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

	return createPortal(
		<>
			<motion.header
				layout
				className={`fixed top-6 left-24 mx-auto z-100 flex items-center justify-between gap-1
					bg-neutral-950 backdrop-blur-md rounded-full
					px-2 py-1.5 border border-white/10
					${scrolled ? "w-fit" : "w-[calc(100%-12rem)]"}`}
				// initial={{ y: -80, opacity: 0, scale: 0.8, filter: "blur(8px)" }}
				animate={{
					y: 0,
					opacity: 1,
					scale: 1,
					filter: "blur(0px)",
					boxShadow: scrolled
						? "0 20px 25px -5px rgba(0,0,0,0.25), 0 8px 10px -6px rgba(0,0,0,0.2)"
						: "0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0)",
				}}
				transition={{
					...HEADER_TRANSITION,
					layout: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
					boxShadow: { duration: 0.3, ease: "easeOut" },
				}}
			>
				<a
					href="/redesign/04"
					className="text-white font-['Manrope'] font-bold text-sm tracking-tight px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
				>
					Fonttrio
				</a>

				<motion.div className="flex items-center">
					<nav className="flex items-center gap-0.5 pr-2">
						<a
							href="/redesign/04/pairs"
							className="text-white/60 hover:text-white text-xs font-['Manrope'] font-medium tracking-tight px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
						>
							Pairings
						</a>
						<a
							href="/fonts"
							className="text-white/60 hover:text-white text-xs font-['Manrope'] font-medium tracking-tight px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
						>
							Fonts
						</a>
					</nav>

					<div className="w-px h-5 bg-white/15 mr-2" />
					<Button
						size="xs"
						className="text-xs rounded-full tracking-tight mr-2"
					>
						Sponsor
					</Button>

					<Link
						href={SOCIAL_LINKS.github.url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-white/60 hover:text-white cursor-pointer"
						aria-label={SOCIAL_LINKS.github.label}
					>
						<HugeiconsIcon
							icon={GithubIcon}
							size={16}
							color="currentColor"
							strokeWidth={1.5}
							aria-hidden="true"
						/>
					</Link>
					<ThemeToggle />
				</motion.div>
			</motion.header>

			<AnimatePresence>
				{scrolled && extraWhenScroll && (
					<motion.div
						className="fixed top-6 z-100 right-24 flex items-center gap-1"
						initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
						animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
						exit={{ opacity: 0, x: 20, filter: "blur(4px)" }}
						transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
					>
						{extraWhenScroll}
					</motion.div>
				)}
			</AnimatePresence>
		</>,
		document.body,
	);
}

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
