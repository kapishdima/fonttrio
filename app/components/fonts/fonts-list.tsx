"use client";

import { FontFullCard } from "@/app/components/font-card";
import type { FontItem } from "@/lib/fonts";
import { useBatchFontLoad } from "@/lib/hooks/use-batch-font-load";

export function FontsList({
	paginatedFonts,
	filteredCount,
}: {
	paginatedFonts: FontItem[];
	filteredCount: number;
}) {
	const { loaded: batchLoaded } = useBatchFontLoad(paginatedFonts);

	return (
		<div className="p-3">
			<section className="w-full h-full dark:bg-neutral-950 bg-white rounded-4xl py-16 px-4 sm:px-6 md:px-12 lg:px-24">
				{filteredCount === 0 ? (
					<div className="py-24 text-center">
						<p className="dark:text-neutral-400 text-neutral-500 text-sm font-medium">
							No fonts found.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{paginatedFonts.map((font) => (
							<FontFullCard key={font.name} font={font} batchLoaded={batchLoaded} />
						))}
					</div>
				)}
			</section>
		</div>
	);
}
