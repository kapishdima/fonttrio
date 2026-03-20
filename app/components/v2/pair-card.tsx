"use client";

import { useClickAway } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePackageManagerContext } from "@/lib/contexts/package-manager-context";
import { useLazyFontLoad } from "@/lib/hooks/use-lazy-font-load";
import { buildInstallCommand } from "@/lib/package-managers";
import type { PairingData } from "@/lib/pairings";

interface PairCardProps {
	pairing: PairingData;
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
						className="text-3xl md:text-2xl dark:text-neutral-200 text-neutral-800 truncate font-['Manrope'] font-extrabold"
					>
						{pairing.heading}
					</motion.p>

					<motion.p
						layoutId={`description-${pairing.name}`}
						className="text-sm dark:text-neutral-400 text-neutral-600 line-clamp-2 font-['Manrope'] font-medium leading-normal"
					>
						{pairing.description}
					</motion.p>
				</div>

				<div className="w-full flex items-center gap-2 px-6 py-3 border-t dark:border-neutral-900/50 border-neutral-200 dark:bg-neutral-900/50 bg-neutral-50 dark:hover:bg-neutral-800/50 hover:bg-neutral-100 text-left transition-colors min-h-[44px]">
					<code className="flex-1 truncate dark:text-neutral-400 text-neutral-500 font-medium text-xs font-['Manrope']">
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

export function PairFullCard({ pairing }: PairCardProps) {
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
					<ActiveFullPair onClickAway={() => setOpened(false)} pair={pairing} />
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
			className="w-[min(480px,90vw)] px-6 py-5 rounded-xl border dark:border-neutral-900/50 border-neutral-200 dark:bg-neutral-950 bg-white overflow-y-auto overscroll-contain fixed top-1/2 left-1/2 z-999 -translate-x-1/2 -translate-y-1/2 max-h-[90vh]"
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

function ActiveFullPair({
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
			className="w-[90vw] md:w-[40vw] max-h-[90vh] px-6 py-5 rounded-xl border dark:border-neutral-900/50 border-neutral-200 dark:bg-neutral-950 bg-white overflow-y-auto overscroll-contain fixed top-1/2 left-1/2 z-999 -translate-x-1/2 -translate-y-1/2"
		>
			<motion.p
				layoutId={`heading-${pair.name}`}
				className="text-2xl md:text-4xl dark:text-neutral-200 text-neutral-800 truncate font-extrabold mb-2 pr-20"
				style={{
					fontFamily: pair.heading,
				}}
			>
				{pair.heading}
			</motion.p>

			<motion.div
				className="flex flex-wrap items-center gap-1 mb-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ delay: 0.2 }}
			>
				{pair.mood.map((m) => (
					<Badge
						key={m}
						variant="secondary"
						className="text-xs rounded-md font-['Manrope'] font-medium tracking-tighter"
					>
						{m}
					</Badge>
				))}
				{pair.useCase.map((u) => (
					<Badge
						key={u}
						variant="secondary"
						className="text-xs rounded-md font-['Manrope'] font-medium tracking-tighter"
					>
						{u}
					</Badge>
				))}
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ delay: 0.3 }}
			>
				<Button asChild className="absolute top-5 right-5">
					<Link href={`/${pair.name}`}>Open →</Link>
				</Button>
			</motion.div>

			<motion.p
				layoutId={`description-${pair.name}`}
				className="font-['Manrope'] text-sm dark:text-neutral-400 text-neutral-600 line-clamp-2 font-medium leading-normal"
			>
				{pair.description}
			</motion.p>

			{/* Font Trio */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ delay: 0.15 }}
				className="grid grid-cols-3 gap-2 mt-4"
			>
				{[
					{
						label: "Heading",
						font: pair.heading,
					},
					{ label: "Body", font: pair.body },
					{ label: "Mono", font: pair.mono },
				].map((item) => (
					<div
						key={item.label}
						className="dark:bg-neutral-900/50 bg-neutral-50 rounded-lg p-3"
					>
						<p className="text-xs dark:text-neutral-500 text-neutral-500 font-['Manrope'] font-medium">
							{item.label}
						</p>
						<p
							className="text-base font-semibold dark:text-neutral-200 text-neutral-800 truncate mt-0.5"
							style={{ fontFamily: item.font }}
						>
							{item.font}
						</p>
					</div>
				))}
			</motion.div>

			{/* Type Scale */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ delay: 0.2 }}
				className="mt-4 dark:bg-neutral-900/50 bg-neutral-50 rounded-lg p-3"
			>
				{/* <p className="text-sm tracking-wider dark:text-neutral-500 text-neutral-500 font-medium font-['Manrope'] mb-2.5">
					Type Scale
				</p> */}
				{/* Column headers */}
				<div className="grid grid-cols-[1fr_1fr_0.8fr_0.8fr] gap-x-2 mb-1.5 pb-1.5 border-b dark:border-neutral-800 border-neutral-200">
					<span className="text-xs tracking-wider dark:text-neutral-600 text-neutral-700 font-['Manrope'] font-medium">
						Level
					</span>
					<span className="text-xs tracking-wider dark:text-neutral-600 text-neutral-700 font-['Manrope'] font-medium">
						Size
					</span>
					<span className="text-xs tracking-wider dark:text-neutral-600 text-neutral-700 font-['Manrope'] font-medium">
						Weight
					</span>
					<span className="text-xs tracking-wider dark:text-neutral-600 text-neutral-700 font-['Manrope'] font-medium">
						LH
					</span>
				</div>
				<div className="space-y-1">
					{(["h1", "h2", "h3", "h4", "body"] as const).map((level) => {
						const s = pair.scale[level];
						return (
							<div
								key={level}
								className="grid grid-cols-[1fr_1fr_0.8fr_0.8fr] gap-x-2 text-xs py-1"
							>
								<span className="font-mono uppercase dark:text-neutral-300 text-neutral-800 font-medium">
									{level}
								</span>
								<span className="tabular-nums dark:text-neutral-400 text-neutral-500">
									{s.size}
								</span>
								<span className="tabular-nums dark:text-neutral-400 text-neutral-500">
									{s.weight}
								</span>
								<span className="tabular-nums dark:text-neutral-400 text-neutral-500">
									{s.lineHeight}
								</span>
							</div>
						);
					})}
				</div>
			</motion.div>

			<p className="font-['Manrope'] font-medium tracking-tighter text-neutral-900 mt-4 mb-2">
				Installation
			</p>
			<motion.code
				className="px-4 py-2 dark:bg-neutral-900 bg-neutral-100 dark:text-white text-neutral-800 rounded-md text-sm font-medium block"
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
