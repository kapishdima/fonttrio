"use client";

import { track } from "@vercel/analytics";
import { useEffect, useState } from "react";
import { Footer } from "@/app/components/footer";
import { InnerHeader } from "@/app/components/header";
import { FontHero } from "@/app/components/hero/font-hero";
import { PairCard } from "@/app/components/pair-card";
import { Badge } from "@/components/ui/badge";
import type { FontItem } from "@/lib/fonts";
import { getFontAllWeightsUrl, parseFontCategory } from "@/lib/fonts";
import { loadFontUrl } from "@/lib/hooks/font-load-registry";
import type { PairingData } from "@/lib/pairings";

const WEIGHT_NAMES: Record<string, string> = {
	"100": "Thin",
	"200": "ExtraLight",
	"300": "Light",
	"400": "Regular",
	"500": "Medium",
	"600": "SemiBold",
	"700": "Bold",
	"800": "ExtraBold",
	"900": "Black",
};

const SPECIMEN_SIZES = [
	{ size: 48, label: "48" },
	{ size: 36, label: "36" },
	{ size: 24, label: "24" },
	{ size: 18, label: "18" },
	{ size: 14, label: "14" },
];

export function FontDetail({
	font,
	pairings,
}: {
	font: FontItem;
	pairings: PairingData[];
}) {
	const category = parseFontCategory(font);
	const fontFamily = `"${font.font.family}", ${category}`;
	const [specimenText, setSpecimenText] = useState(
		"The quick brown fox jumps over the lazy dog",
	);

	useEffect(() => {
		const url = getFontAllWeightsUrl(font);
		if (url) loadFontUrl(url);
		track("font_detail_viewed", { name: font.name });
	}, [font]);

	return (
		<main className="bg-black">
			<InnerHeader />
			<FontHero font={font} fontFamily={fontFamily} />

			{/* Type Specimen */}
			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-24">
					<h2 className="text-xl sm:text-2xl font-medium tracking-tight dark:text-white text-neutral-800 mb-8 text-balance">
						Type specimen
					</h2>

					<div className="mb-6">
						<input
							type="text"
							value={specimenText}
							onChange={(e) => setSpecimenText(e.target.value)}
							placeholder="Type to preview…"
							className="w-full bg-transparent dark:text-neutral-300 text-neutral-600 text-sm border-b dark:border-neutral-800 border-neutral-200 pb-2 outline-none focus:dark:border-neutral-600 focus:border-neutral-400 transition-colors"
						/>
					</div>

					<div className="space-y-6">
						{SPECIMEN_SIZES.map(({ size, label }) => (
							<div key={label} className="flex items-center gap-4">
								<p
									className="dark:text-neutral-200 text-neutral-800 truncate flex-1 min-w-0"
									style={{
										fontFamily,
										fontSize: `${size}px`,
										lineHeight: 1.2,
									}}
								>
									{specimenText ||
										"The quick brown fox jumps over the lazy dog"}
								</p>
							</div>
						))}
					</div>
				</section>
			</div>

			{/* Weights */}
			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-24">
					<h2 className="text-xl sm:text-2xl font-medium tracking-tight dark:text-white text-neutral-800 mb-8 text-balance">
						Weights
					</h2>

					<div className="space-y-4">
						{font.font.weight.map((w) => (
							<div
								key={w}
								className="flex items-center gap-4 pb-4 border-b dark:border-neutral-900/50 border-neutral-100 last:border-0 last:pb-0"
							>
								<div className="w-20 shrink-0 flex flex-col">
									<span className="text-xs tabular-nums dark:text-neutral-500 text-neutral-400 font-mono">
										{w}
									</span>
									<span className="text-[10px] dark:text-neutral-600 text-neutral-400">
										{WEIGHT_NAMES[w] || ""}
									</span>
								</div>
								<p
									className="text-xl md:text-2xl dark:text-neutral-200 text-neutral-800 truncate flex-1 min-w-0"
									style={{ fontFamily, fontWeight: Number(w) }}
								>
									{specimenText ||
										"The quick brown fox jumps over the lazy dog"}
								</p>
							</div>
						))}
					</div>
				</section>
			</div>

			{/* Used in Pairings */}
			{pairings.length > 0 && (
				<div className="p-3 pt-0">
					<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-24">
						<h2 className="text-xl sm:text-2xl font-medium tracking-tight dark:text-white text-neutral-800 mb-8 text-balance">
							Used in pairings
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
							{pairings.map((p) => (
								<PairCard key={p.name} pairing={p} />
							))}
						</div>
					</section>
				</div>
			)}

			<Footer />
		</main>
	);
}
