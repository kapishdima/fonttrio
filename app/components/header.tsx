"use client";

import { LogOut, Menu, Moon, Sun, User, X } from "lucide-react";
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { HEADER_TRANSITION } from "@/lib/constants";

const NAV_LINKS = [
	{ href: "/redesign/04/pairs", label: "Pairings" },
	{ href: "/redesign/04/fonts", label: "Fonts" },
	{ href: "/playground", label: "Playground" },
	{ href: "/ai", label: "AI" },
	{ href: "/sponsors", label: "Sponsors" },
];

export function Header() {
	const [mounted, setMounted] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return createPortal(
		<>
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
				<HeaderContent
					mobileMenuOpen={mobileMenuOpen}
					setMobileMenuOpen={setMobileMenuOpen}
				/>
			</motion.header>
			<MobileMenu
				open={mobileMenuOpen}
				onClose={() => setMobileMenuOpen(false)}
			/>
		</>,
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
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
						className="fixed top-6 left-3 md:left-6 lg:left-24 z-100 flex items-center justify-between gap-1
							bg-neutral-950 backdrop-blur-md overflow-hidden
							w-[calc(100%-1.5rem)] md:w-[calc(100%-3rem)] lg:w-[calc(100%-12rem)] px-2 py-1.5 border border-white/10 rounded-full"
						initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
						animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
						exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
						transition={snappyTransition}
					>
						<HeaderContent
							mobileMenuOpen={mobileMenuOpen}
							setMobileMenuOpen={setMobileMenuOpen}
						/>
					</motion.header>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{scrolled && (
					<motion.div
						key="scroll-bar"
						className="fixed top-6 left-3 md:left-6 lg:left-24 right-3 md:right-6 lg:right-24 z-100 flex items-center justify-between gap-2"
						initial={{ opacity: 0, y: -12, filter: "blur(4px)" }}
						animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
						transition={snappyTransition}
					>
						<motion.header
							className="flex items-center gap-1 shrink-0
								bg-neutral-950 backdrop-blur-md overflow-hidden
								w-fit px-2 py-1.5 border border-white/10 rounded-full
								shadow-[0_20px_25px_-5px_rgba(0,0,0,0.25),0_8px_10px_-6px_rgba(0,0,0,0.2)]"
						>
							<HeaderContent
								mobileMenuOpen={mobileMenuOpen}
								setMobileMenuOpen={setMobileMenuOpen}
							/>
						</motion.header>

						{extraWhenScroll && (
							<div className="flex items-center gap-1 min-w-0 justify-end">
								{extraWhenScroll}
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>

			<MobileMenu
				open={mobileMenuOpen}
				onClose={() => setMobileMenuOpen(false)}
			/>
		</>,
		document.body,
	);
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
	return (
		<AnimatePresence>
			{open && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
						className="fixed inset-0 z-[9998] sm:hidden"
						onClick={onClose}
					/>
					{/* Menu */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: -8 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -8 }}
						transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
						className="fixed top-16 left-3 right-3 z-[9999] bg-neutral-950 border border-white/10 rounded-2xl p-2 shadow-2xl sm:hidden"
					>
						<nav className="flex flex-col gap-0.5">
							{NAV_LINKS.map((link) => (
								<a
									key={link.href}
									href={link.href}
									className="text-white/80 hover:text-white text-sm font-medium tracking-tight px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
									onClick={onClose}
								>
									{link.label}
								</a>
							))}
						</nav>
						<div className="h-px bg-white/10 my-1.5 mx-2" />
						<div className="flex items-center justify-between px-4 py-2">
							<Button size="xs" className="text-xs rounded-full tracking-tight">
								Sponsor
							</Button>
							<GithubStars />
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}

const HeaderContent = ({
	mobileMenuOpen,
	setMobileMenuOpen,
}: {
	mobileMenuOpen: boolean;
	setMobileMenuOpen: (v: boolean) => void;
}) => {
	return (
		<>
			<a
				href="/redesign/04"
				className="text-white font-bold text-sm tracking-tight px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
			>
				Fonttrio
			</a>

			{/* Desktop nav */}
			<div className="hidden sm:flex items-center pr-2">
				<nav className="flex items-center gap-0.5 pr-2">
					{NAV_LINKS.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="text-white/60 hover:text-white text-xs font-medium tracking-tight px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
						>
							{link.label}
						</a>
					))}
				</nav>

				<div className="w-px h-5 bg-white/15 mr-2" />
				<Button size="xs" className="text-xs rounded-full tracking-tight">
					Sponsor
				</Button>

				<AuthButton />
				<ThemeToggle />
				<GithubStars />
			</div>

			{/* Mobile: theme toggle + burger */}
			<div className="flex sm:hidden items-center">
				<ThemeToggle />
				<Button
					size="icon"
					variant="ghost"
					className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white cursor-pointer"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
					aria-expanded={mobileMenuOpen}
				>
					<AnimatePresence initial={false} mode="wait">
						<motion.span
							key={mobileMenuOpen ? "close" : "open"}
							initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
							animate={{ opacity: 1, scale: 1, rotate: 0 }}
							exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
							transition={{ duration: 0.15 }}
							className="flex items-center justify-center"
						>
							{mobileMenuOpen ? (
								<X className="size-4" />
							) : (
								<Menu className="size-4" />
							)}
						</motion.span>
					</AnimatePresence>
				</Button>
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

const AuthButton = () => {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) return null;

	if (!session?.user) {
		return (
			<Button
				size="xs"
				variant="ghost"
				className="text-xs rounded-full tracking-tight text-white/60 hover:text-white hover:bg-white/10 cursor-pointer"
				asChild
			>
				<a href="/sign-in">Sign in</a>
			</Button>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					className="size-8 rounded-full hover:bg-white/10 transition-colors cursor-pointer overflow-hidden"
					aria-label="Account menu"
				>
					{session.user.image ? (
						<img
							src={session.user.image}
							alt=""
							className="size-6 rounded-full"
							draggable={false}
						/>
					) : (
						<User className="size-4 text-white/60" />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel className="font-normal">
					<div className="flex items-center gap-2.5 py-0.5">
						{session.user.image ? (
							<img
								src={session.user.image}
								alt=""
								className="size-8 rounded-full shrink-0"
								draggable={false}
							/>
						) : (
							<div className="size-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center shrink-0">
								<User className="size-3.5 text-neutral-500" />
							</div>
						)}
						<div className="min-w-0">
							<p className="text-sm font-medium truncate">
								{session.user.name}
							</p>
							<p className="text-xs text-muted-foreground truncate">
								{session.user.email}
							</p>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<a href="/account" className="cursor-pointer">
							<User className="size-4 mr-2" />
							Account
						</a>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => {
						authClient.signOut();
						window.location.href = "/";
					}}
				>
					<LogOut className="size-4 mr-2" />
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
