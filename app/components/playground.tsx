"use client";

import { Check, Copy, RotateCcw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useCommandInstallation } from "@/hooks/use-command-installation";
import { buildInstallCommand } from "@/lib/package-managers";
import { getAllPairings } from "@/lib/pairings";

const DEFAULT_HEADING = "The future of typography is here";
const DEFAULT_BODY =
	"Good typography is invisible. Great typography speaks before you read a single word. Choose the right pairing and let your content shine.";
const DEFAULT_MONO = `const font = await loadPairing("editorial");\napplyTypography(font, document.body);`;

const titleVariants = {
	hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
	},
} as const;

const contentVariants = {
	hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
	},
} as const;

const reducedVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

export function Playground() {
	const pairings = useMemo(() => getAllPairings(), []);
	const [headingText, setHeadingText] = useState(DEFAULT_HEADING);
	const [bodyText, setBodyText] = useState(DEFAULT_BODY);
	const [monoText, setMonoText] = useState(DEFAULT_MONO);
	const [activePairing, setActivePairing] = useState(pairings[0]);
	const [copied, setCopied] = useState(false);
	const prefersReducedMotion = useReducedMotion();

	const command = useCommandInstallation(activePairing.name);

	const isDefault =
		headingText === DEFAULT_HEADING &&
		bodyText === DEFAULT_BODY &&
		monoText === DEFAULT_MONO;

	const handleReset = useCallback(() => {
		setHeadingText(DEFAULT_HEADING);
		setBodyText(DEFAULT_BODY);
		setMonoText(DEFAULT_MONO);
	}, []);

	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(command);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}, [command]);

	return (
		<section
			aria-label="Playground"
			className="py-16 pt-24 px-6 md:px-12 lg:px-24 overflow-hidden dark:bg-black bg-white relative"
		>
			{/* Heading */}
			<motion.h2
				className="text-4xl md:text-5xl dark:text-white text-neutral-800 font-medium tracking-tight text-balance"
				variants={prefersReducedMotion ? reducedVariants : titleVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-200px" }}
			>
				Try it with your text
			</motion.h2>
			<motion.p
				className="text-base dark:text-neutral-400 text-neutral-500 mt-3 mb-10 max-w-xl"
				variants={prefersReducedMotion ? reducedVariants : titleVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-200px" }}
			>
				Type anything and see how it looks across different font pairings.
			</motion.p>

			<motion.div
				variants={prefersReducedMotion ? reducedVariants : contentVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
			>
				{/* Pairing Selector */}
				<div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
					{pairings.map((p) => (
						<button
							key={p.name}
							type="button"
							onClick={() => setActivePairing(p)}
							className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border cursor-pointer ${
								activePairing.name === p.name
									? "dark:bg-white dark:text-black bg-neutral-900 text-white border-transparent"
									: "dark:bg-neutral-900 dark:text-neutral-400 bg-white text-neutral-600 dark:border-neutral-800 border-neutral-200 dark:hover:text-white hover:text-neutral-900"
							}`}
						>
							{p.name}
						</button>
					))}
				</div>

				{/* Preview Card */}
				<div className="rounded-xl dark:bg-neutral-950 bg-white border dark:border-neutral-900/50 border-neutral-200 overflow-hidden">
					{/* Specimens */}
					<AnimatePresence mode="wait">
						<motion.div
							key={activePairing.name}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="grid grid-cols-1 md:grid-cols-3 gap-px dark:bg-neutral-900/50 bg-neutral-200"
						>
							{/* Heading */}
							<div className="dark:bg-neutral-950 bg-white px-6 pt-4 pb-6 flex flex-col gap-3">
								<div className="flex items-center justify-between">
									<span className="text-[11px] font-semibold tracking-wider dark:text-neutral-500 text-neutral-400 uppercase">
										Heading
									</span>
									<span className="text-[11px] dark:text-neutral-600 text-neutral-400">
										{activePairing.heading}
									</span>
								</div>
								<textarea
									value={headingText}
									onChange={(e) => setHeadingText(e.target.value)}
									rows={3}
									className="w-full resize-none bg-transparent text-2xl md:text-3xl dark:text-neutral-100 text-neutral-800 leading-tight break-words focus:outline-none placeholder:dark:text-neutral-700 placeholder:text-neutral-300"
									style={{
										fontFamily: `"${activePairing.heading}", ${activePairing.headingCategory}`,
										fontWeight: activePairing.scale.h1.weight,
									}}
									placeholder="Type a heading…"
								/>
							</div>

							{/* Body */}
							<div className="dark:bg-neutral-950 bg-white px-6 pt-4 pb-6 flex flex-col gap-3">
								<div className="flex items-center justify-between">
									<span className="text-[11px] font-semibold tracking-wider dark:text-neutral-500 text-neutral-400 uppercase">
										Body
									</span>
									<span className="text-[11px] dark:text-neutral-600 text-neutral-400">
										{activePairing.body}
									</span>
								</div>
								<textarea
									value={bodyText}
									onChange={(e) => setBodyText(e.target.value)}
									rows={4}
									className="w-full resize-none bg-transparent text-base dark:text-neutral-300 text-neutral-700 leading-relaxed break-words focus:outline-none placeholder:dark:text-neutral-700 placeholder:text-neutral-300"
									style={{
										fontFamily: `"${activePairing.body}", ${activePairing.bodyCategory}`,
										fontWeight: activePairing.scale.body.weight,
									}}
									placeholder="Type body text…"
								/>
							</div>

							{/* Mono */}
							<div className="dark:bg-neutral-950 bg-white px-6 pt-4 pb-6 flex flex-col gap-3">
								<div className="flex items-center justify-between">
									<span className="text-[11px] font-semibold tracking-wider dark:text-neutral-500 text-neutral-400 uppercase">
										Code
									</span>
									<span className="text-[11px] dark:text-neutral-600 text-neutral-400">
										{activePairing.mono}
									</span>
								</div>
								<textarea
									value={monoText}
									onChange={(e) => setMonoText(e.target.value)}
									rows={4}
									className="w-full resize-none bg-transparent text-sm dark:text-neutral-300 text-neutral-700 leading-relaxed break-words focus:outline-none placeholder:dark:text-neutral-700 placeholder:text-neutral-300"
									style={{
										fontFamily: `"${activePairing.mono}", monospace`,
									}}
									placeholder="Type code…"
								/>
							</div>
						</motion.div>
					</AnimatePresence>

					{/* Footer */}
					<div className="px-6 py-3 border-t dark:border-neutral-900/50 border-neutral-200 flex items-center justify-between gap-4 dark:bg-neutral-900/50 bg-neutral-50">
						<div className="flex items-center gap-3 min-w-0">
							<div className="flex gap-1.5 shrink-0">
								{activePairing.mood.slice(0, 2).map((m) => (
									<Badge
										key={m}
										variant="secondary"
										className="text-xs rounded-md font-medium tracking-tighter"
									>
										{m}
									</Badge>
								))}
							</div>
						</div>

						<div className="flex items-center gap-x-4">
							{!isDefault && (
								<button
									type="button"
									onClick={handleReset}
									className="flex items-center gap-1.5 text-xs font-medium dark:text-neutral-500 text-neutral-400 dark:hover:text-neutral-300 hover:text-neutral-600 transition-colors cursor-pointer"
									aria-label="Reset text to defaults"
								>
									<RotateCcw className="size-3" />
									<span className="hidden sm:inline">Reset</span>
								</button>
							)}
							{/* Install Command */}
							<button
								type="button"
								onClick={handleCopy}
								className="flex items-center gap-2 shrink-0 px-3 py-1.5 rounded-lg dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 dark:hover:bg-neutral-800/50 hover:bg-neutral-200 transition-colors cursor-pointer group"
								aria-label={`Copy install command: ${command}`}
							>
								<code className="text-xs font-medium dark:text-neutral-300 text-neutral-600 hidden sm:inline">
									{command}
								</code>
								<code className="text-xs font-medium dark:text-neutral-300 text-neutral-600 sm:hidden">
									Copy command
								</code>
								<span className="dark:text-neutral-500 text-neutral-400 group-hover:dark:text-neutral-300 group-hover:text-neutral-600 transition-colors">
									{copied ? (
										<Check className="size-3.5" />
									) : (
										<Copy className="size-3.5" />
									)}
								</span>
							</button>
						</div>
					</div>
				</div>
			</motion.div>
		</section>
	);
}
