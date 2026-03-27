"use client";

import { useClickAway } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FontsRow } from "@/app/components/fonts/fonts-row";
import { PairInstallationCode } from "@/app/components/pairs/pair-installation-code";
import { Badge } from "@/components/ui/badge";
import { useInstallCopy } from "@/hooks/use-install-copy";
import { useLazyFontLoad } from "@/lib/hooks/use-lazy-font-load";
import type { PairingData } from "@/lib/pairings";

interface PairCardProps {
	pairing: PairingData;
}

export function PairCard({ pairing }: PairCardProps) {
	const { ref, loaded } = useLazyFontLoad(pairing.googleFontsUrl);
	const { command, state: copyState, copyCommand } = useInstallCopy(pairing.name);

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

				<div
					role="button"
					tabIndex={-1}
					onClick={(e) => {
						e.stopPropagation();
						copyCommand();
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							e.stopPropagation();
							copyCommand();
						}
					}}
					className="w-full flex items-center gap-2 px-6 py-3 border-t dark:border-neutral-900/50 border-neutral-200 dark:bg-neutral-900/50 bg-neutral-50 dark:hover:bg-neutral-800/50 hover:bg-neutral-100 text-left transition-colors min-h-[44px] cursor-copy"
				>
					<code
						className="flex-1 truncate dark:text-neutral-400 text-neutral-500 font-medium text-xs"
						style={{ fontFamily: pairing.mono }}
					>
						{copyState === "done" ? "Copied!" : command}
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
				className="w-[90vw] sm:w-[70vw] md:w-[55vw] lg:w-[40vw] max-h-[90vh] px-4 sm:px-6 py-5 rounded-xl border dark:border-neutral-900/50 border-neutral-200 dark:bg-neutral-950 bg-white overflow-y-auto overscroll-contain fixed top-1/2 left-1/2 z-999 -translate-x-1/2 -translate-y-1/2"
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
							className="text-xs rounded-md font-medium tracking-tighter"
						>
							{m}
						</Badge>
					))}
					{pair.useCase.map((u) => (
						<Badge
							key={u}
							variant="secondary"
							className="text-xs rounded-md font-medium tracking-tighter"
						>
							{u}
						</Badge>
					))}
				</motion.div>

				<motion.p
					layoutId={`description-${pair.name}`}
					className="text-sm dark:text-neutral-400 text-neutral-600 line-clamp-2 font-medium leading-normal"
				>
					{pair.description}
				</motion.p>

				<FontsRow
					as={motion.div}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ delay: 0.15 }}
					pairing={pair}
				/>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ delay: 0.2 }}
					className="mt-4 dark:bg-neutral-900/50 bg-neutral-50 rounded-lg p-3"
				>
					{/* Column headers */}
					<div className="grid grid-cols-[1fr_1fr_0.8fr_0.8fr] gap-x-2 mb-1.5 pb-1.5 border-b dark:border-neutral-800 border-neutral-200">
						<span className="text-xs tracking-wider dark:text-neutral-600 text-neutral-700 font-medium">
							Level
						</span>
						<span className="text-xs tracking-wider dark:text-neutral-600 text-neutral-700 font-medium">
							Size
						</span>
						<span className="text-xs tracking-wider dark:text-neutral-600 text-neutral-700 font-medium">
							Weight
						</span>
						<span className="text-xs tracking-wider dark:text-neutral-600 text-neutral-700 font-medium">
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

				<p className="font-medium tracking-tighter dark:text-neutral-100 text-neutral-900 mt-4 mb-2">
					Installation
				</p>
				<PairInstallationCode
					pairing={pair}
					as={motion.div}
					style={{ fontFamily: pair.mono }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ delay: 0.3 }}
				/>
			</motion.div>,
		document.body,
	);
}
