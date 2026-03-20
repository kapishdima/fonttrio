"use client";

import {
	LanguageSkillIcon,
	Search01Icon,
	Shirt01Icon,
	SmileIcon,
	ToolCaseIcon,
	Trash2,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useClickAway } from "@uidotdev/usehooks";
import {
	AnimatePresence,
	motion,
	useCycle,
	useReducedMotion,
} from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { InnerHeader } from "@/app/components/v2/header";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { usePackageManagerContext } from "@/lib/contexts/package-manager-context";
import { useLazyFontLoad } from "@/lib/hooks/use-lazy-font-load";
import { buildInstallCommand } from "@/lib/package-managers";
import type { PairingData } from "@/lib/pairings";
import { getAllPairings } from "@/lib/pairings";

export default function Redesign04Pairs() {
	return (
		<main className="bg-black">
			<InnerHeader extraWhenScroll={<FilterPill />} />
			<PairsHero />
			<PairsList />
		</main>
	);
}

const SPECIMEN_FONTS = [
	{ name: "Playfair Display", family: "'Playfair Display', serif" },
	{ name: "Space Grotesk", family: "'Space Grotesk', sans-serif" },
	{ name: "DM Serif Display", family: "'DM Serif Display', serif" },
	{ name: "Cormorant Garamond", family: "'Cormorant Garamond', serif" },
];

function RotatingSpecimen() {
	const [current, cycle] = useCycle(...SPECIMEN_FONTS);
	const shouldReduceMotion = useReducedMotion();

	useEffect(() => {
		if (shouldReduceMotion) return;
		const interval = setInterval(cycle, 3000);
		return () => clearInterval(interval);
	}, [cycle, shouldReduceMotion]);

	return (
		<div
			className="hidden md:flex w-[30%] rounded-xl mb-1 relative overflow-hidden flex-col items-center"
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
					className="text-xs font-[Manrope] font-medium dark:text-neutral-500 text-neutral-400"
				>
					{current.name}
				</motion.span>
			</AnimatePresence>
		</div>
	);
}

function PairsHero() {
	return (
		<div className="h-[60vh] p-3">
			<section className="w-full h-full flex flex-col justify-center dark:bg-neutral-950 bg-white rounded-4xl pb-[5vh] px-6 md:px-12 lg:px-24 py-12 lg:py-0">
				<div className="flex items-center justify-between mb-10">
					<div>
						<h2 className="font-[Manrope] text-3xl md:text-4xl lg:text-5xl font-medium text-neutral-900 dark:text-white tracking-tight text-balance">
							Search for the perfect font pairings
						</h2>
						<div className="flex flex-col max-w-lg w-full">
							<InputGroup className="h-10 mt-6 pl-2 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 font-['Manrope'] font-medium rounded-xl">
								<InputGroupInput
									placeholder="exp, blog about architecture"
									aria-label="Search font pairings"
								/>
								<InputGroupAddon>
									<HugeiconsIcon
										icon={Search01Icon}
										size={24}
										color="currentColor"
										strokeWidth={1.5}
									/>
								</InputGroupAddon>
							</InputGroup>
						</div>
					</div>

					<RotatingSpecimen />
				</div>

				<PairFilter />
			</section>
		</div>
	);
}

function PairsList() {
	const pairings = getAllPairings();

	return (
		<div className="p-3">
			<section className="w-full h-full dark:bg-neutral-950 bg-white rounded-4xl py-16 px-6 md:px-12 lg:px-24">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
					{pairings.map((pairing) => (
						<PairCard key={pairing.name} pairing={pairing} />
					))}
				</div>
			</section>
		</div>
	);
}

interface PairCardProps {
	pairing: PairingData;
}

const FILTERS = [
	{ id: "appearance", icon: Shirt01Icon, label: "Appearance" },
	{ id: "usecase", icon: ToolCaseIcon, label: "Use Case" },
	{ id: "language", icon: LanguageSkillIcon, label: "Language" },
	{ id: "feeling", icon: SmileIcon, label: "Feeling" },
];

