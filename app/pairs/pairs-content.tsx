"use client";

import { useMemo } from "react";
import { FilterPill } from "@/app/components/filters/filter-pill";
import { InnerHeader } from "@/app/components/header";
import { PairsHero } from "@/app/components/hero/pairs-hero";
import { PairCard } from "@/app/components/pair-card";
import { Pagination } from "@/app/components/pagination";
import { PAIR_FILTERS } from "@/lib/pairs-filter-config";
import { usePairFilters } from "@/lib/hooks/use-pair-filters";
import type { PairingData } from "@/lib/pairings";
import { POPULAR_PAIRING_NAMES } from "@/lib/popular-pairings";

export function PairsContent({ pairings }: { pairings: PairingData[] }) {
	const popularPairings = useMemo(
		() => pairings.filter((p) => POPULAR_PAIRING_NAMES.has(p.name)),
		[pairings],
	);
	const {
		searchQuery,
		setSearchQuery,
		filteredPairings,
		paginatedPairings,
		totalPages,
		filterValues,
		handleFilterChange,
		clearFilters,
		hasActiveFilters,
	} = usePairFilters(pairings);

	return (
		<main className="bg-black">
			<InnerHeader
				extraWhenScroll={
					<FilterPill
						filters={PAIR_FILTERS}
						values={filterValues}
						onValueChange={handleFilterChange}
						onClear={clearFilters}
						searchPlaceholder="Search pairings..."
					/>
				}
			/>
			<PairsHero
				filters={PAIR_FILTERS}
				filterValues={filterValues}
				onFilterChange={handleFilterChange}
				onClear={clearFilters}
				hasActiveFilters={hasActiveFilters}
				searchQuery={searchQuery}
				onSearchChange={(v) => setSearchQuery(v || null)}
			/>

			{/* Popular pairings block */}
			{!hasActiveFilters && (
				<div className="p-3 pb-0">
					<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl py-12 px-4 sm:px-6 md:px-12 lg:px-24">
						<h2 className="text-xl sm:text-2xl font-medium tracking-tight dark:text-white text-neutral-800 mb-6">
							Popular pairings
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
							{popularPairings.map((pairing) => (
								<PairCard key={pairing.name} pairing={pairing} />
							))}
						</div>
					</section>
				</div>
			)}

			<div className="p-3">
				<section className="w-full h-full dark:bg-neutral-950 bg-white rounded-4xl py-16 px-4 sm:px-6 md:px-12 lg:px-24">
					{filteredPairings.length === 0 ? (
						<div className="text-center py-20">
							<p className="text-lg text-neutral-500 dark:text-neutral-400">
								No pairings match your filters
							</p>
						</div>
					) : (
						<>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
								{paginatedPairings.map((pairing) => (
									<PairCard key={pairing.name} pairing={pairing} />
								))}
							</div>
							<Pagination totalPages={totalPages} />
						</>
					)}
				</section>
			</div>
		</main>
	);
}
