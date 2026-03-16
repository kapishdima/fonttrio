import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { HEADER_TRANSITION } from "@/lib/constants";

export function Header() {
	return (
		<motion.header
			className="fixed top-6 left-1/2 z-50 flex items-center gap-1
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
				href="/"
				className="text-white font-['Manrope'] font-bold text-sm tracking-tight px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
			>
				Fonttrio
			</a>

			{/* <div className="w-px h-5 bg-white/15" /> */}

			<nav className="flex items-center gap-0.5 pl-20 pr-2">
				<a
					href="/pairings"
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
			<motion.div whileTap={{ scale: 0.96 }} transition={{ type: "spring", duration: 0.15, bounce: 0 }}>
				<Button
					size="xs"
					className="rounded-full text-foreground bg-muted hover:bg-muted/80 transition-colors cursor-pointer text-xs font-['Manrope'] font-medium tracking-tight"
				>
					Sponsor
				</Button>
			</motion.div>

			<ThemeToggle />
		</motion.header>
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
