"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";
import { Footer } from "@/app/components/footer";
import { InnerHeader } from "@/app/components/header";
import { PairHero } from "@/app/components/hero/pair-hero";
import { PairCard } from "@/app/components/pair-card";
import { PairFontScale } from "@/app/components/pairs/pair-font-scale";
import { PairInstallationCode } from "@/app/components/pairs/pair-installation-code";
import { PairScaleTable } from "@/app/components/pairs/pair-scale-table";
import { ComponentsPreview } from "@/app/components/playground/components-preview";
import { TextsPreview } from "@/app/components/playground/texts-preview";
import { loadFontUrl } from "@/lib/hooks/font-load-registry";
import type { PairingData } from "@/lib/pairings";

export function PairingDetail({
	pairing,
	relatedPairings,
}: {
	pairing: PairingData;
	relatedPairings: PairingData[];
}) {
	useEffect(() => {
		if (pairing.googleFontsUrl) {
			loadFontUrl(pairing.googleFontsUrl);
		}
		track("pair_detail_viewed", { name: pairing.name });
	}, [pairing.googleFontsUrl, pairing.name]);

	const monoFont = `"${pairing.mono}", monospace`;

	return (
		<main className="bg-black">
			<InnerHeader />
			<PairHero pairing={pairing} />

			{/* Type Specimen */}
			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-24">
					<h2 className="text-xl sm:text-2xl font-medium tracking-tight dark:text-white text-neutral-800 mb-8 text-balance">
						Try it with your text
					</h2>
					<div className="flex gap-4">
						<div className="rounded-xl border dark:border-neutral-900/50 border-neutral-200 overflow-hidden">
							<TextsPreview
								activePairing={pairing}
								className="flex flex-col flex-1 gap-px"
							/>
						</div>
						<div className="flex-1 rounded-xl border dark:border-neutral-900/50 border-neutral-200 overflow-hidden">
							<ComponentsPreview
								activePairing={pairing}
								className="dark:bg-neutral-950 bg-white overflow-auto"
							/>
						</div>
					</div>
				</section>
			</div>

			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-24">
					<h2 className="text-xl sm:text-2xl font-medium tracking-tight dark:text-white text-neutral-800 mb-8 text-balance">
						Typography scale
					</h2>

					<div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
						<div className="flex-1 min-w-0 flex flex-col gap-4">
							<PairScaleTable pair={pairing} className="flex-1" />

							<div style={{ fontFamily: monoFont }}>
								<PairInstallationCode pairing={pairing} />
							</div>
						</div>

						<PairFontScale pairing={pairing} />
					</div>
				</section>
			</div>

			{/* Related Pairings */}
			{relatedPairings.length > 0 && (
				<div className="p-3 pt-0">
					<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-24">
						<h2 className="text-xl sm:text-2xl font-medium tracking-tight dark:text-white text-neutral-800 mb-8 text-balance">
							Similar pairings
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
							{relatedPairings.map((p) => (
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
