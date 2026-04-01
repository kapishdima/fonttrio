"use client";

import { motion } from "motion/react";
import { useState } from "react";
import type { PairingData } from "@/lib/pairings";

export const DEFAULT_HEADING = "The future of typography is here";
export const DEFAULT_BODY =
	"Good typography is invisible. Great typography speaks before you read a single word. Choose the right pairing and let your content shine.";
export const DEFAULT_MONO = `const font = await loadPairing("editorial");\napplyTypography(font, document.body);`;

export function TextsPreview({
	activePairing,
	className,
}: {
	activePairing: PairingData;
	className?: string;
}) {
	const [headingText, setHeadingText] = useState(DEFAULT_HEADING);
	const [bodyText, setBodyText] = useState(DEFAULT_BODY);
	const [monoText, setMonoText] = useState(DEFAULT_MONO);

	return (
		<motion.div
			key={activePairing.name}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			className={className ?? "flex flex-col flex-1 gap-px border-r"}
		>
			{/* Heading */}
			<div className="dark:bg-neutral-950 bg-white px-6 pt-4 pb-6 flex flex-col gap-3 border-b">
				<span className="text-defaul font-medium tracking-tighter dark:text-neutral-500 text-neutral-400">
					{activePairing.heading}
				</span>
				<textarea
					value={headingText}
					onChange={(e) => setHeadingText(e.target.value)}
					rows={3}
					className="w-full resize-none bg-transparent text-xl sm:text-2xl md:text-3xl dark:text-neutral-100 text-neutral-800 leading-tight break-words focus:outline-none placeholder:dark:text-neutral-700 placeholder:text-neutral-300"
					style={{
						fontFamily: `"${activePairing.heading}", ${activePairing.headingCategory}`,
						fontWeight: activePairing.scale.h1.weight,
					}}
					placeholder="Type a heading…"
				/>
			</div>

			{/* Body */}
			<div className="dark:bg-neutral-950 bg-white px-6 pt-4 pb-6 flex flex-col gap-3 border-b">
				<span className="text-defaul font-medium tracking-tighter dark:text-neutral-500 text-neutral-400">
					{activePairing.body}
				</span>
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

			<div className="dark:bg-neutral-950 bg-white px-6 pt-4 pb-6 flex flex-col gap-3">
				<span className="text-defaul font-medium tracking-tighter dark:text-neutral-500 text-neutral-400">
					{activePairing.mono}
				</span>
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
	);
}