function FilterPill() {
	const [activeFilter, setActiveFilter] = useState<any>(null);

	return (
		<>
			<motion.div
				layout
				className={`bg-neutral-950 backdrop-blur-md border border-white/10 flex flex-col overflow-hidden rounded-full z-0 px-2 py-1.5 w-[20vw]`}
				transition={{ layout: { duration: 0.3, type: "spring", bounce: 0 } }}
			>
				<InputGroup className="border-none text-white ">
					<InputGroupAddon>
						<HugeiconsIcon
							icon={Search01Icon}
							size={24}
							color="currentColor"
							strokeWidth={1.5}
						/>
					</InputGroupAddon>
					<InputGroupInput />
				</InputGroup>
			</motion.div>
			<motion.div
				layout
				className={`bg-neutral-950 backdrop-blur-md border border-white/10 flex flex-col overflow-hidden rounded-full z-0`}
				transition={{ layout: { duration: 0.3, type: "spring", bounce: 0 } }}
			>
				<div className="flex items-center gap-1 px-2 py-1.5">
					{FILTERS.map((filter) => (
						<>
							<Button
								size="icon"
								variant="ghost"
								className={`h-8 w-8 rounded-full p-0 text-white ${activeFilter === filter.id ? "bg-white text-neutral-950" : "bg-transparent"}`}
								onClick={() =>
									setActiveFilter((f) => (f === filter.id ? null : filter.id))
								}
							>
								<HugeiconsIcon
									icon={filter.icon}
									size={12}
									strokeWidth={1.5}
									color="currentColor"
								/>
							</Button>
							{activeFilter === filter.id ? (
								<motion.div
									layout
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									<Select>
										<SelectTrigger className="w-40 bg-neutral-800 border-neutral-700 text-white text-xs h-8">
											<SelectValue placeholder={filter.label} />
										</SelectTrigger>
										<SelectContent className="fixed z-200">
											<SelectItem value="apple">Apple</SelectItem>
											<SelectItem value="banana">Banana</SelectItem>
											<SelectItem value="blueberry">Blueberry</SelectItem>
											<SelectItem value="grapes">Grapes</SelectItem>
											<SelectItem value="pineapple">Pineapple</SelectItem>
										</SelectContent>
									</Select>
								</motion.div>
							) : null}
						</>
					))}
					<Button
						size="icon"
						variant="destructive"
						className={`h-8 w-8 rounded-full p-0`}
					>
						<HugeiconsIcon
							icon={Trash2}
							size={12}
							strokeWidth={1.5}
							color="currentColor"
						/>
					</Button>
				</div>
			</motion.div>
		</>
	);
}

function PairFilter() {
	return (
		// bg-neutral-50 border border-neutral-100
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 rounded-3xl">
			<Field>
				<FieldLabel>
					<FieldTitle className="text-default">
						<HugeiconsIcon
							icon={Shirt01Icon}
							size={18}
							color="currentColor"
							strokeWidth={1.5}
						/>
						Appearance
					</FieldTitle>
				</FieldLabel>
				<Select>
					<SelectTrigger className="w-full bg-neutral-100 dark:bg-neutral-800">
						<SelectValue placeholder="Appearance" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="blueberry">Blueberry</SelectItem>
						<SelectItem value="grapes">Grapes</SelectItem>
						<SelectItem value="pineapple">Pineapple</SelectItem>
					</SelectContent>
				</Select>
			</Field>
			<Field>
				<FieldLabel>
					<FieldTitle className="text-default">
						<HugeiconsIcon
							icon={ToolCaseIcon}
							size={18}
							color="currentColor"
							strokeWidth={1.5}
						/>
						Use Case
					</FieldTitle>
				</FieldLabel>
				<Select>
					<SelectTrigger className="w-full bg-neutral-100 dark:bg-neutral-800">
						<SelectValue placeholder="Use Case" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="blueberry">Blueberry</SelectItem>
						<SelectItem value="grapes">Grapes</SelectItem>
						<SelectItem value="pineapple">Pineapple</SelectItem>
					</SelectContent>
				</Select>
			</Field>
			<Field>
				<FieldLabel>
					<FieldTitle className="text-default">
						<HugeiconsIcon
							icon={LanguageSkillIcon}
							size={18}
							color="currentColor"
							strokeWidth={1.5}
						/>
						Language support
					</FieldTitle>
				</FieldLabel>
				<Select>
					<SelectTrigger className="w-full bg-neutral-100 dark:bg-neutral-800">
						<SelectValue placeholder="Language support" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="blueberry">Blueberry</SelectItem>
						<SelectItem value="grapes">Grapes</SelectItem>
						<SelectItem value="pineapple">Pineapple</SelectItem>
					</SelectContent>
				</Select>
			</Field>
			<Field>
				<FieldLabel>
					<FieldTitle className="text-default">
						<HugeiconsIcon
							icon={SmileIcon}
							size={18}
							color="currentColor"
							strokeWidth={1.5}
						/>
						Feeling
					</FieldTitle>
				</FieldLabel>
				<Select>
					<SelectTrigger className="w-full bg-neutral-100 dark:bg-neutral-800">
						<SelectValue placeholder="Feeling" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="blueberry">Blueberry</SelectItem>
						<SelectItem value="grapes">Grapes</SelectItem>
						<SelectItem value="pineapple">Pineapple</SelectItem>
					</SelectContent>
				</Select>
			</Field>
		</div>
	);
}

