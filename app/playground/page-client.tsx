"use client";

import { parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";
import { FontsRow } from "@/app/components/fonts/fonts-row";
import { Footer } from "@/app/components/footer";
import { InnerHeader } from "@/app/components/header";
import { PairInstallationCode } from "@/app/components/pairs/pair-installation-code";
import { PairsListSelection } from "@/app/components/pairs/pairs-list-selection";
import { PlaygroundPreview } from "@/app/components/playground/preview";
import type { PairingData } from "@/lib/pairings";

export function PlaygroundPageClient({
	pairings,
}: { pairings: PairingData[] }) {
	const [pairingName, setPairingName] = useQueryState(
		"pairing",
		parseAsString.withDefault(pairings[0]?.name ?? "editorial"),
	);
	const activePairing = useMemo(
		() => pairings.find((p) => p.name === pairingName) ?? pairings[0],
		[pairingName, pairings],
	);

	return (
		<main className="bg-black min-h-screen flex flex-col">
			<InnerHeader />

			<div className="p-3 pt-20">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-8 md:py-12">
					<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight dark:text-white text-neutral-800 mb-3">
						Playground
					</h1>
					<p className="text-base dark:text-neutral-400 text-neutral-500 mb-6 max-w-xl">
						See how font pairings look on real shadcn/ui components. Pick a
						pairing and watch every element update.
					</p>

					<PairsListSelection
						pairings={pairings}
						active={activePairing}
						onSelectPair={(name) => setPairingName(name)}
					/>

					<FontsRow pairing={activePairing} />
					<PairInstallationCode pairing={activePairing} className="mt-4" />
				</section>
			</div>

			<PlaygroundPreview activePairing={activePairing} />
			<Footer />
		</main>
	);
}
