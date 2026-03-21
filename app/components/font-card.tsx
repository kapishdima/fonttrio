"use client";

import { useClickAway } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
	CodeBlockCommand,
	convertNpmCommand,
} from "@/components/code-block-command/code-block-command";
import { Badge } from "@/components/ui/badge";
import { useCommandInstallation } from "@/hooks/use-command-installation";
import {
	type FontItem,
	getFontGoogleFontsUrl,
	parseFontCategory,
} from "@/lib/fonts";
import { useLazyFontLoad } from "@/lib/hooks/use-lazy-font-load";
import { buildInstallCommand } from "@/lib/package-managers";

interface FontFullCardProps {
	font: FontItem;
}

export function FontFullCard({ font }: FontFullCardProps) {
	const googleFontsUrl = getFontGoogleFontsUrl(font);
	const { ref, loaded } = useLazyFontLoad(googleFontsUrl);
	const category = parseFontCategory(font);
	const command = useCommandInstallation(font.name);

	const [opened, setOpened] = useState(false);

	const fontFamily = loaded ? `"${font.font.family}", ${category}` : "inherit";

	return (
		<>
			<motion.div
				layoutId={`font-${font.name}`}
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
				aria-label={`${font.title} — ${category}, ${font.font.weight.length} weights`}
				className="group flex flex-col h-full rounded-xl border dark:border-neutral-900/50 border-neutral-200 dark:bg-neutral-950 bg-white overflow-hidden dark:hover:bg-neutral-800/60 hover:bg-neutral-50 transition-[background-color] duration-150 cursor-pointer z-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-white/50 focus-visible:ring-neutral-400/50"
			>
				{/* Preview */}
				<div
					className={`flex-1 px-6 py-5 flex flex-col gap-2 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
				>
					<motion.p
						layoutId={`font-name-${font.name}`}
						className="text-3xl md:text-2xl dark:text-neutral-200 text-neutral-800 truncate font-semibold"
						style={{ fontFamily }}
					>
						{font.title}
					</motion.p>
					<p
						className="text-sm dark:text-neutral-400 text-neutral-600 line-clamp-2 leading-normal"
						style={{ fontFamily }}
					>
						The quick brown fox jumps over the lazy dog
					</p>
				</div>

				{/* Info */}
				<div className="px-6 py-2.5 border-t dark:border-neutral-900/50 border-neutral-200 flex items-center gap-2">
					<Badge
						variant="secondary"
						className="text-[10px] rounded-md font-medium capitalize"
					>
						{category}
					</Badge>
					<span className="text-xs dark:text-neutral-500 text-neutral-400 font-medium tabular-nums">
						{font.font.weight.length} weights
					</span>
				</div>

				{/* Install command */}
				<button
					type="button"
					className="w-full flex items-center gap-2 px-6 py-3 border-t dark:border-neutral-900/50 border-neutral-200 dark:bg-neutral-900/50 bg-neutral-50 dark:hover:bg-neutral-800/50 hover:bg-neutral-100 text-left transition-colors min-h-[44px]"
					aria-label={`Copy install command for ${font.title}`}
				>
					<code className="flex-1 truncate dark:text-neutral-400 text-neutral-500 font-medium text-xs font-mono">
						{command}
					</code>
				</button>
			</motion.div>

			<AnimatePresence>{opened ? <Overlay /> : null}</AnimatePresence>
			<AnimatePresence>
				{opened ? (
					<ActiveFontDetail font={font} onClickAway={() => setOpened(false)} />
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

function ActiveFontDetail({
	font,
	onClickAway,
}: {
	font: FontItem;
	onClickAway: () => void;
}) {
	const ref = useClickAway(onClickAway);
	const category = parseFontCategory(font);
	const fontFamily = `"${font.font.family}", ${category}`;

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
			layoutId={`font-${font.name}`}
			role="dialog"
			aria-modal="true"
			aria-label={`${font.title} font detail`}
			className="w-[90vw] md:w-[40vw] max-h-[90vh] px-6 py-5 rounded-xl border dark:border-neutral-900/50 border-neutral-200 dark:bg-neutral-950 bg-white overflow-y-auto overscroll-contain fixed top-1/2 left-1/2 z-999 -translate-x-1/2 -translate-y-1/2"
		>
			<motion.p
				layoutId={`font-name-${font.name}`}
				className="text-2xl md:text-4xl dark:text-neutral-200 text-neutral-800 truncate font-semibold mb-2 pr-20"
				style={{ fontFamily }}
			>
				{font.title}
			</motion.p>

			{/* Badges */}
			<motion.div
				className="flex flex-wrap items-center gap-1 mb-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ delay: 0.2 }}
			>
				<Badge
					variant="secondary"
					className="text-xs rounded-md font-medium capitalize"
				>
					{category}
				</Badge>
				<Badge
					variant="secondary"
					className="text-xs rounded-md font-medium"
				>
					{font.font.weight.length} weights
				</Badge>
				{font.font.provider === "google" && (
					<Badge
						variant="secondary"
						className="text-xs rounded-md font-medium"
					>
						Google Fonts
					</Badge>
				)}
			</motion.div>

			{/* Weights preview */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ delay: 0.15 }}
				className="mt-4 dark:bg-neutral-900/50 bg-neutral-50 rounded-lg p-4 space-y-3"
			>
				<p className="text-xs dark:text-neutral-500 text-neutral-500 font-medium mb-2">
					Weights
				</p>
				{font.font.weight.map((w) => (
					<div key={w} className="flex items-baseline gap-3">
						<span className="text-xs tabular-nums dark:text-neutral-500 text-neutral-400 font-mono w-8 shrink-0">
							{w}
						</span>
						<p
							className="text-lg dark:text-neutral-200 text-neutral-800 truncate"
							style={{ fontFamily, fontWeight: Number(w) }}
						>
							The quick brown fox jumps over the lazy dog
						</p>
					</div>
				))}
			</motion.div>

			{/* Subsets */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ delay: 0.2 }}
				className="mt-4"
			>
				<p className="text-xs dark:text-neutral-500 text-neutral-500 font-medium mb-2">
					Language support
				</p>
				<div className="flex flex-wrap gap-1">
					{font.font.subsets
						.filter((s) => s !== "menu")
						.map((subset) => (
							<Badge
								key={subset}
								variant="outline"
								className="text-[10px] rounded-md font-medium capitalize"
							>
								{subset.replace(/-/g, " ")}
							</Badge>
						))}
				</div>
			</motion.div>

			<p className="font-medium tracking-tighter dark:text-neutral-100 text-neutral-900 mt-4 mb-2">
				Installation
			</p>
			<motion.code
				className="dark:bg-neutral-900 bg-neutral-100 dark:text-white text-neutral-800 rounded-md text-sm font-medium block font-mono"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ delay: 0.3 }}
			>
				<CodeBlockCommand
					{...convertNpmCommand(buildInstallCommand(font.name))}
				/>
			</motion.code>
		</motion.div>,
		document.body,
	);
}