export function PairCard({ pairing }: PairCardProps) {
	const { ref, loaded } = useLazyFontLoad(pairing.googleFontsUrl);
	const { packageManager } = usePackageManagerContext();
	const command = buildInstallCommand(pairing.name, packageManager);

	const [opened, setOpened] = useState(false);

	return (
		<>
			<motion.div
				layoutId={`card-${pairing.name}`}
				ref={ref as React.Ref<HTMLDivElement>}
				onClick={() => setOpened((t) => !t)}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						setOpened((t) => !t);
					}
				}}
				role="button"
				tabIndex={0}
				aria-expanded={opened}
				aria-label={`${pairing.name} font pairing — ${pairing.heading}, ${pairing.body}, ${pairing.mono}`}
				className={
					"group flex flex-col h-full rounded-xl border dark:border-neutral-900/50 border-neutral-200 dark:bg-neutral-950 bg-white overflow-hidden dark:hover:bg-neutral-800/60 hover:bg-neutral-50 transition-[background-color] duration-150 cursor-pointer z-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-white/50 focus-visible:ring-neutral-400/50"
				}
			>
				<div
					className={`flex-1 px-6 py-5 flex flex-col gap-2 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
				>
					<motion.p
						layoutId={`heading-${pairing.name}`}
						className="text-3xl md:text-2xl dark:text-neutral-200 text-neutral-800 truncate font-extrabold"
						style={{
							fontFamily: pairing.heading,
						}}
					>
						{pairing.heading}
					</motion.p>

					<motion.p
						layoutId={`description-${pairing.name}`}
						className="text-sm dark:text-neutral-400 text-neutral-600 line-clamp-2 font-medium leading-normal"
						style={{
							fontFamily: pairing.body,
						}}
					>
						{pairing.description}
					</motion.p>
				</div>

				<div className="w-full flex items-center gap-2 px-6 py-3 border-t dark:border-neutral-900/50 border-neutral-200 dark:bg-neutral-900/50 bg-neutral-50 dark:hover:bg-neutral-800/50 hover:bg-neutral-100 text-left transition-colors min-h-[44px]">
					<code
						className="flex-1 truncate dark:text-neutral-400 text-neutral-500 font-medium text-xs"
						style={{ fontFamily: pairing.mono }}
					>
						{command}
					</code>
				</div>
			</motion.div>

			<AnimatePresence>{opened ? <Overlay /> : null}</AnimatePresence>
			<AnimatePresence>
				{opened ? (
					<ActivePair onClickAway={() => setOpened(false)} pair={pairing} />
				) : null}
			</AnimatePresence>
		</>
	);
}

function Overlay() {
	return createPortal(
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="w-screen h-screen bg-black/20 backdrop-blur-sm fixed top-0 left-0 z-99"
		/>,
		document.body,
	);
}

function ActivePair({
	pair,
	onClickAway,
}: {
	pair: PairingData;
	onClickAway: () => void;
}) {
	const ref = useClickAway(onClickAway);

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClickAway();
		};
		document.addEventListener("keydown", handleKey);
		return () => document.removeEventListener("keydown", handleKey);
	}, [onClickAway]);

	return createPortal(
		<motion.div
			ref={ref as React.Ref<HTMLDivElement>}
			layoutId={`card-${pair.name}`}
			role="dialog"
			aria-modal="true"
			aria-label={`${pair.name} font pairing detail`}
			className="w-[40vw] h-[90vh] px-6 py-5 rounded-xl border dark:border-neutral-900/50 border-neutral-200 dark:bg-neutral-950 bg-white overflow-y-auto overscroll-contain fixed top-1/2 left-1/2 z-999 -translate-x-1/2 -translate-y-1/2 max-h-[90vh]"
		>
			<motion.p
				layoutId={`heading-${pair.name}`}
				className="text-2xl md:text-4xl dark:text-neutral-200 text-neutral-800 truncate font-extrabold mb-3"
				style={{
					fontFamily: pair.heading,
				}}
			>
				{pair.heading}
			</motion.p>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ delay: 0.2 }}
			>
				<Button className="absolute top-5 right-5">Open</Button>
			</motion.div>

			<motion.p
				layoutId={`description-${pair.name}`}
				className="font-['Manrope'] text-sm dark:text-neutral-400 text-neutral-600 line-clamp-2 font-medium leading-normal"
			>
				{pair.description}
			</motion.p>
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ delay: 0.2 }}
				className="text-sm dark:text-neutral-400 text-neutral-600 font-medium leading-relaxed pt-4 mt-2 text-pretty border-t dark:border-neutral-900/50 border-neutral-200"
				style={{
					fontFamily: pair.body,
				}}
			>
				Typography shapes how your reader experiences every sentence. A
				well-chosen body font reduces fatigue, guides the eye, and gives your
				content the right voice.
			</motion.p>

			<motion.code
				className="px-4 py-2 dark:bg-neutral-900 bg-neutral-100 dark:text-white text-neutral-800 rounded-md text-sm mt-4 block"
				style={{ fontFamily: pair.mono }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ delay: 0.3 }}
			>
				{buildInstallCommand(pair.name, "npm")}
			</motion.code>
		</motion.div>,
		document.body,
	);
}
